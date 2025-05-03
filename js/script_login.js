function validarLogin() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let mensagem = document.getElementById("mensagem");

    if (username === "" || password === "") {
        mensagem.textContent = "Por favor, preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    if (password === "12345") {
        mensagem.textContent = `Bem-vindo, ${username}!`;
        mensagem.style.color = "green";
    } else {
        mensagem.textContent = "Senha incorreta. Tente novamente.";
        mensagem.style.color = "red";
    }
}