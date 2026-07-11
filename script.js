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