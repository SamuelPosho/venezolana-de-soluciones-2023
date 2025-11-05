document.addEventListener('DOMContentLoaded', () => {
  const tocToggle = document.getElementById('rin-toc-toggle');
  const tocList = document.getElementById('rin-toc-list');

  if (tocToggle && tocList) {
    tocToggle.addEventListener('click', () => {
      const isHidden = tocList.style.display === 'none';
      if (isHidden) {
        tocList.style.display = 'block';
        tocToggle.textContent = '[ocultar]';
      } else {
        tocList.style.display = 'none';
        tocToggle.textContent = '[mostrar]';
      }
    });
  }
});
