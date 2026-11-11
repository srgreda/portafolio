const WHATSAPP_NUMBER = "59167992051";
const STORE_NAME = "el.kumpita.lukas";

const PRODUCTS = [
  {
    id: "ekl-01",
    code: "URB-01",
    name: 'Polera Oversize "Palma Urbana"',
    category: "Poleras",
    color: "Negro",
    paletteText: "Negro / Verde",
    sizes: ["S", "M", "L", "XL"],
    price: 145,
    badge: "TOP VENTAS",
    image: "https://i.pinimg.com/1200x/06/e6/a1/06e6a125fe89a79c861f5d2fc3fbe5be.jpg",
    description:
      "Polera oversize de algodón pesado 240 gsm en negro mate con emblema geométrico de palmera en verde esmeralda.",
    specs: [
      "Algodón peruano peinado 240 gsm",
      "Corte boxy oversize con hombros caídos",
      "Serigrafía de alta densidad con palmera urbana",
      "Cuello rib reforzado anti-deformación",
    ],
  },
  {
    id: "ekl-02",
    code: "URB-02",
    name: 'Polera Boxy "Blanco Asfalto"',
    category: "Poleras",
    color: "Blanco",
    paletteText: "Blanco / Verde",
    sizes: ["S", "M", "L", "XL"],
    price: 135,
    badge: "ESENCIAL",
    image: "https://i.pinimg.com/736x/34/ea/d5/34ead514d3851283cf901c3be7dc7158.jpg",
    description:
      "Corte cuadrado limpio en blanco tiza con bordado frontal minimalista de palmera y detalle urbano en contraste.",
    specs: [
      "Tela jersey 230 gsm suave y respirable",
      "Palmera bordada al pecho en verde y negro",
      "Costuras dobles arquitectónicas en mangas y ruedo",
      "Ideal para layering urbano diario",
    ],
  },
  {
    id: "ekl-03",
    code: "URB-03",
    name: 'Hoodie Heavy "Concreto & Trópico"',
    category: "Hoodies",
    color: "Negro",
    paletteText: "Negro / Blanco / Verde",
    sizes: ["M", "L", "XL"],
    price: 290,
    badge: "NUEVO DROP",
    image: "https://i.pinimg.com/736x/14/16/64/141664d0f2c8cba7ae468e11c0cbab77.jpg",
    description:
      "Polerón canguro heavyweight de frisa gruesa con capucha doble estructurada y gráfica lineal de palmeras.",
    specs: [
      "Frisa algodón-poliéster 380 gsm alto abrigo",
      "Capucha doble sin cordones para look minimal",
      "Gráfica urbana en verde esmeralda + blanco",
      "Puños y pretina de rib pesado",
    ],
  },
  {
    id: "ekl-04",
    code: "URB-04",
    name: 'Pantalón Cargo "Avenida 24"',
    category: "Pantalones",
    color: "Verde",
    paletteText: "Verde / Negro",
    sizes: ["S", "M", "L", "XL"],
    price: 260,
    badge: "URBANISMO",
    image: "https://i.pinimg.com/736x/26/a4/51/26a4516f29db75fad6f88c79d04e8af1.jpg",
    description:
      "Pantalón cargo wide-leg en gabardina verde bosque con 6 bolsillos utilitarios, cintas técnicas negras y ajuste en bota.",
    specs: [
      "Gabardina ripstop resistente al uso urbano",
      "6 bolsillos funcionales con solapas y cierres",
      "Cintas laterales en negro mate con hebilla",
      "Tiro relajado y ajuste regulable en tobillo",
    ],
  },
  {
    id: "ekl-05",
    code: "URB-05",
    name: 'Chaqueta Cortavientos "Distrito Palma"',
    category: "Chaquetas",
    color: "Verde",
    paletteText: "Negro / Verde / Blanco",
    sizes: ["S", "M", "L", "XL"],
    price: 340,
    badge: "EDICIÓN LIMITADA",
    image: "https://i.pinimg.com/736x/c0/e4/a6/c0e4a6e6e9e0e23d4de8b50f41a5c891.jpg",
    description:
      "Cortavientos técnico bicolor en negro y verde esmeralda con vivos blancos, cierre sellado y logo palmera reflectivo.",
    specs: [
      "Nylon técnico repelente al agua y viento",
      "Paneles geométricos inspirados en planos urbanos",
      "Logo palmera en pecho + forro interior respirable",
      "Bolsillos laterales con cremallera",
    ],
  },
];

const CROQUIS_PINS = {
  tienda: {
    title: "Showroom el.kumpita.lukas",
    text: "Ubicado a media cuadra de la Rotonda Principal sobre la Av. Principal del Urbanismo, frente al Parque de las Palmeras.",
    address: "Av. Principal del Urbanismo #104, Zona Central (Croquis editable)",
  },
  parada: {
    title: "1. Rotonda Principal & Parada",
    text: "Punto de referencia principal de transporte público. Desde la rotonda caminas solo 1 minuto hacia el este por Av. Principal.",
    address: "Intersección Av. Principal del Urbanismo & Calle Concreto Norte",
  },
  parque: {
    title: "2. Parque de las Palmeras",
    text: "Referencia verde a pocos pasos de la tienda. Fácil de ubicar por las palmeras altas frente a la acera norte.",
    address: "Acera frente al Parque de las Palmeras, Manzana 02",
  },
  parqueo: {
    title: "3. Galería Urbana / Parqueo",
    text: "Zona cómoda para estacionar si vienes en vehículo o para entregas rápidas en punto de encuentro.",
    address: "Pasaje Tropical esq. Galería Urbana (a 60 metros del local)",
  },
};

const state = {
  filters: {
    search: "",
    category: "todas",
    color: "todos",
    size: "todas",
    sort: "featured",
  },
  selectedSizes: {},
  cart: loadCart(),
  deliveryMethod: "Recojo en tienda",
};

PRODUCTS.forEach((product) => {
  state.selectedSizes[product.id] = product.sizes.includes("M")
    ? "M"
    : product.sizes[0];
});

// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const emptyCatalog = document.getElementById("emptyCatalog");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const emptyResetBtn = document.getElementById("emptyResetBtn");

const cartCountBadge = document.getElementById("cartCountBadge");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartFooter = document.getElementById("cartFooter");
const cartTotalAmount = document.getElementById("cartTotalAmount");
const checkoutWhatsappBtn = document.getElementById("checkoutWhatsappBtn");
const copyOrderBtn = document.getElementById("copyOrderBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const customerNoteInput = document.getElementById("customerNoteInput");

const productModalBackdrop = document.getElementById("productModalBackdrop");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModalBtn");

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

const croquisBoard = document.getElementById("croquisBoard");
const croquisLightBtn = document.getElementById("croquisLightBtn");
const croquisDarkBtn = document.getElementById("croquisDarkBtn");
const pinDetailTitle = document.getElementById("pinDetailTitle");
const pinDetailText = document.getElementById("pinDetailText");
const storeAddressText = document.getElementById("storeAddressText");
const copyAddressBtn = document.getElementById("copyAddressBtn");

const toastContainer = document.getElementById("toastContainer");

function loadCart() {
  try {
    const saved = localStorage.getItem("ekl_cart_v1");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("ekl_cart_v1", JSON.stringify(state.cart));
  } catch {
    // Ignore storage restriction errors
  }
}

function formatBs(value) {
  return `${value.toLocaleString("es-BO")} Bs.`;
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2700);
}

function getFilteredProducts() {
  const q = state.filters.search.trim().toLowerCase();
  const list = PRODUCTS.filter((item) => {
    const matchesCategory =
      state.filters.category === "todas" ||
      item.category === state.filters.category;
    const matchesColor =
      state.filters.color === "todos" || item.color === state.filters.color;
    const matchesSize =
      state.filters.size === "todas" ||
      item.sizes.includes(state.filters.size);
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.paletteText.toLowerCase().includes(q) ||
      item.code.toLowerCase().includes(q);

    return matchesCategory && matchesColor && matchesSize && matchesSearch;
  });

  if (state.filters.sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (state.filters.sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (state.filters.sort === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  return list;
}

function renderProducts() {
  const filtered = getFilteredProducts();
  resultsCount.innerHTML = `Mostrando <strong>${filtered.length}</strong> de ${PRODUCTS.length} prendas`;

  if (filtered.length === 0) {
    productsGrid.innerHTML = "";
    emptyCatalog.hidden = false;
    return;
  }

  emptyCatalog.hidden = true;
  productsGrid.innerHTML = filtered
    .map((product) => {
      const selectedSize = state.selectedSizes[product.id];
      const waProductMsg = `Hola ${STORE_NAME}! Me interesa la prenda *${product.name}* (${product.code}) en talla *${selectedSize}* (${formatBs(product.price)}). ¿Tienen stock disponible?`;

      return `
        <article class="product-card" data-product-id="${product.id}">
          <div class="product-media" data-quick-view="${product.id}">
            <img
              src="${product.image}"
              alt="${product.name}"
              loading="lazy"
            />
            <div class="img-fallback" hidden>
              <span>${product.code} · ${product.name}</span>
            </div>
            <span class="product-badge">${product.badge}</span>
            <span class="product-code">${product.code}</span>
            <button type="button" class="quick-view-pill" data-quick-view="${product.id}">
              Ver detalle
            </button>
          </div>

          <div class="product-body">
            <div class="product-meta-row">
              <span>${product.category.toUpperCase()}</span>
              <span>${product.paletteText}</span>
            </div>

            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.description}</p>

            <div class="size-picker-row">
              <span class="size-picker-label">Talla:</span>
              <div class="size-buttons" role="group" aria-label="Seleccionar talla para ${product.name}">
                ${product.sizes
                  .map(
                    (size) => `
                  <button
                    type="button"
                    class="size-btn ${size === selectedSize ? "selected" : ""}"
                    data-product-size="${product.id}"
                    data-size-value="${size}"
                  >
                    ${size}
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>

            <div class="product-footer">
              <div class="price-row">
                <span class="product-price">${formatBs(product.price)}</span>
                <span class="product-color-label">Color: ${product.color}</span>
              </div>

              <div class="card-actions">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-add-cart="${product.id}"
                >
                  + Al Carrito
                </button>
                <a
                  href="${buildWhatsAppUrl(waProductMsg)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-whatsapp"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function addToCart(productId, customSize = null) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const size = customSize || state.selectedSizes[productId] || product.sizes[0];
  const existing = state.cart.find(
    (entry) => entry.id === productId && entry.size === size
  );

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id: product.id,
      code: product.code,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      qty: 1,
    });
  }

  saveCart();
  renderCart();
  showToast(`Agregado: ${product.name} (Talla ${size})`);
}

function updateCartQty(index, delta) {
  const entry = state.cart[index];
  if (!entry) return;
  entry.qty += delta;
  if (entry.qty <= 0) {
    state.cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveCart();
  renderCart();
}

function getCartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function buildOrderMessage() {
  const lines = [
    `Hola *${STORE_NAME}*! Quiero realizar este pedido desde su catálogo web:`,
    "",
  ];

  state.cart.forEach((item, idx) => {
    lines.push(
      `${idx + 1}. *${item.name}* (${item.code}) — Talla: *${item.size}* × ${item.qty} = *${formatBs(item.price * item.qty)}*`
    );
  });

  lines.push("");
  lines.push(`*Total estimado:* ${formatBs(getCartTotal())}`);
  lines.push(`*Entrega:* ${state.deliveryMethod}`);

  const note = customerNoteInput.value.trim();
  if (note) {
    lines.push(`*Nombre / Zona:* ${note}`);
  }

  lines.push("");
  lines.push("¿Me confirman disponibilidad y formas de pago?");
  return lines.join("\n");
}

function renderCart() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountBadge.textContent = String(totalCount);

  if (state.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <strong>Tu carrito está vacío</strong>
        <p>Explora las 5 prendas del drop urbano y agrega tus favoritas con tu talla ideal.</p>
      </div>
    `;
    cartFooter.style.display = "none";
    return;
  }

  cartFooter.style.display = "block";
  cartTotalAmount.textContent = formatBs(getCartTotal());

  cartItemsContainer.innerHTML = state.cart
    .map(
      (item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <div class="cart-item-top">
            <span class="cart-item-title">${item.name}</span>
            <button type="button" class="cart-remove-btn" data-remove-index="${index}">
              Eliminar
            </button>
          </div>
          <span class="cart-item-meta">${item.code} · Talla ${item.size} · ${formatBs(item.price)} c/u</span>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button type="button" data-qty-index="${index}" data-qty-delta="-1" aria-label="Disminuir cantidad">−</button>
              <span>${item.qty}</span>
              <button type="button" data-qty-index="${index}" data-qty-delta="1" aria-label="Aumentar cantidad">+</button>
            </div>
            <strong class="cart-item-subtotal">${formatBs(item.price * item.qty)}</strong>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function openCart() {
  cartBackdrop.hidden = false;
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartBackdrop.hidden = true;
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
}

function openProductModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;
  const selectedSize = state.selectedSizes[product.id];
  const waMsg = `Hola ${STORE_NAME}! Quiero pedir *${product.name}* (${product.code}) en talla *${selectedSize}*.`;

  modalContent.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="modal-img" />
    <div class="modal-info">
      <span class="section-kicker">${product.code} · ${product.category.toUpperCase()}</span>
      <h3 id="modalTitle">${product.name}</h3>
      <strong class="product-price">${formatBs(product.price)}</strong>
      <p class="product-desc">${product.description}</p>

      <ul class="modal-specs">
        ${product.specs.map((spec) => `<li>${spec}</li>`).join("")}
      </ul>

      <div class="size-picker-row">
        <span class="size-picker-label">Talla seleccionada:</span>
        <div class="size-buttons">
          ${product.sizes
            .map(
              (size) => `
            <button
              type="button"
              class="size-btn ${size === selectedSize ? "selected" : ""}"
              data-modal-size="${product.id}"
              data-size-value="${size}"
            >
              ${size}
            </button>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="card-actions modal-actions">
        <button type="button" class="btn btn-primary" data-modal-add="${product.id}">
          + Agregar al Carrito
        </button>
        <a
          href="${buildWhatsAppUrl(waMsg)}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-whatsapp"
          id="modalWaLink"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </div>
  `;

  productModalBackdrop.hidden = false;
}

function closeProductModal() {
  productModalBackdrop.hidden = true;
}

function resetFilters() {
  state.filters = {
    search: "",
    category: "todas",
    color: "todos",
    size: "todas",
    sort: "featured",
  };

  searchInput.value = "";
  sortSelect.value = "featured";

  document
    .querySelectorAll("#categoryFilters .filter-pill")
    .forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.category === "todas")
    );
  document
    .querySelectorAll("#colorFilters .filter-pill")
    .forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.color === "todos")
    );
  document
    .querySelectorAll("#sizeFilters .filter-pill")
    .forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.size === "todas")
    );

  renderProducts();
}

function selectCroquisPin(pinKey) {
  const info = CROQUIS_PINS[pinKey];
  if (!info) return;

  pinDetailTitle.textContent = info.title;
  pinDetailText.textContent = info.text;
  storeAddressText.textContent = info.address;

  document.querySelectorAll(".map-pin").forEach((pin) => {
    pin.classList.toggle("active-pin", pin.dataset.pin === pinKey);
  });
  document.querySelectorAll(".legend-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.pin === pinKey);
  });
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
  state.filters.search = e.target.value;
  renderProducts();
});

sortSelect.addEventListener("change", (e) => {
  state.filters.sort = e.target.value;
  renderProducts();
});

document.getElementById("categoryFilters").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-category]");
  if (!btn) return;
  state.filters.category = btn.dataset.category;
  document
    .querySelectorAll("#categoryFilters .filter-pill")
    .forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
});

document.getElementById("colorFilters").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-color]");
  if (!btn) return;
  state.filters.color = btn.dataset.color;
  document
    .querySelectorAll("#colorFilters .filter-pill")
    .forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
});

document.getElementById("sizeFilters").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-size]");
  if (!btn) return;
  state.filters.size = btn.dataset.size;
  document
    .querySelectorAll("#sizeFilters .filter-pill")
    .forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
  renderProducts();
});

resetFiltersBtn.addEventListener("click", resetFilters);
emptyResetBtn.addEventListener("click", resetFilters);

productsGrid.addEventListener("click", (e) => {
  const sizeBtn = e.target.closest("[data-product-size]");
  if (sizeBtn) {
    const productId = sizeBtn.dataset.productSize;
    state.selectedSizes[productId] = sizeBtn.dataset.sizeValue;
    renderProducts();
    return;
  }

  const addBtn = e.target.closest("[data-add-cart]");
  if (addBtn) {
    addToCart(addBtn.dataset.addCart);
    return;
  }

  const quickView = e.target.closest("[data-quick-view]");
  if (quickView) {
    openProductModal(quickView.dataset.quickView);
  }
});

modalContent.addEventListener("click", (e) => {
  const sizeBtn = e.target.closest("[data-modal-size]");
  if (sizeBtn) {
    const productId = sizeBtn.dataset.modalSize;
    state.selectedSizes[productId] = sizeBtn.dataset.sizeValue;
    renderProducts();
    openProductModal(productId);
    return;
  }

  const addBtn = e.target.closest("[data-modal-add]");
  if (addBtn) {
    addToCart(addBtn.dataset.modalAdd);
    closeProductModal();
    openCart();
  }
});

closeModalBtn.addEventListener("click", closeProductModal);
productModalBackdrop.addEventListener("click", (e) => {
  if (e.target === productModalBackdrop) {
    closeProductModal();
  }
});

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

cartItemsContainer.addEventListener("click", (e) => {
  const qtyBtn = e.target.closest("[data-qty-index]");
  if (qtyBtn) {
    updateCartQty(
      Number(qtyBtn.dataset.qtyIndex),
      Number(qtyBtn.dataset.qtyDelta)
    );
    return;
  }

  const removeBtn = e.target.closest("[data-remove-index]");
  if (removeBtn) {
    removeCartItem(Number(removeBtn.dataset.removeIndex));
  }
});

document.querySelector(".delivery-toggle").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-delivery]");
  if (!btn) return;
  state.deliveryMethod = btn.dataset.delivery;
  document
    .querySelectorAll(".delivery-btn")
    .forEach((el) => el.classList.remove("active"));
  btn.classList.add("active");
});

checkoutWhatsappBtn.addEventListener("click", () => {
  if (state.cart.length === 0) return;
  const url = buildWhatsAppUrl(buildOrderMessage());
  window.open(url, "_blank", "noopener,noreferrer");
});

copyOrderBtn.addEventListener("click", async () => {
  if (state.cart.length === 0) return;
  try {
    await navigator.clipboard.writeText(buildOrderMessage());
    showToast("Resumen del pedido copiado");
  } catch {
    showToast("No se pudo copiar automáticamente");
  }
});

clearCartBtn.addEventListener("click", () => {
  state.cart = [];
  saveCart();
  renderCart();
  showToast("Carrito vaciado");
});

// Croquis interactions
document.querySelectorAll(".map-pin, .legend-chip").forEach((el) => {
  el.addEventListener("click", () => selectCroquisPin(el.dataset.pin));
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectCroquisPin(el.dataset.pin);
    }
  });
});

croquisLightBtn.addEventListener("click", () => {
  croquisBoard.classList.remove("night-mode");
  croquisLightBtn.classList.add("active");
  croquisDarkBtn.classList.remove("active");
});

croquisDarkBtn.addEventListener("click", () => {
  croquisBoard.classList.add("night-mode");
  croquisDarkBtn.classList.add("active");
  croquisLightBtn.classList.remove("active");
});

copyAddressBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(storeAddressText.textContent);
    showToast("Referencia del croquis copiada");
  } catch {
    showToast("Copia manual: " + storeAddressText.textContent);
  }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  const isHidden = mobileNav.hidden;
  mobileNav.hidden = !isHidden;
  mobileMenuBtn.setAttribute("aria-expanded", String(isHidden));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.hidden = true;
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    closeProductModal();
  }
});

// Image error fallback without inline attributes
document.addEventListener(
  "error",
  (e) => {
    const img = e.target;
    if (img && img.tagName === "IMG") {
      img.hidden = true;
      const fallback = img.nextElementSibling;
      if (fallback && fallback.classList.contains("img-fallback")) {
        fallback.hidden = false;
      }
    }
  },
  true
);

// Initial render
renderProducts();
renderCart();
