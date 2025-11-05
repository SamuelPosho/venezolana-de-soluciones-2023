document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImagen = document.getElementById('lightbox-imagen');
  const lightboxCerrar = document.getElementById('lightbox-cerrar');
  const enlacesGaleria = document.querySelectorAll('.enlace-galeria');

  // Si no existen los elementos necesarios, no hacemos nada.
  if (!lightbox || !lightboxImagen || !lightboxCerrar || enlacesGaleria.length === 0) {
    return;
  }

  // Función para abrir el lightbox
  const abrirLightbox = (e) => {
    e.preventDefault();
    const urlImagen = e.currentTarget.href;
    lightboxImagen.src = urlImagen;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
  };

  // Función para cerrar el lightbox
  const cerrarLightbox = () => {
    lightbox.style.display = 'none';
    lightboxImagen.src = ''; // Limpia la imagen para evitar que se vea al reabrir
    document.body.style.overflow = 'auto'; // Restaura el scroll
  };

  // Asignar eventos
  enlacesGaleria.forEach(enlace => {
    enlace.addEventListener('click', abrirLightbox);
  });

  lightboxCerrar.addEventListener('click', cerrarLightbox);

  // Cierra si se hace clic fuera de la imagen (en el fondo oscuro)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      cerrarLightbox();
    }
  });
});