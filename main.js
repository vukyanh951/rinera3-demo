document.addEventListener('DOMContentLoaded', () => {
  // generic helper: scroll an element so its center aligns with the viewport center
  function scrollElementToCenter(selector) {
    const target = document.querySelector(selector);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const targetCenterY = window.scrollY + rect.top + rect.height / 2;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTo = Math.max(0, Math.min(targetCenterY - window.innerHeight / 2, maxScroll));
    window.scrollTo({ top: scrollTo, behavior: 'smooth' });
  }

  // convenience wrappers
  function scrollWorksImageToCenter() { scrollElementToCenter('.works-image'); }
  function scrollTerrariaToCenter() { scrollElementToCenter('.terraria'); }

  const card = document.querySelector('.card');
  if (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // ignore clicks on interactive children
      const tag = (e.target && e.target.tagName) || '';
      if (['A','BUTTON','INPUT','SELECT','TEXTAREA'].includes(tag)) return;
      scrollWorksImageToCenter();
    });
  }

  // Bind "Projects" nav link to the works-image scroll
  const projectLink = Array.from(document.querySelectorAll('.nav-list a'))
    .find(a => ((a.textContent || '').trim().toLowerCase().includes('project')) || a.dataset.scroll === 'works');

  if (projectLink) {
    projectLink.style.cursor = 'pointer';
    projectLink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollWorksImageToCenter();
    });
  }

  // Bind "About" nav link to scroll to the bottom of the page
  const aboutLink = Array.from(document.querySelectorAll('.nav-list a'))
    .find(a => ((a.textContent || '').trim().toLowerCase().includes('about')) || a.dataset.scroll === 'bottom');
  if (aboutLink) {
    aboutLink.style.cursor = 'pointer';
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScroll, behavior: 'smooth' });
    });
  }
});