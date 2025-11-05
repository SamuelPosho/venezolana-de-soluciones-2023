document.addEventListener("DOMContentLoaded", function() {
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

  if (!elementsToAnimate.length) {
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Opcional: deja de observar el elemento una vez que es visible
      }
    });
  }, {
    threshold: 0.1 // El elemento se considera visible cuando al menos el 10% está en pantalla
  });

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});