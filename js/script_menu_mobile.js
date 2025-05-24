// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o ícone do menu (hamburger)
    const hamburger = document.getElementById("hamburger");
    // Seleciona o menu mobile
    const mobileMenu = document.getElementById("mobileMenu");

    // Verifica se ambos os elementos existem na página
    if (hamburger && mobileMenu) {
        // Adiciona um evento de clique ao ícone do menu
        hamburger.addEventListener("click", function () {
            // Alterna a classe "show" no menu mobile para exibir ou esconder o menu
            mobileMenu.classList.toggle("show");
        });
    }
});