
document.addEventListener('DOMContentLoaded',()=>{
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
});
// Ajax-submit the contact form (Formspree)
(function(){
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending...';
    try {
      const res = await fetch(form.action, { 
        method: 'POST', 
        body: new FormData(form), 
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        status.textContent = '✅ Thanks! Your message has been sent.';
      } else {
        status.textContent = '⚠️ Sorry, there was a problem. Please try again or email me directly.';
      }
    } catch {
      status.textContent = '⚠️ Network error. Please try again later.';
    }
  });
})();
/* ---- Lightbox for gallery ---- */
(function () {
  const grid = document.querySelector('.gallery');
  if (!grid) return;

  const imgs = [...grid.querySelectorAll('img')];
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const btnClose = lb.querySelector('.lb-close');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');

  let idx = 0;
  function open(i){ idx = i; lbImg.src = imgs[idx].src; lb.classList.remove('hidden'); }
  function close(){ lb.classList.add('hidden'); lbImg.removeAttribute('src'); }
  function prev(){ open((idx - 1 + imgs.length) % imgs.length); }
  function next(){ open((idx + 1) % imgs.length); }

  imgs.forEach((img,i)=>img.addEventListener('click',()=>open(i)));
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  window.addEventListener('keydown', e => {
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
