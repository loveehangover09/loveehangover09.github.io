const intro = document.getElementById('intro');
const enterButton = document.getElementById('enterButton');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const sakuraLayer = document.getElementById('sakuraLayer');

document.body.classList.add('no-scroll');

function enterSite() {
  intro.classList.add('is-leaving');
  window.setTimeout(() => {
    intro.classList.add('is-hidden');
    document.body.classList.remove('no-scroll');
  }, 620);
}

enterButton.addEventListener('click', enterSite);

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light-theme');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', theme);
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'CLOSE' : 'MENU';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = 'MENU';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const petalCount = window.innerWidth < 700 ? 15 : 26;

for (let index = 0; index < petalCount; index += 1) {
  const petal = document.createElement('span');
  const size = 16 + Math.random() * 26;
  petal.className = 'petal';
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty('--size', `${size}px`);
  petal.style.setProperty('--opacity', (0.45 + Math.random() * 0.5).toFixed(2));
  petal.style.setProperty('--duration', `${8 + Math.random() * 10}s`);
  petal.style.setProperty('--delay', `${-Math.random() * 18}s`);
  petal.style.setProperty('--drift-a', `${-35 + Math.random() * 80}px`);
  petal.style.setProperty('--drift-b', `${-70 + Math.random() * 140}px`);
  petal.style.setProperty('--drift-c', `${-100 + Math.random() * 200}px`);
  sakuraLayer.appendChild(petal);
}

document.getElementById('year').textContent = new Date().getFullYear();
