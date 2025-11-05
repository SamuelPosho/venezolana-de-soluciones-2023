document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      // Alterna la clase en el body para mostrar/ocultar el menú
      document.body.classList.toggle('nav-open');
            
      // Actualiza el atributo ARIA para accesibilidad
      const isNavOpen = document.body.classList.contains('nav-open');
      menuToggle.setAttribute('aria-expanded', isNavOpen);
    });
    
    // Cierra el menú si se hace clic en un enlace dentro de él (mejora la UX en móvil)
    mainNav.addEventListener('click', function(event) {
      if (event.target.tagName === 'A' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});