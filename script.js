/* ==============================
   KNIETS — SHOPEE ACHADOS
================================ */

const productGrid = document.getElementById("productGrid");
const featuredCarousel = document.getElementById("featuredCarousel");
const searchInput = document.getElementById("searchInput");

let products = [];

/* ==============================
   FETCH
================================ */

fetch("produtos.json")
  .then(res => res.json())
  .then(data => {
    products = data;

    renderFeatured(products);
    renderProducts(products);
  })
  .catch(() => {
    productGrid.innerHTML = "<p>Erro ao carregar produtos.</p>";
  });

/* ==============================
   DESTAQUES (10 ALEATÓRIOS)
================================ */

function renderFeatured(list){
  if(!featuredCarousel) return;

  const shuffled = [...list].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);

  featuredCarousel.innerHTML = "";

  selected.forEach(product => {
    featuredCarousel.appendChild(createCard(product));
  });
}

/* ==============================
   GRID NORMAL
================================ */

function renderProducts(list){
  productGrid.innerHTML = "";

  if(list.length === 0){
    productGrid.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  list.forEach(product => {
    productGrid.appendChild(createCard(product));
  });
}

/* ==============================
   CARD COMPONENT
================================ */

function createCard(product){
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    ${product.imagem ? `
  <div class="image-wrapper">
    <img src="${product.imagem}" alt="${product.nome}">
  </div>
` : ""}

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
   BUSCA (NÃO AFETA DESTAQUES)
================================ */

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();

  const filtered = products.filter(p =>
    p.nome.toLowerCase().includes(term)
  );

  renderProducts(filtered);
});
