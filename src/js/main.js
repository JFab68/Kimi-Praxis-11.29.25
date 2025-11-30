document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('header nav ul');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open');
    });
  }

  // Close dropdown menus when tabbing away
  const dropdowns = document.querySelectorAll('.dropdown > a');
  dropdowns.forEach(trigger => {
    const menu = trigger.nextElementSibling;
    if (!menu) return;

    trigger.addEventListener('click', (e) => {
      // Allow click on small screens to toggle dropdown
      if (window.innerWidth < 768) {
        e.preventDefault();
        menu.classList.toggle('is-open');
      }
    });
  });
});
