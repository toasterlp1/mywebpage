/* Minimal JS for Webcore vibes + convenience */
(function(){
  const $ = (sel, el=document) => el.querySelector(sel);

  // Highlight current nav item automatically
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav a.btn').forEach(a=>{
    const href = (a.getAttribute('href') || '').toLowerCase();
    if(href === path) a.setAttribute('aria-current','page');
  });

  // Fake visitor counter (localStorage)
  const counterEl = $('[data-visitor-counter]');
  if(counterEl){
    const key = 'toasterlp_counter';
    let n = parseInt(localStorage.getItem(key) || '0', 10);
    if(!Number.isFinite(n) || n < 0) n = 0;
    n += 1;
    localStorage.setItem(key, String(n));
    counterEl.textContent = String(n).padStart(6,'0');
  }

  // Random status line
  const statusEl = $('[data-status]');
  if(statusEl){
    const lines = [
      "currently vibing in the void",
      "editing clips • drinking water (maybe)",
      "listening to something loud",
      "grinding games • avoiding grass",
      "building this site in the shadows",
      "AFK (not really)"
    ];
    statusEl.textContent = lines[Math.floor(Math.random()*lines.length)];
  }

  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const val = btn.getAttribute('data-copy') || '';
      try{
        await navigator.clipboard.writeText(val);
        toast(`copied: ${val}`);
      }catch(e){
        toast("copy failed (browser blocked it)");
      }
    });
  });

  // Toast helper
  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role','status');
  document.body.appendChild(toastEl);
  let toastTimer = null;

  function toast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> toastEl.classList.remove('show'), 1600);
  }
})();
