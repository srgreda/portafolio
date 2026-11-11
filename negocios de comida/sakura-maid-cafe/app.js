/* ==========================================================================
   SAKURA Maid Café — Lógica Interactiva Demo
   ========================================================================== */

const CONFIG = {
  whatsappNumber: "67992051",
  currency: "$",
  storeName: "SAKURA maid cafe",
  addressText: "Av. Principal Sakura #108, esq. Calle Akihabara (Frente a Plaza Sakura)",
  storageKey: "sakura_maid_cafe_cart_v1"
};

/* 5 ejemplos curados del menú de comidas otaku */
const MENU_ITEMS = [
  {
    id: "omurice-sakura",
    name: "Omurice Mágico de Sakura",
    jpName: "桜オムライス • Plato Estrella",
    category: "platos",
    categoryLabel: "🍛 Platos Kawaii",
    badge: "⭐ Más pedido",
    price: 9.5,
    image: "https://i.pinimg.com/1200x/d7/63/fa/d763fa6e5216d8bd7e9deb41bda7f61f.jpg",
    shortDesc:
      "Tortilla esponjosa sobre arroz japonés salteado, decorada en mesa con carita kawaii y hechizo de amor.",
    fullDesc:
      "Nuestro clásico de Akihabara: suave tortilla dorada cubriendo arroz japonés sazonado con vegetales y pollo tierno. Nuestras maids dibujan una carita de gatito o corazón con salsa especial frente a ti.",
    tags: ["Dibujo en mesa ♥", "Recién hecho", "Lectura manga ideal"],
    prepTime: "12 - 15 min"
  },
  {
    id: "ramen-miso",
    name: "Ramen Celestial Miso & Naruto",
    jpName: "特製味噌ラーメン • Reconfortante",
    category: "platos",
    categoryLabel: "🍛 Platos Kawaii",
    badge: "🔥 Calientito",
    price: 11.0,
    image: "https://i.pinimg.com/736x/fd/9f/55/fd9f55d6f2fcb0576a307688209a4633.jpg",
    shortDesc:
      "Caldo cremoso de miso blanco con chashu tierno, huevo marinado ajitama, narutomaki y cebollín.",
    fullDesc:
      "Fideos artesanales servidos en tazón pastel con caldo aromático de miso, láminas de cerdo chashu caramelizado, huevo ajitama de yema cremosa, maíz dulce, alga nori y narutomaki rosado.",
    tags: ["Caldo artesanal", "Huevo Ajitama", "Incluye palillos kawaii"],
    prepTime: "14 - 18 min"
  },
  {
    id: "parfait-celeste",
    name: "Parfait Nube Celeste & Fresa",
    jpName: "空色いちごパフェ • Postre Pastel",
    category: "postres",
    categoryLabel: "🍨 Postres",
    badge: "🎀 Dulce Kawaii",
    price: 7.5,
    image: "https://i.pinimg.com/736x/ef/de/2d/efde2d0101c16b3705a15dae7c3554bd.jpg",
    shortDesc:
      "Capas de crema celeste algodón de azúcar, mousse de fresa, mochi dango y galleta orejitas de conejo.",
    fullDesc:
      "El favorito para tus fotos de Instagram: copa alta con fresas frescas, crema suave color celeste cielo, helado de vainilla, bolitas de mochi pastel y galletita artesanal de conejito.",
    tags: ["Instagrameable 📸", "Fresas frescas", "Mochi suave"],
    prepTime: "8 - 10 min"
  },
  {
    id: "soda-sakura",
    name: "Soda Cremosa Sakura Float",
    jpName: "桜クリームソーダ • Bebida Especial",
    category: "bebidas",
    categoryLabel: "🥤 Bebidas",
    badge: "❄️ Refrescante",
    price: 5.5,
    image: "https://i.pinimg.com/736x/b6/f7/a0/b6f7a081d40b4a66e8dcb9928447ed8c.jpg",
    shortDesc:
      "Soda burbujeante degradada de cerezo sakura y ramune celeste coronada con helado de vainilla.",
    fullDesc:
      "Bebida icónica de café japonés: mezcla chispeante de sirope floral de sakura con soda ramune celeste, borde escarchado con azúcar rosada, bola de helado cremoso y cereza.",
    tags: ["Sin alcohol", "Con helado", "Popote kawaii"],
    prepTime: "5 - 7 min"
  },
  {
    id: "combo-otaku-manga",
    name: "Combo Otaku + Lectura Manga",
    jpName: "オタク・マンガセット • Pack Chill",
    category: "combos",
    categoryLabel: "🍱 Combos Manga",
    badge: "📚 Ideal Manga",
    price: 12.5,
    image: "https://i.pinimg.com/736x/f8/d9/09/f8d90906bf0d0293e13815105ad5ef42.jpg",
    shortDesc:
      "2 onigiris con carita kawaii, taiyaki relleno y sakura latte caliente. Pensado para tu maratón de lectura.",
    fullDesc:
      "Diseñado especialmente para disfrutar en nuestra Zona Manga sin ensuciar tus dedos: bandeja pastel con dos onigiris rellenos, un taiyaki crujiente de crema pastelera, taza de sakura latte y posavasos coleccionable.",
    tags: ["Posavasos regalo", "Fácil de comer leyendo", "Súper completo"],
    prepTime: "10 - 12 min"
  }
];

/* Estantería demo de mangas disponibles en el local */
const MANGA_SHELF = {
  shonen: [
    { title: "Aventuras de Academia Heroica", author: "Estante A-1 • Acción", vols: "Tomos 1 - 18" },
    { title: "Cazadores de Demonios Sakura", author: "Estante A-2 • Aventura", vols: "Tomos 1 - 12" },
    { title: "Grand Line Pirates (Edición Especial)", author: "Estante A-3 • Shōnen", vols: "Tomos 1 - 24" }
  ],
  shojo: [
    { title: "Cazadora de Cartas Mágicas", author: "Estante B-1 • Romance & Magia", vols: "Colección Completa" },
    { title: "Maid-sama en el Café Estelar", author: "Estante B-2 • Comedia Romántica", vols: "Tomos 1 - 15" },
    { title: "Pétalos de Primavera en Kioto", author: "Estante B-3 • Shōjo", vols: "Tomos 1 - 9" }
  ],
  slice: [
    { title: "Cafetería Neko & Té Matcha", author: "Estante C-1 • Relajante", vols: "Tomos 1 - 8" },
    { title: "Club de Repostería Escolar", author: "Estante C-2 • Comida & Amigos", vols: "Tomos 1 - 10" },
    { title: "Diario de un Gato en Tokio", author: "Estante C-3 • Slice of Life", vols: "Tomos 1 - 6" }
  ],
  isekai: [
    { title: "Abrí un Maid Café en Otro Mundo", author: "Estante D-1 • Fantasía", vols: "Tomos 1 - 7" },
    { title: "El Slime Pastelero del Reino", author: "Estante D-2 • Isekai", vols: "Tomos 1 - 11" },
    { title: "Crónicas de la Biblioteca Celestial", author: "Estante D-3 • Magia", vols: "Tomos 1 - 9" }
  ]
};

/* Indicaciones interactivas para el Croquis de Ubicación */
const ROUTE_TIPS = {
  stop: {
    routeId: "routeFromStop",
    text: "<strong>Desde Parada Central:</strong> Camina 2 cuadras hacia el norte por Calle Akihabara hasta cruzar Av. Principal Sakura (2 min a pie)."
  },
  park: {
    routeId: "routeFromPark",
    text: "<strong>Desde Parqueo Público:</strong> Sal por el acceso sur y cruza Av. Principal Sakura directo frente a nuestro toldo pastel (1 min)."
  },
  mall: {
    routeId: "routeFromMall",
    text: "<strong>Desde Galería Geek:</strong> Baja por Pasaje Shibuya 1 cuadra y gira a la derecha en nuestro bloque rosado (2 min a pie)."
  }
};

/* Estado global */
const state = {
  activeCategory: "todos",
  searchQuery: "",
  activeGenre: "shonen",
  cart: loadCart()
};

/* Referencias del DOM */
const els = {
  sakuraLayer: document.getElementById("sakuraLayer"),
  menuGrid: document.getElementById("menuGrid"),
  emptyMenuState: document.getElementById("emptyMenuState"),
  menuSearchInput: document.getElementById("menuSearchInput"),
  resetFiltersBtn: document.getElementById("resetFiltersBtn"),
  filterButtons: document.querySelectorAll(".filter-btn"),

  mangaGenreTabs: document.querySelectorAll(".genre-tab"),
  mangaShelfList: document.getElementById("mangaShelfList"),

  routePills: document.querySelectorAll(".route-pill"),
  mapLandmarks: document.querySelectorAll(".map-landmark"),
  routePaths: document.querySelectorAll(".map-route-path"),
  croquisRouteTip: document.getElementById("croquisRouteTip"),
  copyAddressBtn: document.getElementById("copyAddressBtn"),

  cartDrawer: document.getElementById("cartDrawer"),
  cartBackdrop: document.getElementById("cartBackdrop"),
  openCartBtn: document.getElementById("openCartBtn"),
  floatingCartBtn: document.getElementById("floatingCartBtn"),
  closeCartBtn: document.getElementById("closeCartBtn"),
  cartItemsContainer: document.getElementById("cartItemsContainer"),
  cartFooter: document.getElementById("cartFooter"),
  cartCountBadge: document.getElementById("cartCountBadge"),
  floatingCartCount: document.getElementById("floatingCartCount"),
  cartTotalPrice: document.getElementById("cartTotalPrice"),
  customerNameInput: document.getElementById("customerNameInput"),
  serviceModeSelect: document.getElementById("serviceModeSelect"),
  orderNotesInput: document.getElementById("orderNotesInput"),
  checkoutWhatsappBtn: document.getElementById("checkoutWhatsappBtn"),
  demoConfirmBtn: document.getElementById("demoConfirmBtn"),
  clearCartBtn: document.getElementById("clearCartBtn"),

  itemModalBackdrop: document.getElementById("itemModalBackdrop"),
  itemModalBody: document.getElementById("itemModalBody"),
  closeItemModalBtn: document.getElementById("closeItemModalBtn"),

  demoOrderModalBackdrop: document.getElementById("demoOrderModalBackdrop"),
  demoOrderBody: document.getElementById("demoOrderBody"),
  closeDemoModalBtn: document.getElementById("closeDemoModalBtn"),

  mobileMenuBtn: document.getElementById("mobileMenuBtn"),
  mainNav: document.getElementById("mainNav"),
  toastContainer: document.getElementById("toastContainer")
};

/* ==========================================================================
   Utilidades
   ========================================================================== */
function formatPrice(value) {
  return `${CONFIG.currency}${Number(value).toFixed(2)}`;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  els.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-6px)";
    toast.style.transition = "all 0.25s ease";
    setTimeout(() => toast.remove(), 260);
  }, 2400);
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CONFIG.storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.cart));
  } catch {
    /* Ignorar si storage está bloqueado */
  }
}

/* ==========================================================================
   Pétalos de Sakura decorativos
   ========================================================================== */
function initSakuraPetals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const petalCount = 14;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement("span");
    petal.className = "sakura-petal";
    petal.style.left = `${(i * 7.3 + Math.random() * 4) % 100}%`;
    petal.style.animationDuration = `${8 + Math.random() * 7}s`;
    petal.style.animationDelay = `${-Math.random() * 10}s`;
    const size = 11 + Math.random() * 8;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 0.72}px`;
    els.sakuraLayer.appendChild(petal);
  }
}

/* ==========================================================================
   Renderizado y Filtros del Menú (5 Platillos)
   ========================================================================== */
function getFilteredMenu() {
  const query = state.searchQuery.trim().toLowerCase();

  return MENU_ITEMS.filter((item) => {
    const matchesCategory =
      state.activeCategory === "todos" || item.category === state.activeCategory;
    if (!matchesCategory) return false;

    if (!query) return true;
    const haystack = [
      item.name,
      item.jpName,
      item.shortDesc,
      item.categoryLabel,
      ...item.tags
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

function renderMenu() {
  const items = getFilteredMenu();
  els.menuGrid.innerHTML = "";

  if (items.length === 0) {
    els.emptyMenuState.classList.remove("hidden");
    return;
  }

  els.emptyMenuState.classList.add("hidden");

  items.forEach((item, idx) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    card.style.animationDelay = `${idx * 0.05}s`;

    card.innerHTML = `
      <div class="menu-card-media" data-open-modal="${item.id}" title="Ver detalle de ${escapeHtml(item.name)}">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy" />
        <span class="menu-cat-tag">${item.categoryLabel}</span>
        <span class="menu-special-tag">${item.badge}</span>
      </div>
      <div class="menu-card-body">
        <span class="menu-jp-name">${item.jpName}</span>
        <h3 class="menu-card-title">${escapeHtml(item.name)}</h3>
        <p class="menu-card-desc">${escapeHtml(item.shortDesc)}</p>
        <div class="menu-tags-row">
          ${item.tags.map((tag) => `<span class="mini-tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="menu-card-footer">
          <span class="menu-price">${formatPrice(item.price)}</span>
          <div class="card-btn-group">
            <button type="button" class="btn btn-icon-detail" data-open-modal="${item.id}" aria-label="Ver detalles de ${escapeHtml(item.name)}" title="Ver detalle">
              👁️
            </button>
            <button type="button" class="btn btn-primary btn-add-cart" data-add-cart="${item.id}">
              + Agregar
            </button>
          </div>
        </div>
      </div>
    `;

    els.menuGrid.appendChild(card);
  });
}

function setCategoryFilter(category) {
  state.activeCategory = category;
  els.filterButtons.forEach((btn) => {
    const isActive = btn.dataset.filter === category;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
  renderMenu();
}

/* ==========================================================================
   Modal de Detalle de Platillo
   ========================================================================== */
function openItemModal(itemId) {
  const item = MENU_ITEMS.find((entry) => entry.id === itemId);
  if (!item) return;

  const waItemMsg = `¡Hola SAKURA Maid Café! 🌸 Me gustaría pedir o consultar por: *${item.name}* (${formatPrice(item.price)}).`;

  els.itemModalBody.innerHTML = `
    <div>
      <img src="${item.image}" alt="${escapeHtml(item.name)}" class="modal-food-img" />
    </div>
    <div class="modal-info">
      <span class="pill-badge badge-pink">${item.categoryLabel}</span>
      <h3 id="modalItemTitle">${escapeHtml(item.name)}</h3>
      <span class="menu-jp-name">${item.jpName} • ⏱️ ${item.prepTime}</span>
      <p>${escapeHtml(item.fullDesc)}</p>
      <div class="menu-tags-row">
        ${item.tags.map((tag) => `<span class="mini-tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="modal-price-row">
        <span class="menu-price">${formatPrice(item.price)}</span>
        <button type="button" class="btn btn-primary" id="modalAddBtn" data-id="${item.id}">
          🛍️ Agregar al carrito
        </button>
      </div>
      <div style="margin-top: 0.75rem;">
        <a href="${buildWhatsAppUrl(waItemMsg)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-full">
          💬 Pedir solo este plato por WhatsApp (${CONFIG.whatsappNumber})
        </a>
      </div>
    </div>
  `;

  document.getElementById("modalAddBtn").addEventListener("click", () => {
    addToCart(item.id);
    closeItemModal();
  });

  els.itemModalBackdrop.classList.remove("hidden");
}

function closeItemModal() {
  els.itemModalBackdrop.classList.add("hidden");
}

/* ==========================================================================
   Estantería Interactiva de Mangas
   ========================================================================== */
function renderMangaShelf(genre) {
  state.activeGenre = genre;

  els.mangaGenreTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.genre === genre);
  });

  const list = MANGA_SHELF[genre] || [];
  els.mangaShelfList.innerHTML = list
    .map(
      (manga) => `
      <div class="manga-shelf-item">
        <div>
          <strong>📖 ${escapeHtml(manga.title)}</strong>
          <small>${escapeHtml(manga.author)}</small>
        </div>
        <span class="manga-vol-pill">${escapeHtml(manga.vols)}</span>
      </div>
    `
    )
    .join("");
}

/* ==========================================================================
   Croquis Interactivo de Ubicación
   ========================================================================== */
function selectCroquisRoute(target) {
  const tip = ROUTE_TIPS[target];
  if (!tip) return;

  els.routePaths.forEach((path) => {
    path.classList.toggle("active-route", path.id === tip.routeId);
  });

  els.routePills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.targetRoute === target);
  });

  els.croquisRouteTip.innerHTML = `<span>📍</span><p>${tip.text}</p>`;
}

/* ==========================================================================
   Carrito de Compras + WhatsApp Checkout
   ========================================================================== */
function addToCart(itemId) {
  const item = MENU_ITEMS.find((entry) => entry.id === itemId);
  if (!item) return;

  const existing = state.cart.find((entry) => entry.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id: itemId, qty: 1 });
  }

  saveCart();
  renderCart();
  showToast(`✨ ¡"${item.name}" agregado al carrito!`);
}

function updateCartQty(itemId, delta) {
  const index = state.cart.findIndex((entry) => entry.id === itemId);
  if (index === -1) return;

  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeFromCart(itemId) {
  state.cart = state.cart.filter((entry) => entry.id !== itemId);
  saveCart();
  renderCart();
}

function clearCart() {
  state.cart = [];
  saveCart();
  renderCart();
  showToast("🗑️ Carrito vaciado");
}

function getCartDetails() {
  return state.cart
    .map((entry) => {
      const product = MENU_ITEMS.find((item) => item.id === entry.id);
      if (!product) return null;
      return {
        ...product,
        qty: entry.qty,
        subtotal: product.price * entry.qty
      };
    })
    .filter(Boolean);
}

function renderCart() {
  const details = getCartDetails();
  const totalCount = details.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = details.reduce((sum, item) => sum + item.subtotal, 0);

  els.cartCountBadge.textContent = String(totalCount);
  els.floatingCartCount.textContent = String(totalCount);
  els.cartTotalPrice.textContent = formatPrice(totalAmount);

  if (details.length === 0) {
    els.cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <span>🍰</span>
        <h4>Tu carrito está vacío</h4>
        <p>¡Agrega nuestros deliciosos platos otaku del menú y disfruta leyendo mangas mientras esperas!</p>
      </div>
    `;
    els.cartFooter.classList.add("hidden");
    return;
  }

  els.cartFooter.classList.remove("hidden");
  els.cartItemsContainer.innerHTML = details
    .map(
      (item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" />
        <div>
          <div class="cart-item-top">
            <span class="cart-item-title">${escapeHtml(item.name)}</span>
            <button type="button" class="remove-item-btn" data-remove-item="${item.id}" aria-label="Quitar ${escapeHtml(item.name)}">✕</button>
          </div>
          <div class="cart-item-bottom">
            <div class="qty-stepper">
              <button type="button" class="qty-btn" data-qty-delta="-1" data-item-id="${item.id}" aria-label="Disminuir cantidad">−</button>
              <span class="qty-val">${item.qty}</span>
              <button type="button" class="qty-btn" data-qty-delta="1" data-item-id="${item.id}" aria-label="Aumentar cantidad">+</button>
            </div>
            <span class="cart-item-subtotal">${formatPrice(item.subtotal)}</span>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

function openCart() {
  els.cartDrawer.classList.add("open");
  els.cartBackdrop.classList.remove("hidden");
}

function closeCart() {
  els.cartDrawer.classList.remove("open");
  els.cartBackdrop.classList.add("hidden");
}

function buildOrderMessage() {
  const details = getCartDetails();
  const totalAmount = details.reduce((sum, item) => sum + item.subtotal, 0);
  const customerName = els.customerNameInput.value.trim() || "Cliente Otaku";
  const serviceMode = els.serviceModeSelect.value;
  const notes = els.orderNotesInput.value.trim();

  const lines = [
    `🌸 *NUEVO PEDIDO — ${CONFIG.storeName}* 🌸`,
    `👤 *Cliente:* ${customerName}`,
    `🎀 *Modalidad:* ${serviceMode}`,
    ``,
    `📋 *Detalle del menú:*`,
    ...details.map(
      (item) => `• ${item.qty}x ${item.name} — ${formatPrice(item.subtotal)}`
    ),
    ``,
    `💰 *Total estimado:* ${formatPrice(totalAmount)}`
  ];

  if (notes) {
    lines.push(`📝 *Nota kawaii:* ${notes}`);
  }

  lines.push(``, `¡Gracias! Espero disfrutando un manga en el local 📚✨`);
  return lines.join("\n");
}

function sendCartViaWhatsApp() {
  const details = getCartDetails();
  if (details.length === 0) {
    showToast("🛍️ Agrega al menos 1 producto primero");
    return;
  }

  const url = buildWhatsAppUrl(buildOrderMessage());
  window.open(url, "_blank", "noopener,noreferrer");
}

function openDemoTicketModal() {
  const details = getCartDetails();
  if (details.length === 0) return;

  const totalAmount = details.reduce((sum, item) => sum + item.subtotal, 0);
  const customerName = els.customerNameInput.value.trim() || "Goshujin-sama / Ojou-sama";
  const serviceMode = els.serviceModeSelect.value;
  const notes = els.orderNotesInput.value.trim();
  const orderCode = `#SKR-${Math.floor(100 + Math.random() * 899)}`;
  const waUrl = buildWhatsAppUrl(buildOrderMessage());

  els.demoOrderBody.innerHTML = `
    <div class="demo-ticket-card">
      <h3 id="demoOrderTitle">🌸 ¡Pedido Simulado ${orderCode}!</h3>
      <p style="margin:0 0 0.6rem; color: var(--ink-700); font-size:0.92rem;">
        ¡Gracias, <strong>${escapeHtml(customerName)}</strong>! Mientras nuestras maids preparan tu comida, puedes elegir cualquier manga de la estantería del local. 📚✨
      </p>
      <p style="margin:0; font-size:0.85rem; color: var(--sky-500); font-weight:800;">
        Modalidad: ${escapeHtml(serviceMode)}
      </p>

      <ul class="demo-ticket-lines">
        ${details
          .map(
            (item) => `
          <li>
            <span>${item.qty}x ${escapeHtml(item.name)}</span>
            <span>${formatPrice(item.subtotal)}</span>
          </li>
        `
          )
          .join("")}
      </ul>

      ${notes ? `<p style="font-size:0.85rem; margin:0 0 0.7rem;"><strong>📝 Nota:</strong> ${escapeHtml(notes)}</p>` : ""}

      <div class="cart-summary-row" style="padding:0 0 0.85rem;">
        <span>Total del Ticket:</span>
        <strong>${formatPrice(totalAmount)}</strong>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.55rem;">
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-full">
          💬 También enviarlo al WhatsApp ${CONFIG.whatsappNumber}
        </a>
        <button type="button" class="btn btn-secondary btn-full" id="closeTicketOkBtn">
          ✨ ¡Entendido, a leer manga!
        </button>
      </div>
    </div>
  `;

  document.getElementById("closeTicketOkBtn").addEventListener("click", () => {
    els.demoOrderModalBackdrop.classList.add("hidden");
  });

  closeCart();
  els.demoOrderModalBackdrop.classList.remove("hidden");
}

/* ==========================================================================
   Eventos y Arranque
   ========================================================================== */
function bindEvents() {
  /* Filtros y búsqueda de menú */
  els.filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => setCategoryFilter(btn.dataset.filter));
  });

  els.menuSearchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value;
    renderMenu();
  });

  els.resetFiltersBtn.addEventListener("click", () => {
    state.searchQuery = "";
    els.menuSearchInput.value = "";
    setCategoryFilter("todos");
  });

  /* Delegación de clics en las tarjetas de menú */
  els.menuGrid.addEventListener("click", (event) => {
    const addBtn = event.target.closest("[data-add-cart]");
    if (addBtn) {
      addToCart(addBtn.dataset.addCart);
      return;
    }

    const modalTrigger = event.target.closest("[data-open-modal]");
    if (modalTrigger) {
      openItemModal(modalTrigger.dataset.openModal);
    }
  });

  /* Tabs de género manga */
  els.mangaGenreTabs.forEach((tab) => {
    tab.addEventListener("click", () => renderMangaShelf(tab.dataset.genre));
  });

  /* Croquis de ubicación */
  els.routePills.forEach((pill) => {
    pill.addEventListener("click", () => selectCroquisRoute(pill.dataset.targetRoute));
  });

  els.mapLandmarks.forEach((landmark) => {
    landmark.addEventListener("click", () => selectCroquisRoute(landmark.dataset.landmark));
    landmark.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectCroquisRoute(landmark.dataset.landmark);
      }
    });
  });

  els.copyAddressBtn.addEventListener("click", async () => {
    const copyPayload = `${CONFIG.storeName} — ${CONFIG.addressText} | WhatsApp: ${CONFIG.whatsappNumber}`;
    try {
      await navigator.clipboard.writeText(copyPayload);
      showToast("📋 ¡Dirección y WhatsApp copiados!");
    } catch {
      showToast(`📍 ${CONFIG.addressText} (WA: ${CONFIG.whatsappNumber})`);
    }
  });

  /* Carrito drawer */
  els.openCartBtn.addEventListener("click", openCart);
  els.floatingCartBtn.addEventListener("click", openCart);
  els.closeCartBtn.addEventListener("click", closeCart);
  els.cartBackdrop.addEventListener("click", closeCart);

  els.cartItemsContainer.addEventListener("click", (event) => {
    const qtyBtn = event.target.closest("[data-qty-delta]");
    if (qtyBtn) {
      updateCartQty(qtyBtn.dataset.itemId, Number(qtyBtn.dataset.qtyDelta));
      return;
    }

    const removeBtn = event.target.closest("[data-remove-item]");
    if (removeBtn) {
      removeFromCart(removeBtn.dataset.removeItem);
    }
  });

  els.clearCartBtn.addEventListener("click", clearCart);
  els.checkoutWhatsappBtn.addEventListener("click", sendCartViaWhatsApp);
  els.demoConfirmBtn.addEventListener("click", openDemoTicketModal);

  /* Modales */
  els.closeItemModalBtn.addEventListener("click", closeItemModal);
  els.itemModalBackdrop.addEventListener("click", (event) => {
    if (event.target === els.itemModalBackdrop) closeItemModal();
  });

  els.closeDemoModalBtn.addEventListener("click", () => {
    els.demoOrderModalBackdrop.classList.add("hidden");
  });
  els.demoOrderModalBackdrop.addEventListener("click", (event) => {
    if (event.target === els.demoOrderModalBackdrop) {
      els.demoOrderModalBackdrop.classList.add("hidden");
    }
  });

  /* Menú móvil */
  els.mobileMenuBtn.addEventListener("click", () => {
    const isOpen = els.mainNav.classList.toggle("open");
    els.mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  els.mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      els.mainNav.classList.remove("open");
      els.mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });

  /* Tecla Escape cierra modales y carrito */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeItemModal();
      closeCart();
      els.demoOrderModalBackdrop.classList.add("hidden");
    }
  });
}

function init() {
  initSakuraPetals();
  renderMenu();
  renderMangaShelf(state.activeGenre);
  renderCart();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);
