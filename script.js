/* ==============================
   KNIETS — SHOPEE ACHADOS
================================ */

document.addEventListener("DOMContentLoaded", () => {

  const productGrid = document.getElementById("productGrid");
  const featuredCarousel = document.getElementById("featuredCarousel");
  const searchInput = document.getElementById("searchInput");

  let products = [];

  /* ==============================
     FETCH
  ============================== */

  fetch("./produtos.json")
    .then(res => res.json())
    .then(data => {
      products = data;

      if (featuredCarousel) renderFeatured(products);
      if (productGrid) {
        renderProducts(products);
        productGrid.style.display = "none"; // carregamento inicial
      }
    })
    .catch(() => {
      if (productGrid) {
        productGrid.innerHTML = "<p>Erro ao carregar produtos.</p>";
      }
    });

  /* ==============================
     DESTAQUES
  ============================== */

  function renderFeatured(list){
    if (!featuredCarousel) return;

    featuredCarousel.innerHTML = "";

    const shuffled = [...list].sort(() => 0.5 - Math.random());
    shuffled.slice(0, 10).forEach(product => {
      featuredCarousel.appendChild(createCard(product));
    });
  }

  /* ==============================
     GRID
  ============================== */

  function renderProducts(list){
    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (list.length === 0) {
      productGrid.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }

    list.forEach(product => {
      productGrid.appendChild(createCard(product));
    });
  }

  /* ==============================
     CARD
  ============================== */

  function createCard(product){
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      ${product.imagem ? `
        <div class="image-wrapper">
          <img src="${product.imagem}" alt="${product.nome}">
        </div>` : ""}

      <h3>${product.nome}</h3>
      ${product.preco ? `<p style="color:#fff;font-weight:bold;">${product.preco}</p>` : ""}
      ${product.descricao ? `<p>${product.descricao}</p>` : ""}
      <a href="${product.link}" class="btn-primary" target="_blank" rel="noopener">
        Ver na Shopee
      </a>
    `;

    return card;
  }

  /* ==============================
     SEARCH
  ============================== */

  if (searchInput) {
  searchInput.addEventListener("input", () => {
    const term = searchInput.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const filtered = products.filter(p => {
      const nome = p.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const desc = p.descricao
        ? p.descricao.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";

      return nome.includes(term) || desc.includes(term);
    });

    if (featuredCarousel) {
      featuredCarousel.style.display = term ? "none" : "flex";
    }

    if (productGrid) {
      productGrid.style.display = term ? "" : "none";
    }

    renderProducts(filtered);
  });
}


