function openModal(id){
  var d = document.getElementById(id);
  if (!d) return;
  d.querySelectorAll('iframe[data-src]').forEach(function(f){
    if (!f.src) f.src = f.dataset.src;
  });
  if (typeof d.showModal === 'function') d.showModal();
}

document.querySelectorAll('dialog').forEach(function(d){
  d.addEventListener('close', function(){
    d.querySelectorAll('iframe[data-src]').forEach(function(f){
      f.src = ''; // остановить видео при закрытии
    });
  });

  // клик по фону (вне modal-inner) закрывает попап
  d.addEventListener('click', function(e){
    var r = d.getBoundingClientRect();
    var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) d.close();
  });
});


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

  function setActive(link){
    links.forEach(function(l){ l.classList.remove('active'); });
    if (link) link.classList.add('active');
  }

  // --- подавляем обсервер только на время самого скролла после клика ---
  var isManualScroll = false;
  var settleTimer = null;
  var hardCapTimer = null;

  function releaseManualScroll(){
    isManualScroll = false;
    clearTimeout(settleTimer);
    clearTimeout(hardCapTimer);
  }

  links.forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();

      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;

      isManualScroll = true;
      setActive(link);

      // скроллим так, чтобы верх блока оказался ровно в центре экрана —
      // то есть там же, где его "читает" IntersectionObserver ниже
      var rect = target.getBoundingClientRect();
      var targetY = rect.top + window.scrollY - window.innerHeight * 0.5;
      window.scrollTo({ top: Math.max(targetY, 0), behavior: 'smooth' });

      if (history.pushState) history.pushState(null, '', '#' + id);

      // сброс, как только скролл реально остановился
      clearTimeout(settleTimer);
      settleTimer = setTimeout(releaseManualScroll, 150);

      // страховка: даже если событий scroll не будет вовсе (клик по уже
      // видимому разделу) — подавление снимется само и обсервер не зависнет
      clearTimeout(hardCapTimer);
      hardCapTimer = setTimeout(releaseManualScroll, 1500);
    });
  });

  window.addEventListener('scroll', function(){
    if (!isManualScroll) return;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(releaseManualScroll, 150);
  }, { passive: true });

  var observer = new IntersectionObserver(function(entries){
    if (isManualScroll) return;
    entries.forEach(function(entry){
      var link = nav.querySelector('a[href="#' + entry.target.id + '"]');
      if (!link) return;
      if (entry.isIntersecting){
        setActive(link);
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  sections.forEach(function(sec){ observer.observe(sec); });
})();