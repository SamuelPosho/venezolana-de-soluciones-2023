document.addEventListener("DOMContentLoaded", function() {
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    // Mostrar el botón cuando el usuario baja 300px
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("is-visible");
      } else {
        backToTopButton.classList.remove("is-visible");
      }
    });

    // Scroll suave al hacer clic
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});