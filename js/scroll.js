document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      // El botón se hace visible cuando el usuario ha bajado más de 300 píxeles.
      if (window.scrollY > 300) {
        backToTopButton.classList.add("is-visible");
      } else {
        backToTopButton.classList.remove("is-visible");
      }
    });
    // Añadimos la funcion de scroll suave al hacer clic en el botón.
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault(); // se evita el comportamiento por defecto del enlace.
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});