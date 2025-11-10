document.addEventListener('DOMContentLoaded', () => {
  // Implementamos un menú que se activa en dispositivos móviles.
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
  const counters = document.querySelectorAll('.stat-value[data-target]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          const duration = 1400; // ms
          const start = performance.now();
          const initial = 0;
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(initial + (target - initial) * progress);
            el.textContent = value.toLocaleString();
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          // Para optimizar, dejamos de observar el elemento una vez que la animación ha comenzado.
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => counterObserver.observe(c));
  }
  
    /* Carrusel simple de testimonios: muestra un testimonio a la vez */
    const testimonialsTrack = document.getElementById('testimonials-track');
    if (testimonialsTrack) {
      const slides = Array.from(testimonialsTrack.querySelectorAll('.testimonial'));
      let tIndex = 0;
      function showTestimonial(i) {
        slides.forEach((s, idx) => {
          s.style.display = (idx === i) ? 'block' : 'none';
        });
      }
      showTestimonial(tIndex);
      // auto-advance cada 6s
      setInterval(() => {
        tIndex = (tIndex + 1) % slides.length;
        showTestimonial(tIndex);
      }, 6000);
    }

  
  });