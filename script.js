// Preloader: count 0 -> 100%, then "Hi, I am Abhishek Rana.", then badge + role headline, then "Show Portfolio"
(function initPreloader(){
  const preloader = document.getElementById('preloader');
  const percentEl = document.getElementById('preloaderPercent');
  const barFill = document.getElementById('preloaderBarFill');
  const counterWrap = document.getElementById('preloaderCounterWrap');
  const hiPhase = document.getElementById('preloaderHi');
  const reveal = document.getElementById('preloaderReveal');
  const showBtn = document.getElementById('showPortfolioBtn');
  if (!preloader || !percentEl || !barFill || !counterWrap || !hiPhase || !reveal || !showBtn) return;

  const duration = 1600; // ms to reach 100%
  const start = performance.now();

  function tick(now){
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const count = Math.floor(progress * 100);
    percentEl.textContent = count;
    barFill.style.width = count + '%';

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      percentEl.textContent = 100;
      barFill.style.width = '100%';
      setTimeout(() => {
        counterWrap.classList.remove('phase-show');
        hiPhase.classList.add('phase-show');
      }, 250);

      setTimeout(() => {
        hiPhase.classList.remove('phase-show');
        reveal.classList.add('phase-show');
      }, 250 + 1500);
    }
  }
  requestAnimationFrame(tick);

  function revealPortfolio(){
    preloader.classList.add('preloader-hide');
    document.body.classList.remove('is-loading');
    setTimeout(() => { preloader.style.display = 'none'; }, 650);
  }

  showBtn.addEventListener('click', revealPortfolio);
})();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = sections[0].id;
  const scrollY = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollY >= section.offsetTop) {
      current = section.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();
