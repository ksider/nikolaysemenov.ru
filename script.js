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

  var observer = new IntersectionObserver(function(entries){
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
})();