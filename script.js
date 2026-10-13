// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Mobile menu
const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Theme toggle (remembers choice)
const root = document.documentElement, themeBtn = document.getElementById('themeBtn');
const setTheme = t => { root.setAttribute('data-theme', t); themeBtn.innerHTML = t === 'light' ? '&#9790;' : '&#9788;'; };
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Terminal typing intro
const lines = [
  { p: '$ ', t: 'whoami' },
  { o: 'subhani-abdul :: sr-devops-engineer | sre | devsecops' },
  { p: '$ ', t: 'kubectl get skills --all-namespaces' },
  { o: 'azure  aws  gcp  kubernetes  terraform  gitops  ci/cd  cloud-security' }
];
const term = document.getElementById('term');
let li = 0, ci = 0;
function type() {
  if (li >= lines.length) { term.insertAdjacentHTML('beforeend', '<span class="p">$ </span><span class="cursor"></span>'); return; }
  const l = lines[li];
  if (l.o) { term.insertAdjacentHTML('beforeend', `<div class="o">${l.o}</div>`); li++; setTimeout(type, 350); return; }
  if (ci === 0) term.insertAdjacentHTML('beforeend', `<div><span class="p">${l.p}</span><span class="t"></span></div>`);
  term.lastElementChild.querySelector('.t').textContent += l.t[ci++];
  if (ci >= l.t.length) { li++; ci = 0; setTimeout(type, 300); } else setTimeout(type, 45);
}
type();

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
