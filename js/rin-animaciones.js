document.addEventListener("DOMContentLoaded", function() {
  const elementosAnimados = document.querySelectorAll('.animacion-scroll');

  if (!elementosAnimados.length) {
    return;
  }

  const observador = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('es-visible');
        observador.unobserve(entrada.target); // Opcional: deja de observar el elemento una vez que es visible
      }
    });
  }, {
    threshold: 0.1 // El elemento se considera visible cuando al menos el 10% está en pantalla
  });

  elementosAnimados.forEach(elemento => {
    observador.observe(elemento);
  });
});