(function(){
  var nav = document.getElementById('sideNav');
  if (!nav) return;

  function slugify(text){
    return text.toLowerCase().trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }

  var labels = document.querySelectorAll('.section-label');
  var sections = [];

  labels.forEach(function(labelEl){
    var sec = labelEl.closest('section') || labelEl.parentElement;
    if (!sec.id) sec.id = slugify(labelEl.textContent);

    var link = document.createElement('a');
    link.href = '#' + sec.id;
    link.textContent = labelEl.textContent.trim();
    nav.appendChild(link);

    sections.push(sec);
  });

  var links = nav.querySelectorAll('a');
  var isScrolling = false;           // ← новый флаг
  var activeLinkDuringScroll = null; // ← запоминаем, какой пункт должен светиться

  var observer = new IntersectionObserver(function(entries){
    if (isScrolling) return; // во время программного скролла игнорируем обсервер

    entries.forEach(function(entry){
      var link = nav.querySelector('a[href="#' + entry.target.id + '"]');
      if (!link) return;

      if (entry.isIntersecting){
        links.forEach(function(l){ l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(function(sec){ observer.observe(sec); });

  // === Обработка кликов по пунктам меню ===
  nav.addEventListener('click', function(e){
    var link = e.target.closest('a');
    if (!link) return;

    var targetId = link.getAttribute('href').slice(1);
    var targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    isScrolling = true;
    activeLinkDuringScroll = link;

    // сразу подсвечиваем кликнутый пункт
    links.forEach(function(l){ l.classList.remove('active'); });
    link.classList.add('active');

    // плавный скролл
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // определяем, когда скролл реально закончился
    var scrollTimeout;
    function checkScrollEnd(){
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function(){
        if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 10 ||
            Math.abs(targetSection.getBoundingClientRect().top) < 50) { // достаточно близко
          
          isScrolling = false;
          activeLinkDuringScroll = null;
          window.removeEventListener('scroll', checkScrollEnd);
        }
      }, 150);
    }

    window.addEventListener('scroll', checkScrollEnd, { passive: true });
  });
})();