document.addEventListener("DOMContentLoaded", () => {
    const registrarBtn = document.getElementById("registrarBtn");
    registrarBtn.addEventListener("click", validarRegistro);
});

function validarRegistro() {
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let mensagem = "";

    if (!fullname || !email || !password || !confirmPassword) {
        mensagem = "Por favor, preencha todos os campos.";
    } else if (password !== confirmPassword) {
        mensagem = "As senhas não coincidem.";
    } else {
        mensagem = "Registro realizado com sucesso!";
    }

    // Exibir mensagem na interface
    const mensagemDiv = document.getElementById("mensagem");
    mensagemDiv.textContent = mensagem;
    mensagemDiv.style.color = mensagem === "Registro realizado com sucesso!" ? "green" : "red";
}
