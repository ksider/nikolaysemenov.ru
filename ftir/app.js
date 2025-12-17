(() => {
  const config = window.APP_CONFIG || {};
  const translations = config.translations || {};
  const supportedLangs = config.supportedLangs || Object.keys(translations) || ['en'];
  const chartSettings = config.chart || {};
  const defaultXRange = chartSettings.defaultXRange || { min: 500, max: 4000 };
  const zones = chartSettings.zones || [];

  const fileInput = document.getElementById('files');
  const mergeBtn = document.getElementById('mergeBtn');
  const statusEl = document.getElementById('status');
  const chartEl = document.getElementById('chart');
  const sampleInput = document.getElementById('sampleIndex');
  const fileNameInput = document.getElementById('fileName');
  const downloadLinkEl = document.getElementById('downloadLink');
  const refreshBtn = document.getElementById('refreshChart');
  const resetZoomBtn = document.getElementById('resetZoom');
  const xMinInput = document.getElementById('xMin');
  const xMaxInput = document.getElementById('xMax');
  const yMinInput = document.getElementById('yMin');
  const yMaxInput = document.getElementById('yMax');
  const saveCsvBtn = document.getElementById('saveCsv');
  const chartRow = document.getElementById('chartRow');
  const chartLegend = document.getElementById('chartLegend');
  const i18nTargets = document.querySelectorAll('[data-i18n]');
  const langLinks = document.querySelectorAll('.lang-link');
  const addStripeBtn = document.getElementById('addStripe');
  const peaksBody = document.getElementById('peaksBody');
  const peaksEmpty = document.getElementById('peaksEmpty');
  const copyStripesBtn = document.getElementById('copyStripes');
  const peakDb = Array.isArray(window.FTIR_BASE) ? window.FTIR_BASE : [];

  const browserLang = ((navigator.language || 'en').slice(0, 2) || 'en').toLowerCase();
  let currentLang = supportedLangs.includes(browserLang) ? browserLang : 'en';

  let lastData = null;
  let offsets = new Map();
  let lastParsedRows = [];
  let lastColumns = [];
  let visibleSeries = new Map();
  let markerActive = false;
  let markerX = null;
  let markerUpdater = null;
  let markerStep = 1;
  let merging = false;
  let defaultYRange = null;
  let stripes = [];
  const stripeColors = d3.schemeTableau10 || ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#8b5cf6', '#0ea5e9'];
  let stripeIdSeq = 0;
  let baselineSeries = null;
  let baselineMap = new Map();

  function t(key, arg) {
    const dict = translations[currentLang] || translations.en || {};
    const val = dict[key];
    const fallback = (translations.en || {})[key] || key;
    const resolved = typeof val === 'function' ? val(arg) : val;
    return resolved !== undefined ? resolved : fallback;
  }

  function applyTranslations() {
    i18nTargets.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });
    sampleInput.placeholder = currentLang === 'ru' ? 'например, A1' : currentLang === 'sr' ? 'npr. A1' : 'e.g. A1';
    yMinInput.placeholder = t('yAuto') || 'auto';
    yMaxInput.placeholder = t('yAuto') || 'auto';
    langLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.lang === currentLang);
    });
    document.documentElement.lang = currentLang;
  }

  function setLanguage(lang) {
    currentLang = supportedLangs.includes(lang) ? lang : 'en';
    applyTranslations();
  }

  langLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(link.dataset.lang);
    });
  });
  applyTranslations();

  function setStatus(msg, isError = false) {
    statusEl.textContent = msg;
    statusEl.style.color = isError ? '#b91c1c' : '#0f172a';
  }

  function setRangeInputs({ xMin, xMax, yMin, yMax }) {
    if (typeof xMin === 'number') xMinInput.value = String(xMin);
    if (typeof xMax === 'number') xMaxInput.value = String(xMax);
    if (yMin !== undefined) yMinInput.value = yMin === null ? '' : String(yMin);
    if (yMax !== undefined) yMaxInput.value = yMax === null ? '' : String(yMax);
  }

  function computeAdjustedExtent(dataset) {
    if (!dataset || !dataset.length) return null;
    let min = Infinity;
    let max = -Infinity;
    dataset.forEach((d) => {
      if (typeof d.x !== 'number' || typeof d.y !== 'number') return;
      if (d.x > defaultXRange.max || d.x < defaultXRange.min) return;
      const base = baselineSeries ? baselineMap.get(d.x) : undefined;
      const offset = offsets.get(d.file) || 0;
      const y = (typeof base === 'number' ? d.y - base : d.y) + offset;
      if (!Number.isFinite(y)) return;
      if (y < min) min = y;
      if (y > max) max = y;
    });
    if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
    return [min, max];
  }

  function applyZoom(factor, centerX, centerY) {
    if (!lastData || !lastData.length) return;
    const currentXMax = Number(xMaxInput.value) || defaultXRange.max;
    const currentXMin = Number(xMinInput.value) || defaultXRange.min;
    const autoExtent = computeAdjustedExtent(lastData) || [0, 1];
    const currentYMin = yMinInput.value === '' ? autoExtent[0] : Number(yMinInput.value);
    const currentYMax = yMaxInput.value === '' ? autoExtent[1] : Number(yMaxInput.value);
    const baseYMin = defaultYRange ? defaultYRange[0] : autoExtent[0];
    const baseYMax = defaultYRange ? defaultYRange[1] : autoExtent[1];
    const safeFactor = Math.min(Math.max(factor, 0.5), 1.8); // limit per tick
    const zoomRange = (min, max, center, f) => {
      const minOff = min - center;
      const maxOff = max - center;
      let a = center + minOff * f;
      let b = center + maxOff * f;
      if (a < b) return [a, b];
      return [b, a];
    };
    let [nextXMin, nextXMax] = zoomRange(currentXMin, currentXMax, centerX, safeFactor);
    let [nextYMin, nextYMax] = zoomRange(currentYMin, currentYMax, centerY, safeFactor);

    const minSpanX = (defaultXRange.max - defaultXRange.min) * 0.01;
    const minSpanY = Math.abs(baseYMax - baseYMin) * 0.01 || 1;
    if (Math.abs(nextXMax - nextXMin) < minSpanX) {
      const half = minSpanX / 2;
      nextXMin = centerX - half;
      nextXMax = centerX + half;
    }
    if (Math.abs(nextYMax - nextYMin) < minSpanY) {
      const half = minSpanY / 2;
      nextYMin = centerY - half;
      nextYMax = centerY + half;
    }

    // Clamp back toward defaults on zoom-out
    const isZoomOut = factor > 1;
    if (isZoomOut) {
      nextXMin = Math.max(nextXMin, defaultXRange.min);
      nextXMax = Math.min(nextXMax, defaultXRange.max);
      nextYMin = Math.max(nextYMin, baseYMin);
      nextYMax = Math.min(nextYMax, baseYMax);
    }

    setRangeInputs({ xMax: nextXMax, xMin: nextXMin, yMin: nextYMin, yMax: nextYMax });
    renderChartFromData(lastData);
  }

  function buildCsvFromRows(rows, columns) {
    const header = ['wavenumber', ...columns];
    const lines = [header.join(',')];
    rows.forEach((row) => {
      lines.push([row.wavenumber, ...columns.map((c) => (row[c] ?? ''))].join(','));
    });
    return lines.join('\n');
  }

  function readFileText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  function generateName() {
    const files = Array.from(fileInput.files || []);
    const count = files.length;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
    const sample = (sampleInput.value || '').trim();
    const base = `ftir_${date}_${count || 0}files${sample ? `_${sample}` : ''}`;
    const withExt = base.toLowerCase().endsWith('.csv') ? base : `${base}.csv`;
    fileNameInput.value = withExt;
  }

  fileInput.addEventListener('change', () => {
    generateName();
    const files = Array.from(fileInput.files || []);
    if (files.length) {
      handleMerge();
    }
  });
  sampleInput.addEventListener('input', generateName);
  generateName();

  function renderChartFromData(data, options = {}) {
    const { skipLegend = false } = options;
    if (!window.d3) return;
    const filteredRaw = data.filter((d) => typeof d.x === 'number' && typeof d.y === 'number' && d.x <= defaultXRange.max && d.x >= defaultXRange.min);
    const filtered = filteredRaw.map((d) => {
      const base = baselineSeries ? baselineMap.get(d.x) : undefined;
      const adjustedY = typeof base === 'number' ? d.y - base : d.y;
      return { ...d, y: adjustedY };
    });
    if (!filtered.length) {
      chartEl.innerHTML = '<p>No data in 4000–500.</p>';
      chartLegend.innerHTML = '';
      renderStripesTable();
      return;
    }

    const allSeries = Array.from(new Set(filtered.map((d) => d.file)));
    const filteredVisible = filtered.filter((d) => visibleSeries.get(d.file) !== false);
    const byFile = d3.group(filteredVisible, (d) => d.file);
    const yDomainAuto = d3.extent(filtered, (d) => d.y);
    const xMaxVal = Number(xMaxInput.value) || defaultXRange.max;
    const xMinVal = Number(xMinInput.value) || defaultXRange.min;
    const yMinVal = yMinInput.value === '' ? yDomainAuto[0] : Number(yMinInput.value);
    const yMaxVal = yMaxInput.value === '' ? yDomainAuto[1] : Number(yMaxInput.value);
    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const width = chartEl.clientWidth || 800;
    const height = Math.max(520, Math.round((window.innerHeight || 900) * 0.72));
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const x = d3.scaleLinear().domain([xMaxVal, xMinVal]).range([0, innerW]);
    const y = d3.scaleLinear().domain([yMinVal, yMaxVal]).nice().range([innerH, 0]);
    const domainSpan = Math.abs(xMaxVal - xMinVal) || 1;
    const arrowStep = domainSpan / 200;
    markerStep = arrowStep;
    const clampX = (val) => Math.min(Math.max(val, Math.min(xMaxVal, xMinVal)), Math.max(xMaxVal, xMinVal));

    const line = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .defined((d) => Number.isFinite(d.x) && Number.isFinite(d.y))
      .curve(d3.curveLinear);

    const svg = d3.create('svg').attr('viewBox', `0 0 ${width} ${height}`);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const zoneHintEl = document.getElementById('zoneHint');
    const zoneLayer = g.append('g').attr('class', 'zones');
    const zoneRects = [];
    zones.forEach((zone) => {
      const x1 = x(zone.start);
      const x2 = x(zone.end);
      const left = Math.min(x1, x2);
      const zoneWidth = Math.abs(x2 - x1);
      if (zoneWidth <= 0) return;
      const zoneGroup = zoneLayer.append('g');
      const rect = zoneGroup
        .append('rect')
        .attr('x', left)
        .attr('y', 0)
        .attr('width', zoneWidth)
        .attr('height', innerH)
        .attr('fill', 'transparent')
        .attr('stroke', 'none')
        .attr('rx', 4)
        .attr('ry', 4)
        .style('pointer-events', 'none');
      zoneRects.push({ rect, zone });
    });

    g.append('g').attr('transform', `translate(0,${innerH})`).call(d3.axisBottom(x));
    g.append('g').call(d3.axisLeft(y));

    const color = d3.scaleOrdinal(d3.schemeTableau10).domain(allSeries);
    const allPoints = [];

    // draw user stripes + labels
    if (stripes.length) {
      const stripesLayer = g.append('g').attr('class', 'user-stripes');
      stripes.forEach((stripe) => {
        const sx = x(stripe.x);
        stripesLayer
          .append('line')
          .attr('x1', sx)
          .attr('x2', sx)
          .attr('y1', 0)
          .attr('y2', innerH)
          .attr('stroke', stripe.color || '#111')
          .attr('stroke-width', 2)
          .attr('stroke-dasharray', '4,2');
        stripesLayer
          .append('text')
          .attr('x', sx + 4)
          .attr('y', 12)
          .attr('fill', '#111827')
          .attr('font-size', 12)
          .attr('font-weight', '700')
          .text(`${stripe.x.toFixed(0)}`);
      });
    }

    const seriesData = new Map();
    for (const [file, rows] of byFile) {
      const offset = offsets.get(file) || 0;
      const sorted = rows
        .slice()
        .sort((a, b) => b.x - a.x)
        .map((d) => ({ ...d, y: d.y + offset, file }));
      g.append('path').datum(sorted).attr('fill', 'none').attr('stroke', color(file)).attr('stroke-width', 1.5).attr('d', line);
      allPoints.push(...sorted);
      seriesData.set(file, sorted);
    }

    if (!skipLegend) {
      chartLegend.innerHTML = '';
      for (const file of allSeries) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        if (baselineSeries === file) item.classList.add('baseline');
        if (visibleSeries.get(file) === false) item.classList.add('inactive');
        const swatch = document.createElement('div');
        swatch.className = 'legend-swatch';
        swatch.style.background = color(file);
        const label = document.createElement('span');
        label.textContent = file;
        const baselineBtn = document.createElement('button');
        baselineBtn.type = 'button';
        baselineBtn.className = 'legend-base-btn';
        baselineBtn.textContent = 'Base';
        baselineBtn.title = 'Use as baseline';
        if (baselineSeries === file) baselineBtn.classList.add('active');
        baselineBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (baselineSeries === file) {
            baselineSeries = null;
            baselineMap = new Map();
            defaultYRange = computeAdjustedExtent(lastData) || defaultYRange;
            yMinInput.value = '';
            yMaxInput.value = '';
          } else {
            baselineSeries = file;
            const map = new Map();
            if (lastParsedRows && lastParsedRows.length) {
              lastParsedRows.forEach((row) => {
                if (typeof row.wavenumber === 'number' && typeof row[file] === 'number') {
                  map.set(row.wavenumber, row[file]);
                }
              });
            }
            baselineMap = map;
            defaultYRange = computeAdjustedExtent(lastData) || defaultYRange;
            yMinInput.value = '';
            yMaxInput.value = '';
          }
          renderChartFromData(lastData);
        });
        const offsetInput = document.createElement('input');
        offsetInput.type = 'number';
        offsetInput.step = '0.1';
        offsetInput.value = offsets.get(file) || 0;
        offsetInput.className = 'legend-offset';
        offsetInput.addEventListener('click', (e) => e.stopPropagation());
        offsetInput.addEventListener('input', () => {
          offsets.set(file, Number(offsetInput.value) || 0);
          renderChartFromData(lastData, { skipLegend: true });
        });
        item.appendChild(swatch);
        item.appendChild(label);
        item.appendChild(baselineBtn);
        item.appendChild(offsetInput);
        item.addEventListener('click', () => {
          const current = visibleSeries.get(file);
          visibleSeries.set(file, current === false ? true : false);
          renderChartFromData(lastData);
        });
        chartLegend.appendChild(item);
      }
    }

    const marker = g.append('g').style('display', 'none');
    const markerLine = marker
      .append('line')
      .attr('y1', 0)
      .attr('y2', innerH)
      .attr('stroke', '#1f2937')
      .attr('stroke-width', 1.4)
      .attr('stroke-dasharray', '4,4');
    const markerDots = marker.append('g');
    const markerText = marker
      .append('text')
      .attr('font-size', 12)
      .attr('y', -6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#1f2937')
      .attr('font-weight', '600')
      .style('user-select', 'none');

    const applyMarker = (xVal) => {
      const clamped = clampX(xVal);
      markerActive = true;
      markerX = clamped;
      marker.style('display', 'block');
      markerLine.attr('x1', x(clamped)).attr('x2', x(clamped));
      markerDots.selectAll('circle').remove();
      seriesData.forEach((rows, file) => {
        let nearest = null;
        let bestDx = Infinity;
        for (const point of rows) {
          const dx = Math.abs(point.x - clamped);
          if (dx < bestDx) {
            bestDx = dx;
            nearest = point;
          }
        }
        if (!nearest) return;
        markerDots
          .append('circle')
          .attr('cx', x(nearest.x))
          .attr('cy', y(nearest.y))
          .attr('r', 4)
          .attr('fill', color(file))
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.2);
      });
      markerText.attr('x', x(clamped)).text(`x = ${clamped.toFixed(2)}`);
      svg.style('cursor', 'col-resize');
      setStatus(`x=${clamped.toFixed(2)}`);
    };

    const clearZoneHighlight = () => {
      zoneRects.forEach(({ rect }) => rect.attr('fill', 'transparent'));
      if (zoneHintEl) zoneHintEl.textContent = '\u00A0';
    };

    const updateZoneHighlight = (xVal) => {
      let active = null;
      const val = Number(xVal);
      zoneRects.forEach(({ rect, zone }) => {
        const min = Math.min(zone.start, zone.end);
        const max = Math.max(zone.start, zone.end);
        const inZone = val <= max && val >= min;
        rect.attr('fill', inZone ? d3.color(zone.color).copy({ opacity: 0.18 }) : 'transparent');
        if (inZone) active = zone;
      });
      if (zoneHintEl) zoneHintEl.textContent = active ? `${active.label} (${active.end}–${active.start} cm⁻¹)` : '\u00A0';
    };

    let isDragging = false;
    svg.style('cursor', markerActive ? 'col-resize' : 'crosshair');

    const handlePointer = (event) => {
      const [px, py] = d3.pointer(event, g.node());
      if (px < 0 || px > innerW || py < 0 || py > innerH) return;
      const xVal = x.invert(px);
      applyMarker(xVal);
      updateZoneHighlight(xVal);
    };

    const handleHover = (event) => {
      const [px, py] = d3.pointer(event, g.node());
      if (px < 0 || px > innerW || py < 0 || py > innerH) {
        clearZoneHighlight();
        return;
      }
      const xVal = x.invert(px);
      updateZoneHighlight(xVal);
    };

    svg.on('pointerdown', (event) => {
      handlePointer(event);
      isDragging = true;
    });
    svg.on('pointermove', (event) => {
      if (isDragging) {
        handlePointer(event);
      } else {
        handleHover(event);
      }
    });
    svg.on('pointerup pointerleave pointercancel', () => {
      isDragging = false;
      svg.style('cursor', markerActive ? 'col-resize' : 'crosshair');
      clearZoneHighlight();
    });

    svg.on('click', (event) => {
      if (event.detail === 2) return; // let dblclick handle it
      handlePointer(event);
    });

    svg.on('dblclick', (event) => {
      event.preventDefault();
      handlePointer(event);
      if (addStripeBtn) {
        addStripeBtn.click();
      }
    });

    svg.on(
      'wheel',
      (event) => {
        event.preventDefault();
        const delta = event.deltaY;
        const factor = Math.exp(delta * 0.0008);
        const [px, py] = d3.pointer(event, g.node());
        const xVal = x.invert(px);
        const yVal = y.invert(py);
        applyZoom(factor, xVal, yVal);
      },
      { passive: false }
    );

    markerUpdater = (direction) => {
      if (!markerActive || markerX === null) return;
      const delta = typeof direction === 'number' ? direction : 0;
      applyMarker(markerX + delta);
    };

    if (markerActive && markerX !== null) {
      applyMarker(markerX);
    }
    clearZoneHighlight();

    chartEl.innerHTML = '';
    chartEl.appendChild(svg.node());
    renderStripesTable();
  }

  function tipsForX(xVal) {
    if (!peakDb.length || !Number.isFinite(xVal)) return [];
    return peakDb.filter((p) => xVal >= p.start && xVal <= p.end);
  }

  function renderStripesTable() {
    if (!peaksBody || !peaksEmpty) return;
    peaksBody.innerHTML = '';
    if (!stripes.length) {
      peaksEmpty.style.display = 'block';
      return;
    }
    peaksEmpty.style.display = 'none';
    stripes.forEach((stripe) => {
      const row = document.createElement('div');
      row.className = 'peaks-row';
      const colorSwatch = document.createElement('div');
      colorSwatch.className = 'peaks-color';
      colorSwatch.style.background = stripe.color;
      const val = document.createElement('input');
      val.type = 'number';
      val.step = '0.01';
      val.className = 'peaks-input';
      val.value = stripe.x.toFixed(2);
      val.addEventListener('change', () => {
        const num = Number(val.value);
        if (!Number.isFinite(num)) return;
        stripe.x = num;
        renderChartFromData(lastData, { skipLegend: true });
        renderStripesTable();
      });

      const nameCell = document.createElement('input');
      nameCell.type = 'text';
      nameCell.className = 'peaks-input';
      nameCell.value = stripe.label || '';
      nameCell.placeholder = t('colLabel');
      nameCell.addEventListener('input', () => {
        stripe.label = nameCell.value;
        renderChartFromData(lastData, { skipLegend: true });
      });

      const tipCell = document.createElement('div');
      tipCell.className = 'peaks-tip';
      tipCell.textContent = stripe.tip || t('tipPlaceholder');
      const removeBtn = document.createElement('button');
      removeBtn.className = 'peaks-remove';
      removeBtn.setAttribute('aria-label', 'remove stripe');
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => {
        stripes = stripes.filter((s) => s.id !== stripe.id);
        renderChartFromData(lastData);
        renderStripesTable();
      });
      row.append(colorSwatch, val, nameCell, tipCell, removeBtn);
      peaksBody.appendChild(row);
    });
  }

  function setControlsEnabled(enabled) {
    refreshBtn.disabled = !enabled;
    saveCsvBtn.disabled = !enabled;
    resetZoomBtn.disabled = !enabled;
    xMinInput.disabled = !enabled;
    xMaxInput.disabled = !enabled;
    yMinInput.disabled = !enabled;
    yMaxInput.disabled = !enabled;
    chartRow.classList.toggle('is-hidden', !enabled);
    document.getElementById('chartControls').classList.toggle('active', enabled);
    if (enabled) {
      xMaxInput.value = String(defaultXRange.max);
      xMinInput.value = String(defaultXRange.min);
      yMinInput.value = '';
      yMaxInput.value = '';
      yMinInput.placeholder = t('yAuto') || 'auto';
      yMaxInput.placeholder = t('yAuto') || 'auto';
      visibleSeries = new Map();
    }
  }

  refreshBtn.addEventListener('click', () => {
    if (lastData) {
      renderChartFromData(lastData);
    }
  });
  addStripeBtn?.addEventListener('click', () => {
    const xVal =
      markerActive && markerX !== null
        ? markerX
        : (() => {
            const cx = Number(xMaxInput.value) || defaultXRange.max;
            const cn = Number(xMinInput.value) || defaultXRange.min;
            return (cx + cn) / 2;
          })();
    const color = stripeColors[stripes.length % stripeColors.length];
    stripeIdSeq += 1;
    const matches = tipsForX(xVal);
    const label = matches[0]?.class || matches[0]?.group || '';
    const tipText = matches
      .map((m) => [m.group, m.class, m.details].filter(Boolean).join(' — '))
      .join('; ');
    stripes = [...stripes, { id: `stripe-${stripeIdSeq}`, x: xVal, color, label, tip: tipText }];
    renderChartFromData(lastData);
    renderStripesTable();
  });

  copyStripesBtn?.addEventListener('click', () => {
    if (!stripes.length) return;
    const header = ['wavenumber', 'label', 'tip'];
    const rows = stripes.map((s) => [s.x.toFixed(2), s.label || '', s.tip || '']);
    const tsv = [header.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(tsv).then(
        () => setStatus('Copied stripes.'),
        () => setStatus('Copy failed.', true)
      );
    }
  });
  resetZoomBtn.addEventListener('click', () => {
    setRangeInputs({
      xMax: defaultXRange.max,
      xMin: defaultXRange.min,
      yMin: null,
      yMax: null,
    });
    renderChartFromData(lastData);
  });
  const applyRangeChanges = () => {
    if (!lastData) return;
    renderChartFromData(lastData);
  };
  [xMinInput, xMaxInput, yMinInput, yMaxInput].forEach((el) => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyRangeChanges();
      }
    });
  });

  saveCsvBtn.addEventListener('click', async () => {
    if (!lastParsedRows.length || !lastColumns.length) return;
    const defaultName = fileNameInput.value.trim() || 'merged.csv';
    const activeCols = lastColumns.filter((col) => visibleSeries.get(col) !== false);
    if (!activeCols.length) {
      setStatus(t('statusNoVisible'), true);
      return;
    }
    const filteredCsv = buildCsvFromRows(lastParsedRows, activeCols);
    const blob = new Blob([filteredCsv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const downloadName = defaultName.toLowerCase().endsWith('.csv') ? defaultName : `${defaultName}.csv`;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus(t('statusSaved')(downloadName));
  });

  async function handleMerge() {
    if (merging) return;
    merging = true;
    mergeBtn.disabled = true;
    const files = Array.from(fileInput.files || []);
    if (!files.length) {
      setStatus(t('statusNoFiles'), true);
      merging = false;
      mergeBtn.disabled = false;
      return;
    }
    setStatus(t('statusReading'));
    try {
      const payloadFiles = [];
      for (const f of files) {
        const content = await readFileText(f);
        payloadFiles.push({ name: f.name, content });
      }
      const downloadName = fileNameInput.value.trim() || 'merged.csv';

      const parseInfraredText = (text) => {
        const rows = [];
        const lines = text.split(/\r?\n/);
        for (const raw of lines) {
          const line = raw.trim();
          if (!line) continue;
          const parts = line.split(/\s+/);
          if (parts.length >= 2 && !Number.isNaN(Number(parts[0])) && !Number.isNaN(Number(parts[1]))) {
            rows.push([Number(parts[0]), Number(parts[1])]);
          }
        }
        return rows;
      };

      const columns = payloadFiles.map((f) => f.name.replace(/[^a-zA-Z0-9_-]+/g, '_') || 'col');
      const table = new Map();
      let totalRows = 0;
      payloadFiles.forEach((file, idx) => {
        const col = columns[idx];
        const rows = parseInfraredText(file.content);
        totalRows += rows.length;
        for (const [x, y] of rows) {
          const key = String(x);
          if (!table.has(key)) table.set(key, { x: Number(x), vals: new Map() });
          table.get(key).vals.set(col, y);
        }
      });

      const header = ['wavenumber', ...columns];
      const sorted = Array.from(table.values()).sort((a, b) => b.x - a.x);
      const lines = [header.join(',')];
      for (const row of sorted) {
        lines.push([row.x, ...columns.map((c) => (row.vals.has(c) ? row.vals.get(c) : ''))].join(','));
      }

      const csvText = lines.join('\n');
      setStatus(`${t('statusSending')} ${payloadFiles.length} files, ${totalRows} points...`);

      const parsed = d3.csvParse(csvText, d3.autoType);
      const cols = parsed.columns.map((c) => c.trim()).filter((c) => c && c !== 'wavenumber');
      if (!cols.length) {
        setStatus(t('statusNoDataCols'), true);
        return;
      }
      lastParsedRows = parsed;
      lastColumns = cols;
      const series = [];
      for (const col of cols) {
        for (const row of parsed) {
          if (typeof row[col] === 'number' && typeof row.wavenumber === 'number') {
            series.push({ file: col, x: row.wavenumber, y: row[col] });
          }
        }
      }
      if (!series.length) {
        setStatus(t('statusNoNumeric'), true);
        return;
      }
      lastData = series;
      defaultYRange = computeAdjustedExtent(series) || d3.extent(series, (d) => d.y);
      stripes = [];
      baselineSeries = null;
      baselineMap = new Map();
      offsets = new Map();
      cols.forEach((col) => offsets.set(col, 0));
      if (!visibleSeries.size) {
        cols.forEach((col) => visibleSeries.set(col, true));
      }
      downloadLinkEl.textContent = '';
      setStatus(t('statusReadyToSave'));
      setControlsEnabled(true);
      renderChartFromData(lastData);
      renderStripesTable();
    } catch (err) {
      console.error(err);
      setStatus(err.message, true);
    } finally {
      mergeBtn.disabled = false;
      merging = false;
    }
  }

  mergeBtn.addEventListener('click', handleMerge);

  document.addEventListener('keydown', (event) => {
    if (!markerUpdater || !markerActive) return;
    const key = event.key;
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      event.preventDefault();
      const step = event.shiftKey ? markerStep * 5 : markerStep;
      const direction = key === 'ArrowLeft' ? -step : step;
      markerUpdater(direction);
    }
  });
})();
