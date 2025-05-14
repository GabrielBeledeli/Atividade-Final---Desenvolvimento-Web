const exibirCarrinho = () => {
  const carrinhoIds = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  const container = document.querySelector(".container-carrinho");

  if (carrinhoIds.length === 0) {
    container.innerHTML = `
      <div id="carrinho-vazio">
        <h2>Seu carrinho está vazio 😢</h2>
        <a href="index_produtos.html" class="btn-voltar">Ver produtos</a>
      </div>
    `;
    return;
  }

  // Container principal
  container.innerHTML = `
    <div class="carrinho-container">
      <div class="carrinho-produtos"></div>
      <div class="carrinho-resumo">
        <div class="campo">
          <label>CEP para entrega:</label>
          <input type="text" placeholder="Digite seu CEP" disabled>
        </div>
        <div class="campo">
          <label>Cupom de desconto:</label>
          <input type="text" placeholder="Digite o cupom" disabled>
        </div>
        <div class="precos">
          <p>Total à vista: R$ <span id="total-vista">0,00</span></p>
          <p>Total a prazo (em até 10X sem Juros): R$ <span id="total-parcelado">0,00</span></p>
        </div>
        <button class="btn-comprar">Finalizar Compra</button>
      </div>
    </div>
  `;

  const containerProdutos = container.querySelector(".carrinho-produtos");
  let total = 0;

  carrinhoIds.forEach(id => {
    const produto = produtos.find(p => p.id === Number(id));
    if (produto) {
      const precoInicial = produto.precoPix; // Preço à vista
      const precoParcelado = produto.precoParcelado; // Preço a prazo
      total += precoInicial;

      const item = document.createElement("div");
      item.classList.add("produto-item");
      item.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="produto-dados" id="produto-${produto.id}">
          <h3>${produto.nome}</h3>
          <div class="quantidade">
            <button class="btn-quantidade menos" data-id="${produto.id}">-</button>
            <span class="numero-quantidade" id="quantidade-${produto.id}">1</span>
            <button class="btn-quantidade mais" data-id="${produto.id}">+</button>
          </div>
          <p class="preco-vista">Preço à vista: R$ <strong>${produto.precoPix.toFixed(2)}</strong></p>
          <p class="preco-prazo">Preço a prazo: R$ <strong>${produto.precoParcelado.toFixed(2)}</strong></p>
          <button class="btn-remover" data-id="${produto.id}">Remover</button>
        </div>
      `;

      containerProdutos.appendChild(item);
    }
  });

  atualizarTotais();

  // Eventos para remover item
  container.querySelectorAll(".btn-remover").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      removerDoCarrinho(id);
    });
  });

  // Eventos para alterar quantidade
  container.querySelectorAll(".btn-quantidade").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const action = e.target.classList.contains("mais") ? "increase" : "decrease";
      alterarQuantidade(id, action);
    });
  });
};

const alterarQuantidade = (idProduto, acao) => {
  let carrinhoIds = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  const produto = produtos.find(p => p.id === idProduto);

  let quantidadeAtual = parseInt(document.getElementById(`quantidade-${idProduto}`).textContent);

  if (acao === "increase") {
    quantidadeAtual++;
  } else if (acao === "decrease" && quantidadeAtual > 1) {
    quantidadeAtual--;
  }

  // Atualiza a quantidade no HTML
  document.getElementById(`quantidade-${idProduto}`).textContent = quantidadeAtual;

  // Atualiza o preço à vista e a prazo com a nova quantidade
  const precoTotal = produto.precoPix * quantidadeAtual;
  const precoParcelado = produto.precoParcelado * quantidadeAtual;

  // Atualiza os preços à vista e parcelado no HTML
  const produtoElement = document.querySelector(`#produto-${idProduto}`);
  produtoElement.querySelector(".preco-vista").innerHTML = `Preço à vista: R$ <strong>${(produto.precoPix * quantidadeAtual).toFixed(2)}</strong>`;
  produtoElement.querySelector(".preco-prazo").innerHTML = `Preço a prazo: R$ <strong>${precoParcelado.toFixed(2)}</strong>`;

  atualizarTotais(); // Atualiza os totais gerais
};

const atualizarTotais = () => {
  let totalFinal = 0;
  let totalParcelado = 0;

  // Calculando o total do carrinho
  document.querySelectorAll(".produto-item").forEach(item => {
    const idProduto = item.querySelector(".btn-quantidade").dataset.id;
    const quantidade = parseInt(document.getElementById(`quantidade-${idProduto}`).textContent);
    const precoUnitario = produtos.find(p => p.id === parseInt(idProduto)).precoPix;
    const precoParcelado = produtos.find(p => p.id === parseInt(idProduto)).precoParcelado;

    const totalItem = precoUnitario * quantidade;
    const totalItemParcelado = precoParcelado * quantidade;

    totalFinal += totalItem;
    totalParcelado += totalItemParcelado;
  });

  // Atualizando os totais gerais
  document.getElementById("total-vista").textContent = totalFinal.toFixed(2);
  document.getElementById("total-parcelado").textContent = totalParcelado.toFixed(2);
};

// Remove item do carrinho
const removerDoCarrinho = (idProduto) => {
  let carrinhoIds = JSON.parse(sessionStorage.getItem("carrinho")) || [];
  carrinhoIds = carrinhoIds.filter(id => id !== idProduto);
  sessionStorage.setItem("carrinho", JSON.stringify(carrinhoIds));
  exibirCarrinho();
};

// Inicializa
exibirCarrinho();
