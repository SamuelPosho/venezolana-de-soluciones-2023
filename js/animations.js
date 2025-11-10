document.addEventListener("DOMContentLoaded", () => {
  // elegimos los elementos que deben ser animados al hacer scroll.
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  if (!elementsToAnimate.length) return;
  // Utilizamos la API IntersectionObserver por su eficiencia. Permite ejecutar
  // una función cuando un elemento entra en el area visible.
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Para optimizar el rendimiento dejamos de observar el elemento una vez que ha sido animado.
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Configuramos el observador para que se active cuando al menos el 10% del elemento sea visible.
    threshold: 0.1
  });
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});