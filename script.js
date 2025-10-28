// Minimal, optional enhancements
// - Set current year in footer
(function setYear(){
  try {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  } catch (e) {}
})();
