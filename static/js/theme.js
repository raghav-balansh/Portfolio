const btn = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(t){
  root.setAttribute('data-theme', t);
  localStorage.setItem('site-theme', t);
}

if(btn){
  btn.addEventListener('click', () => {
    const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(now);
  });
}

const saved = localStorage.getItem('site-theme');
if(saved) root.setAttribute('data-theme', saved);
else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
  setTheme('dark');
}
