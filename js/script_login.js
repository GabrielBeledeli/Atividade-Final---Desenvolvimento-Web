// Função para validar o login do usuário
function validarLogin() {
    // Obtém o valor do campo de usuário
    let username = document.getElementById("username").value;
    // Obtém o valor do campo de senha
    let password = document.getElementById("password").value;
    // Seleciona o elemento onde as mensagens serão exibidas
    let mensagem = document.getElementById("mensagem");

    // Verifica se algum campo está vazio
    if (username === "" || password === "") {
        mensagem.textContent = "Por favor, preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }

    // Verifica se a senha está correta (senha fixa: 12345)
    if (password === "12345") {
        mensagem.textContent = `Bem-vindo, ${username}!`;
        mensagem.style.color = "green";
    } else {
        // Exibe mensagem de erro se a senha estiver incorreta
        mensagem.textContent = "Senha incorreta. Tente novamente.";
        mensagem.style.color = "red";
    }
}