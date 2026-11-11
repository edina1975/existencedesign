const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
const viewer = document.querySelector('#viewer');
const content = document.querySelector('#viewer-content');
const caption = document.querySelector('#viewer-caption');
function openViewer() {
  viewer.showModal();
  document.body.classList.add('modal-open');
}
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  const image = document.createElement('img');
  image.src = button.dataset.image;
  image.alt = button.dataset.caption;
  if (button.dataset.website) {
    const link = document.createElement('a');
    link.href = button.dataset.website;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', `Visit ${button.dataset.caption.replace(' — Webdesign', '')} website (opens in a new tab)`);
    link.append(image);
    content.replaceChildren(link);
  } else {
    content.replaceChildren(image);
  }
  caption.textContent = button.dataset.caption;
  openViewer();
}));
document.querySelectorAll('[data-video]').forEach(button => button.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.src = `https://player.vimeo.com/video/${button.dataset.video}?autoplay=1`;
  frame.title = button.dataset.caption;
  frame.allow = 'autoplay; fullscreen; picture-in-picture';
  frame.allowFullscreen = true;
  content.replaceChildren(frame);
  caption.textContent = button.dataset.caption;
  openViewer();
}));
document.querySelector('.close-dialog').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) { const rect = viewer.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close(); } });
viewer.addEventListener('close', () => { content.replaceChildren(); document.body.classList.remove('modal-open'); });
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navigation.querySelectorAll('a').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-15% 0px -55% 0px' });
  document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
}
document.querySelector('#year').textContent = new Date().getFullYear();
