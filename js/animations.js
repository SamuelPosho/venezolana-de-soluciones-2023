document.addEventListener("DOMContentLoaded", () => {
  // se eligen los elementos que deben ser animados al hacer scroll.
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  if (!elementsToAnimate.length) return;
  // Se utilizo la API IntersectionObserver ya que es una manera muy eficaz para lo que necesitamos
  // la cual es una funcion que ocurre cuando un elemento entra en el area visible.
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Para optimizar el rendimiento dejamos de observar el elemento una vez que ha sido animado.
        observer.unobserve(entry.target);
      }
    });
  }, {
    // aqui se configuró el observador para que se active cuando al menos el 10% del elemento sea visible.
    threshold: 0.1
  });
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});