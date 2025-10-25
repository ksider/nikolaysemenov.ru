/*
  Генератор QR-кодов с логотипом в центре (офлайн)
  Использует библиотеку qr-code-styling (vendor/qr-code-styling.js)
*/

(function(){
  const AVAILABLE_LANGS = ['ru', 'en'];
  const FALLBACK_LANG = 'ru';
  const TRANSLATIONS = {
    ru: {
      pageTitle: 'Генератор QR-кодов',
      appTitle: 'Генератор QR-кодов',
      appSubtitle: 'Настройте внешний вид QR-кода',
      sectionContent: 'Содержимое',
      textLabel: 'Текст или URL',
      textPlaceholder: 'Введите текст, ссылку или любые данные',
      sectionSizing: 'Размер и точность',
      eccLabel: 'Коррекция ошибок',
      eccL: 'L (наименьшая, больше данных)',
      eccM: 'M',
      eccQ: 'Q',
      eccH: 'H (наибольшая, устойчивее с логотипом)',
      sizeLabel: 'Размер (пикс.)',
      marginLabel: 'Отступ (модули)',
      sectionModules: 'Модули и цвета',
      fgLabel: 'Цвет QR',
      bgLabel: 'Фон',
      modulesShapeLabel: 'Форма модулей',
      modulesSquare: 'Классические',
      modulesRounded: 'Скруглённые',
      modulesDots: 'Круглые точки',
      modulesClassy: 'Classy',
      modulesClassyRounded: 'Classy округлённые',
      modulesExtraRounded: 'Максимальное скругление',
      sectionCorners: 'Углы',
      cornerSquareLabel: 'Узоры углов (наружные)',
      cornerSquareClassic: 'Классические',
      cornerSquareRounded: 'Скруглённые',
      cornerSquareDot: 'Точки',
      cornerDotLabel: 'Узоры углов (внутренние)',
      cornerDotDot: 'Точка',
      cornerDotSquare: 'Квадрат',
      cornerDotNone: 'Без оформления',
      cornerSquareColorLabel: 'Цвет углов (наружные)',
      cornerDotColorLabel: 'Цвет углов (внутренние)',
      sectionLogo: 'Логотип',
      logoLabel: 'Логотип (PNG/JPG/SVG)',
      logoSizeLabel: 'Размер логотипа (%)',
      logoPaddingLabel: 'Отступ изображения (пикс.)',
      btnGenerate: 'Сгенерировать',
      btnDownloadPng: 'Скачать PNG',
      btnDownloadSvg: 'Скачать SVG',
      btnClearLogo: 'Очистить логотип',
      previewAria: 'Предпросмотр QR',
      langSwitcherAria: 'Переключатель языка',
      colorPickerAria: 'Выбор цвета',
      errorCanvasMissing: 'Не найден контейнер для предпросмотра QR.',
      errorLibraryMissing: 'Библиотека qr-code-styling не найдена.',
      errorRender: 'Не удалось создать QR с текущими параметрами. Попробуйте изменить настройки.',
      errorDownload: 'Не удалось сохранить файл.',
      errorLogoLoad: 'Не удалось загрузить логотип.',
      errorLogoLoadTryAnother: 'Не удалось загрузить логотип. Попробуйте другой файл.',
      errorLogoRead: 'Ошибка чтения файла логотипа.',
      warnLogoDataUrl: 'Не удалось загрузить логотип из data URL.',
    },
    en: {
      pageTitle: 'QR Code Generator',
      appTitle: 'QR Code Generator',
      appSubtitle: 'Fine-tune the look of your QR code',
      sectionContent: 'Content',
      textLabel: 'Text or URL',
      textPlaceholder: 'Enter text, link, or any data',
      sectionSizing: 'Size & Accuracy',
      eccLabel: 'Error correction',
      eccL: 'L (lowest, more data)',
      eccM: 'M',
      eccQ: 'Q',
      eccH: 'H (highest, better with logo)',
      sizeLabel: 'Size (px)',
      marginLabel: 'Margin (modules)',
      sectionModules: 'Modules & Colors',
      fgLabel: 'QR color',
      bgLabel: 'Background',
      modulesShapeLabel: 'Module style',
      modulesSquare: 'Classic',
      modulesRounded: 'Rounded',
      modulesDots: 'Dots',
      modulesClassy: 'Classy',
      modulesClassyRounded: 'Classy rounded',
      modulesExtraRounded: 'Extra rounded',
      sectionCorners: 'Corners',
      cornerSquareLabel: 'Corner patterns (outer)',
      cornerSquareClassic: 'Classic',
      cornerSquareRounded: 'Rounded',
      cornerSquareDot: 'Dots',
      cornerDotLabel: 'Corner patterns (inner)',
      cornerDotDot: 'Dot',
      cornerDotSquare: 'Square',
      cornerDotNone: 'None',
      cornerSquareColorLabel: 'Corner color (outer)',
      cornerDotColorLabel: 'Corner color (inner)',
      sectionLogo: 'Logo',
      logoLabel: 'Logo (PNG/JPG/SVG)',
      logoSizeLabel: 'Logo size (%)',
      logoPaddingLabel: 'Logo padding (px)',
      btnGenerate: 'Generate',
      btnDownloadPng: 'Download PNG',
      btnDownloadSvg: 'Download SVG',
      btnClearLogo: 'Clear logo',
      previewAria: 'QR preview',
      langSwitcherAria: 'Language selector',
      colorPickerAria: 'Select color',
      errorCanvasMissing: 'Preview container not found.',
      errorLibraryMissing: 'qr-code-styling library not found.',
      errorRender: 'Failed to generate a QR code with the current settings. Please adjust the configuration.',
      errorDownload: 'Could not save the file.',
      errorLogoLoad: 'Could not load the logo.',
      errorLogoLoadTryAnother: 'Could not load the logo. Try a different file.',
      errorLogoRead: 'Error reading the logo file.',
      warnLogoDataUrl: 'Could not load logo from data URL.',
    },
  };

  function normalizeLang(lang){
    if (!lang) return null;
    const lower = String(lang).toLowerCase();
    if (AVAILABLE_LANGS.includes(lower)) return lower;
    const prefix = lower.split('-')[0];
    return AVAILABLE_LANGS.includes(prefix) ? prefix : null;
  }

  function safeGetStorage(key){
    try {
      return window.localStorage ? window.localStorage.getItem(key) : null;
    } catch (err){
      return null;
    }
  }

  function safeSetStorage(key, value){
    try {
      if (window.localStorage){
        window.localStorage.setItem(key, value);
      }
    } catch (err){
      // ignore storage errors
    }
  }

  function detectInitialLang(){
    const stored = normalizeLang(safeGetStorage('qrLang'));
    if (stored) return stored;
    if (Array.isArray(navigator.languages)){
      for (const lng of navigator.languages){
        const normalized = normalizeLang(lng);
        if (normalized) return normalized;
      }
    }
    return normalizeLang(navigator.language) || FALLBACK_LANG;
  }

  let currentLang = detectInitialLang();

  function getDict(lang){
    return TRANSLATIONS[lang] || TRANSLATIONS[FALLBACK_LANG];
  }

  function translateKey(key, lang = currentLang){
    const dict = getDict(lang);
    const fallbackDict = getDict(FALLBACK_LANG);
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)){
      return dict[key];
    }
    if (fallbackDict && Object.prototype.hasOwnProperty.call(fallbackDict, key)){
      return fallbackDict[key];
    }
    return key;
  }

  function updateLangButtons(lang){
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  }

  function applyTranslations(lang){
    const dict = getDict(lang);
    const fallbackDict = getDict(FALLBACK_LANG);
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.dataset.i18nKey;
      if (!key) return;
      const target = el.dataset.i18nTarget || 'text';
      const value = Object.prototype.hasOwnProperty.call(dict, key)
        ? dict[key]
        : (fallbackDict && Object.prototype.hasOwnProperty.call(fallbackDict, key) ? fallbackDict[key] : key);
      switch (target){
        case 'text':
          el.textContent = value;
          break;
        case 'html':
          el.innerHTML = value;
          break;
        case 'placeholder':
          el.setAttribute('placeholder', value);
          el.placeholder = value;
          break;
        case 'aria-label':
          el.setAttribute('aria-label', value);
          break;
        default:
          if (target in el){
            el[target] = value;
          } else {
            el.setAttribute(target, value);
          }
      }
    });
    document.title = translateKey('pageTitle', lang);
    document.documentElement.lang = lang;
    updateLangButtons(lang);
  }

  function setLanguage(lang, {store = true} = {}){
    const normalized = normalizeLang(lang) || FALLBACK_LANG;
    currentLang = normalized;
    applyTranslations(normalized);
    if (store){
      safeSetStorage('qrLang', normalized);
    }
  }

  function t(key){
    return translateKey(key, currentLang);
  }

  setLanguage(currentLang, {store: false});

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang, {store: true});
    });
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'qrLang' && event.newValue){
      setLanguage(event.newValue, {store: false});
    }
  });

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
    console.error(t('errorCanvasMissing'));
    return;
  }

  if (typeof QRCodeStyling === 'undefined'){
    console.error(t('errorLibraryMissing'));
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
      alert(t('errorRender'));
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
      alert(t('errorDownload'));
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
        alert(t('errorLogoLoad'));
        return;
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        logoDataUrl = dataUrl;
        renderQR();
      };
      img.onerror = () => {
        alert(t('errorLogoLoadTryAnother'));
      };
      img.src = dataUrl;
    };
    reader.onerror = () => {
      alert(t('errorLogoRead'));
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
      console.warn(t('warnLogoDataUrl'));
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
