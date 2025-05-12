const container = document.querySelector(".produto-grid");

// Limitar para 12 produtos
produtos.slice(1, 13).forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("produto-card");

    card.innerHTML = `
        <div class="produto-img-container">
            <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
            ${produto.selo ? `<span class="produto-selo">${produto.selo}</span>` : ""}
        </div>
        <div class="produto-info">
            <div class="produto-avaliacao">${"★".repeat(produto.avaliacao)}</div>
            <h3 class="produto-nome">${produto.nome}</h3>
            <p class="produto-marca">Marca: ${produto.marca}</p>
            <div class="produto-preco">
                <p class="preco-pix">R$ ${produto.precoPix.toFixed(2)} à vista</p>
                <p class="preco-parcelado">ou em até 10x de R$ ${(produto.precoParcelado / 10).toFixed(2)} sem juros</p>
            </div>
            <a href="index_detalhes_produto.html?id=${produto.id}">
                <button class="produto-botao">Ver detalhes</button>
            </a>
        </div>
    `;

    container.appendChild(card);
});
