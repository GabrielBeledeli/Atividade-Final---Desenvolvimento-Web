let brandCurrentIndex = 0;
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

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", function () {
      mobileMenu.classList.toggle("show");
  });
});


// nossas marcas carousel
const brandCarousel = document.querySelector('.brand-carousel');
const leftBtn = document.querySelector('.brand-arrow.left');
const rightBtn = document.querySelector('.brand-arrow.right');

const itemWidth = 250 + 30; // Largura da imagem + gap
const visibleItems = 4;
let currentIndex = 0;

// Seleciona os indicadores
const indicators = document.querySelectorAll('.carousel-indicators .indicator');

// Atualiza os indicadores com base no índice atual
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index === Math.floor(brandCurrentIndex / visibleItems)) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

rightBtn.addEventListener('click', () => {
    console.log('Right button clicked');
    const totalItems = brandCarousel.children.length;
    if (brandCurrentIndex < totalItems - visibleItems) {
        brandCurrentIndex += visibleItems; // Avança 4 itens
        if (brandCurrentIndex > totalItems - visibleItems) {
            brandCurrentIndex = totalItems - visibleItems; // Garante que não ultrapasse o limite
        }
        updateCarousel();
    }
});

leftBtn.addEventListener('click', () => {
    console.log('Left button clicked');
    if (brandCurrentIndex > 0) {
        brandCurrentIndex -= visibleItems; // Retrocede 4 itens
        if (brandCurrentIndex < 0) {
            brandCurrentIndex = 0; // Garante que não fique negativo
        }
        updateCarousel();
    }
});

function updateCarousel() {
    const isMobileView = window.innerWidth <= 1024; // Verifica se é mobile/tablet
    const totalItems = brandCarousel.children.length;

    if (isMobileView) {
        // Remove a visibilidade de todas as imagens
        Array.from(brandCarousel.children).forEach((img) => {
            img.classList.remove('visible');
        });

        // Mostra as 4 imagens da "página" atual
        for (let i = brandCurrentIndex; i < brandCurrentIndex + visibleItems; i++) {
            if (brandCarousel.children[i]) {
                brandCarousel.children[i].classList.add('visible');
            }
        }

        // Remove o efeito de transformação no mobile
        brandCarousel.style.transform = 'none';
    } else {
        // Aplica o deslocamento horizontal no desktop
        const offset = -(itemWidth * brandCurrentIndex);
        brandCarousel.style.transform = `translateX(${offset}px)`;
    }

    updateIndicators(); // Atualiza os indicadores em ambos os modos
}

// Atualiza o carrossel ao redimensionar a janela
window.addEventListener('resize', () => {
    updateCarousel();
});

// Inicializa os indicadores e o carrossel no carregamento da página
document.addEventListener('DOMContentLoaded', () => {
    updateIndicators();
    updateCarousel();
});