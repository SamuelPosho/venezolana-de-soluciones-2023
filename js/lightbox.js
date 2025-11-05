document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryLinks = document.querySelectorAll('.rin-gallery-link');

  if (!lightbox || !lightboxImage || !lightboxClose || galleryLinks.length === 0) {
    return;
  }

  galleryLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const imageUrl = link.href;
      lightboxImage.src = imageUrl;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
    });
  });

  const closeLightbox = () => {
    lightbox.style.display = 'none';
    lightboxImage.src = ''; // Limpia la imagen
    document.body.style.overflow = 'auto'; // Restaura el scroll
  };

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    // Cierra si se hace clic fuera de la imagen
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});