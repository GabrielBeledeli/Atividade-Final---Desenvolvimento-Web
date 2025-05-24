// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Seleciona o botão de registro
    const registrarBtn = document.getElementById("registrarBtn");
    // Adiciona um evento de clique ao botão para validar o registro
    registrarBtn.addEventListener("click", validarRegistro);
});

// Função para validar os dados do formulário de registro
function validarRegistro() {
    // Obtém os valores dos campos do formulário
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let mensagem = "";

    // Verifica se algum campo está vazio
    if (!fullname || !email || !password || !confirmPassword) {
        mensagem = "Por favor, preencha todos os campos.";
    } else if (password !== confirmPassword) {
        // Verifica se as senhas coincidem
        mensagem = "As senhas não coincidem.";
    } else {
        // Mensagem de sucesso se tudo estiver correto
        mensagem = "Registro realizado com sucesso!";
    }

    // Exibe a mensagem na interface
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.textContent = mensagem;
    mensagemDiv.style.color = mensagem === "Registro realizado com sucesso!" ? "green" : "red";
}
