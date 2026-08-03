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

// Scroll reveal: fade + slide up elements as they enter the viewport
const revealTargets = document.querySelectorAll(
  '.skill-card, .project-card, .about-card, .edu-card, .section-tag, .section-title'
);
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  revealObserver.observe(el);
});

// Skill/project tag stagger: each tag in a card fades in slightly after the previous
document.querySelectorAll('.tags').forEach(group => {
  group.querySelectorAll('.tag').forEach((tag, i) => {
    tag.style.transitionDelay = (i * 0.06) + 's';
  });
});
const tagObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      tagObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.tags').forEach(group => tagObserver.observe(group));

// Typing effect on the hero role line
(function typeHeroRole(){
  const el = document.querySelector('.hero-role');
  if (!el) return;
  const text = el.textContent;
  el.textContent = '';
  el.classList.add('typing');
  let i = 0;
  function type(){
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    } else {
      el.classList.remove('typing');
      el.classList.add('typing-done');
    }
  }
  // Start after the preloader has revealed the page
  setTimeout(type, 900);
})();

// Cursor spotlight glow that follows the mouse across the hero section
(function cursorSpotlight(){
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  hero.appendChild(glow);

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    glow.style.opacity = '1';
  });
  hero.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });
})();

// Magnetic buttons: pill buttons shift slightly toward the cursor on hover
(function magneticButtons(){
  const buttons = document.querySelectorAll('.btn-pill');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();