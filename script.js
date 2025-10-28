// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  try {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  } catch (e) {}

  // Initialize slider if it exists
  const sliderTrack = document.querySelector('.slider-track');
  if (!sliderTrack) return;

  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.slider-button.prev');
  const nextButton = document.querySelector('.slider-button.next');
  let currentIndex = 0;
  const totalSlides = slides.length;

  // Set initial position
  updateSlider();

  // Previous button click handler
  prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
    updateSlider();
  });

  // Next button click handler
  nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
    updateSlider();
  });

  // Update slider position
  function updateSlider() {
    const slideWidth = 100; // Each slide takes 100% of container width
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
  }
});
