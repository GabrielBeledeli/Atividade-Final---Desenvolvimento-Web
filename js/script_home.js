let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const totalSlides = images.length / 2; // só os originais, os outros são clones

function showNextImage() {
  currentIndex++;

  carousel.style.transition = 'transform 0.6s ease-in-out';
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Quando chega no clone do último slide original
  if (currentIndex === totalSlides) {
    setTimeout(() => {
      carousel.style.transition = 'none'; // remove animação
      carousel.style.transform = `translateX(0%)`; // volta para o início real
      currentIndex = 0;
    }, 600); // espera a transição terminar antes de "teletransportar"
  }
}

function initCarousel() {
  setInterval(showNextImage, 10000);
}

document.addEventListener('DOMContentLoaded', initCarousel);
