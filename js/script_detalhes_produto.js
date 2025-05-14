window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    const main = document.querySelector("main");
    main.innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  // Preencher os dados nos elementos existentes no HTML
  document.getElementById("detalhe-imagem").src = produto.imagem;
  document.getElementById("detalhe-imagem").alt = produto.nome;

  document.getElementById("logo-marca").src = produto.logoMarca;
  document.getElementById("logo-marca").alt = `Logo ${produto.marca}`;

  document.getElementById("detalhe-nome").textContent = produto.nome;

  document.getElementById("preco-a-vista").textContent = `R$ ${produto.precoPix.toFixed(2)} à vista no Pix`;
  document.getElementById("preco-parcelado").textContent = `ou em até 10x de R$ ${(produto.precoParcelado / 10).toFixed(2)} sem juros`;

  document.getElementById("selo-inmetro").src = produto.selo_inmetro;

  // Preencher lista técnica
  const listaTecnica = document.getElementById("lista-tecnica");
  listaTecnica.innerHTML = `
    <li><strong>Marca:</strong> ${produto.marca}</li>
    <li><strong>Modelo:</strong> ${produto.modelo}</li>
    <li><strong>Medida:</strong> ${produto.medida}</li>
    <li><strong>Largura:</strong> ${produto.largura}</li>
    <li><strong>Perfil:</strong> ${produto.perfil}</li>
    <li><strong>Aro:</strong> ${produto.aro}</li>
    <li><strong>Diâmetro total:</strong> ${produto.diametro_total}</li>
    <li><strong>Índice de peso:</strong> ${produto.indice_peso}</li>
    <li><strong>Índice de velocidade:</strong> ${produto.indice_velocidade}</li>
    <li><strong>Tipo de construção:</strong> ${produto.tipo_construcao}</li>
    <li><strong>Tipo de terreno:</strong> ${produto.tipo_terreno}</li>
    <li><strong>Desenho:</strong> ${produto.desenho}</li>
    <li><strong>Tração:</strong> ${produto.tracao}</li>
    <li><strong>Temperatura:</strong> ${produto.temperatura}</li>
    <li><strong>Registro Inmetro:</strong> ${produto.registro_inmetro}</li>
    <li><strong>Garantia:</strong> ${produto.garantia}</li>
  `;
};

// Obtém o ID do produto da URL
const urlParams = new URLSearchParams(window.location.search);
const idProduto = parseInt(urlParams.get("id"));

// Encontra o produto no array com base no ID
const produto = produtos.find(p => p.id === idProduto);

// Verifica se o produto existe e adiciona o evento ao botão
if (produto) {
  const botao = document.querySelector(".btn-carrinho");

  botao.addEventListener("click", () => {
    let carrinho = JSON.parse(sessionStorage.getItem("carrinho")) || [];

    // Adiciona apenas se o produto ainda não estiver no carrinho
    if (!carrinho.includes(produto.id)) {
      carrinho.push(produto.id);
      sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
    } else {
      alert("Este produto já está no carrinho!");
    }

    // Redireciona para o carrinho
    window.location.href = "index_carrinho.html";
  });
}
