/*
  Генератор QR-кодов с логотипом в центре (офлайн)
  Использует библиотеку qr-code-styling (vendor/qr-code-styling.js)
*/

(function(){
  const els = {
    text: document.getElementById('text'),
    ecc: document.getElementById('ecc'),
    size: document.getElementById('size'),
    sizeVal: document.getElementById('sizeVal'),
    margin: document.getElementById('margin'),
    marginVal: document.getElementById('marginVal'),
    fg: document.getElementById('fg'),
    bg: document.getElementById('bg'),
    quiet: document.getElementById('quiet'),
    cornerSquare: document.getElementById('cornerSquare'),
    cornerSquareColor: document.getElementById('cornerSquareColor'),
    cornerDot: document.getElementById('cornerDot'),
    cornerDotColor: document.getElementById('cornerDotColor'),
    logo: document.getElementById('logo'),
    logoSize: document.getElementById('logoSize'),
    logoSizeVal: document.getElementById('logoSizeVal'),
    logoPad: document.getElementById('logoPad'),
    logoPadVal: document.getElementById('logoPadVal'),
    btnGenerate: document.getElementById('btnGenerate'),
    btnDownload: document.getElementById('btnDownload'),
    btnDownloadSvg: document.getElementById('btnDownloadSvg'),
    btnClearLogo: document.getElementById('btnClearLogo'),
    canvas: document.getElementById('canvas'),
  };

  if (!els.canvas){
    console.error('Не найден контейнер для предпросмотра QR.');
    return;
  }

  if (typeof QRCodeStyling === 'undefined'){
    console.error('qr-code-styling library not found.');
    return;
  }

  const container = els.canvas;

  let qrCode = null;
  let logoDataUrl = null;

  function clamp(n, min, max){
    return Math.max(min, Math.min(max, n));
  }

  function getDotsType(){
    const val = (els.quiet && els.quiet.value || 'square').toLowerCase();
    const supported = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'];
    return supported.includes(val) ? val : 'square';
  }

  function estimateMarginPx(size){
    const marginModules = clamp(parseInt(els.margin.value, 10) || 4, 0, 32);
    const base = Math.max(size / 40, 2);
    return Math.round(base * marginModules);
  }

  function collectCornerOptions(typeEl, colorEl){
    if (!typeEl) return null;
    const typeRaw = String(typeEl.value || '').toLowerCase();
    if (!typeRaw || typeRaw === 'none'){
      return null;
    }
    const options = { type: typeRaw };
    const colorVal = colorEl && colorEl.value;
    if (colorVal && typeof colorVal === 'string'){
      options.color = colorVal;
    }
    return options;
  }

  function buildOptions(){
    const text = (els.text.value || '').trim() || 'Hello, QR!';
    const size = clamp(parseInt(els.size.value, 10) || 320, 64, 2048);
    const ecc = (els.ecc.value || 'M').toUpperCase();
    const fg = els.fg.value || '#000000';
    const bg = els.bg.value || '#ffffff';
    const margin = estimateMarginPx(size);
    const logoPercent = clamp(parseInt(els.logoSize.value, 10) || 40, 5, 95) / 100;
    const logoMargin = clamp(parseInt(els.logoPad.value, 10) || 0, 0, 256);

    const imageOptions = {
      crossOrigin: 'anonymous',
      margin: logoMargin,
      hideBackgroundDots: !!logoDataUrl,
      imageSize: logoPercent,
    };

    const cornersSquareOptions = collectCornerOptions(els.cornerSquare, els.cornerSquareColor);
    const cornersDotOptions = collectCornerOptions(els.cornerDot, els.cornerDotColor);
    if (cornersSquareOptions && !cornersSquareOptions.color){
      cornersSquareOptions.color = fg;
    }
    if (cornersDotOptions && !cornersDotOptions.color){
      cornersDotOptions.color = fg;
    }

    const options = {
      width: size,
      height: size,
      data: text,
      image: logoDataUrl || '',
      margin,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: ecc,
      },
      backgroundOptions: {
        color: bg,
      },
      dotsOptions: {
        color: fg,
        type: getDotsType(),
      },
      imageOptions,
    };

    if (cornersSquareOptions){
      options.cornersSquareOptions = cornersSquareOptions;
    }
    if (cornersDotOptions){
      options.cornersDotOptions = cornersDotOptions;
    }

    return options;
  }

  function renderQR(){
    try {
      const options = buildOptions();
      if (!qrCode){
        qrCode = new QRCodeStyling(options);
        container.innerHTML = '';
        qrCode.append(container);
      } else {
        qrCode.update(options);
      }
    } catch (err){
      console.error(err);
      alert('Не удалось создать QR с текущими параметрами. Попробуйте изменить настройки.');
    }
  }

  function download(extension){
    if (!qrCode){
      renderQR();
    }
    if (!qrCode){
      return;
    }
    try {
      qrCode.download({ name: 'qr', extension });
    } catch (err){
      console.error(err);
      alert('Не удалось сохранить файл.');
    }
  }

  function handleLogoFile(file){
    if (!file){
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!dataUrl){
        alert('Не удалось загрузить логотип.');
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        logoDataUrl = dataUrl;
        renderQR();
      };
      img.onerror = () => {
        alert('Не удалось загрузить логотип. Попробуйте другой файл.');
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      alert('Ошибка чтения файла логотипа.');
    };
    reader.readAsDataURL(file);
  }

  function loadLogoDataUrl(dataUrl){
    if (!dataUrl || typeof dataUrl !== 'string'){
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      logoDataUrl = dataUrl;
      renderQR();
    };
    img.onerror = () => {
      console.warn('Не удалось загрузить логотип из data URL');
    };
    img.src = dataUrl;
  }

  // UI bindings
  els.size.addEventListener('input', () => {
    els.sizeVal.textContent = els.size.value;
    renderQR();
  });
  els.margin.addEventListener('input', () => {
    els.marginVal.textContent = els.margin.value;
    renderQR();
  });
  els.logoSize.addEventListener('input', () => {
    els.logoSizeVal.textContent = els.logoSize.value;
    renderQR();
  });
  els.logoPad.addEventListener('input', () => {
    els.logoPadVal.textContent = els.logoPad.value;
    renderQR();
  });

  [
    els.text,
    els.ecc,
    els.fg,
    els.bg,
    els.quiet,
    els.cornerSquare,
    els.cornerSquareColor,
    els.cornerDot,
    els.cornerDotColor,
  ].forEach(el => {
    if (!el) return;
    el.addEventListener('input', renderQR);
    el.addEventListener('change', renderQR);
  });

  els.logo.addEventListener('change', () => handleLogoFile(els.logo.files[0]));

  els.btnGenerate.addEventListener('click', (e) => {
    e.preventDefault();
    renderQR();
  });
  els.btnDownload.addEventListener('click', (e) => {
    e.preventDefault();
    download('png');
  });
  els.btnDownloadSvg.addEventListener('click', (e) => {
    e.preventDefault();
    download('svg');
  });
  els.btnClearLogo.addEventListener('click', (e) => {
    e.preventDefault();
    els.logo.value = '';
    logoDataUrl = null;
    renderQR();
  });

  // Defaults
  els.text.value = 'https://bpacks.eco/?utm_source=qr';
  els.sizeVal.textContent = els.size.value;
  els.marginVal.textContent = els.margin.value;
  els.logoSizeVal.textContent = els.logoSize.value;
  els.logoPadVal.textContent = els.logoPad.value;

  window.addEventListener('load', () => {
    try {
      renderQR();
      if (window.DEFAULT_LOGO_DATA_URL){
        loadLogoDataUrl(String(window.DEFAULT_LOGO_DATA_URL));
      } else if (logoDataUrl){
        loadLogoDataUrl(logoDataUrl);
      }
    } catch (err){
      console.error(err);
    }
  });
})();
