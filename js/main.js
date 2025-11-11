document.addEventListener('DOMContentLoaded', () => {
  // Implementamos un menu que se activa en dispositivos móviles.
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    // Al hacer clic en el botón, se va cambiando una clase para mostrar y ocultar el menú.
    menuToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('nav-open');
      // Actualizamos el atributo aria-expanded para mejorar el acceso
      const isNavOpen = document.documentElement.classList.contains('nav-open');
      menuToggle.setAttribute('aria-expanded', isNavOpen);
    });
    mainNav.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' && document.documentElement.classList.contains('nav-open')) {
        document.documentElement.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Lógica para expandir/contraer tarjetas de características al hacer clic
  const featureCards = document.querySelectorAll('.caracteristicas .caracteristica-card');

  featureCards.forEach(card => {
    card.addEventListener('click', (event) => {
      // Evita que el clic dentro de la descripción cierre la tarjeta
      if (event.target.closest('.caracteristica-card-description')) {
        return;
      }
      const isCurrentlyExpanded = card.classList.contains('is-expanded');

      // Cierra todas las tarjetas antes de abrir la seleccionada
      featureCards.forEach(c => c.classList.remove('is-expanded'));

      // Si la tarjeta clicada no estaba expandida, la expande
      if (!isCurrentlyExpanded) {
        card.classList.add('is-expanded');
      }
    });
  });
  });