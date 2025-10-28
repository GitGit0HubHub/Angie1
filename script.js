// Prevent image download and context menu
function preventImageDownload() {
  // Only apply to gallery thumbnails, not lightbox images
  const galleryImages = document.querySelectorAll('.gallery-item img');
  
  galleryImages.forEach(img => {
    // Prevent context menu
    img.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Prevent touch and hold
    img.addEventListener('touchstart', function(e) {
      e.preventDefault();
      return false;
    }, { passive: false });
    
    // Prevent drag start
    img.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
  });
  
  // For lightbox images, we need to allow some interactions
  const lightboxImage = document.getElementById('lightbox-image');
  if (lightboxImage) {
    // Prevent right-click save in lightbox
    lightboxImage.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      return false;
    });
    
    // Prevent drag and drop from lightbox
    lightboxImage.addEventListener('dragstart', function(e) {
      e.preventDefault();
      return false;
    });
  }
}

// Lightbox functionality
document.addEventListener('DOMContentLoaded', function() {
  // Prevent image downloads
  preventImageDownload();
  // Set current year in footer
  try {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  } catch (e) {}

  // Lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const closeButton = document.querySelector('.lightbox-close');
  const prevButton = document.querySelector('.lightbox-button.prev');
  const nextButton = document.querySelector('.lightbox-button.next');
  const galleryItems = document.querySelectorAll('.gallery-item img');
  
  let currentImageIndex = 0;
  const totalImages = galleryItems.length;
  
  // Open lightbox when clicking on a gallery image
  galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImageIndex = index;
      updateLightboxImage();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    });
  });
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
  
  // Update the lightbox image
  function updateLightboxImage() {
    const imgSrc = galleryItems[currentImageIndex].src;
    const imgAlt = galleryItems[currentImageIndex].alt;
    lightboxImage.src = imgSrc;
    lightboxImage.alt = imgAlt;
  }
  
  // Event listeners
  closeButton.addEventListener('click', closeLightbox);
  
  prevButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : totalImages - 1;
    updateLightboxImage();
  });
  
  nextButton.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex < totalImages - 1) ? currentImageIndex + 1 : 0;
    updateLightboxImage();
  });
  
  // Close when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : totalImages - 1;
        updateLightboxImage();
        break;
      case 'ArrowRight':
        currentImageIndex = (currentImageIndex < totalImages - 1) ? currentImageIndex + 1 : 0;
        updateLightboxImage();
        break;
    }
  });
});
