/* ==========================================================================
   CONFIGURACIÓN PRINCIPAL DE LA TIENDA
   (¡Puedes modificar estos valores fácilmente para tu cliente!)
   ========================================================================== */
const STORE_CONFIG = {
  storeName: "Verde Botánica Boutique",
  // Cambia este número por el de tu cliente (incluye código de país sin el signo +, ej: 54911xxxxxxxx para Argentina, 57300xxxxxxx para Colombia, 521xxxxxxxxxx para México)
  whatsappNumber: "5491123456789",
  currencySymbol: "$",
  defaultPhoneFormatted: "+54 9 11 2345-6789"
};

/* ==========================================================================
   CATÁLOGO BASE: 5 PRODUCTOS MODELO
   ========================================================================== */
const PRODUCTS = [
  {
    id: 1,
    name: "Vestido Midi Lino Esmeralda",
    category: "Vestidos",
    price: 42000,
    originalPrice: 52000,
    badge: "20% OFF",
    badgeType: "sale",
    colorName: "Verde Esmeralda",
    colorHex: "#155240",
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    image: "https://i.pinimg.com/736x/7a/91/b6/7a91b6015aa26768dafd059998393fb8.jpg",
    description: "Vestido midi confeccionado en 100% lino orgánico con corte fluido, escote en V y cinturón ajustable en el mismo tejido. Fresco, transpirable y versátil para el día o la noche.",
    features: [
      "100% lino orgánico de tacto suave",
      "Teñido botánico ecológico libre de tóxicos",
      "Largo midi con abertura lateral sutil",
      "Lavado en ciclo delicado o a mano"
    ]
  },
  {
    id: 2,
    name: "Camisa Oversize Algodón Salvia",
    category: "Camisas & Tops",
    price: 32000,
    originalPrice: null,
    badge: "Nuevo",
    badgeType: "new",
    colorName: "Verde Salvia",
    colorHex: "#628b73",
    sizes: ["XS", "S", "M", "L"],
    defaultSize: "S",
    image: "https://i.pinimg.com/736x/4e/88/39/4e8839ee2539f8f9fab92eca5d84ba5b.jpg",
    description: "Camisa holgada de corte oversize en popelina de algodón premium. Cuenta con botones de nácar natural y bolsillo frontal en pecho. Una pieza esencial de fondo de armario.",
    features: [
      "Algodón pima 100% de alta densidad",
      "Corte relajado unisex adaptable",
      "Botones naturales sostenibles",
      "Fácil de planchar y alta durabilidad"
    ]
  },
  {
    id: 3,
    name: "Pantalón Wide Leg Verde Oliva",
    category: "Pantalones",
    price: 39000,
    originalPrice: null,
    badge: "Más Vendido",
    badgeType: "hot",
    colorName: "Verde Oliva",
    colorHex: "#4b5d43",
    sizes: ["36", "38", "40", "42"],
    defaultSize: "38",
    image: "https://i.pinimg.com/736x/13/08/f0/1308f0deff4d2e764e5e7239e095066e.jpg",
    description: "Pantalón de tiro alto con pernera ancha fluida y pinzas delanteras. Estiliza la figura y brinda máxima comodidad para jornadas de oficina o salidas de fin de semana.",
    features: [
      "Mezcla de tencel y viscosa de caída pesada",
      "Cintura estructurada con trabillas para cinturón",
      "Bolsillos laterales profundos y funcionales",
      "No se arruga fácilmente con el uso diario"
    ]
  },
  {
    id: 4,
    name: "Blazer Tailored Forest Green",
    category: "Abrigos",
    price: 68000,
    originalPrice: 79000,
    badge: "Exclusivo",
    badgeType: "new",
    colorName: "Verde Bosque Profundo",
    colorHex: "#0e3b2e",
    sizes: ["S", "M", "L"],
    defaultSize: "M",
    image: "https://i.pinimg.com/736x/61/4d/01/614d01e27dd7c066e9e2521fe5acb2e3.jpg",
    description: "Saco blazer con sastrería impecable en un tono verde bosque profundo. Solapa clásica, hombreras sutiles y forro interior satinado al tono.",
    features: [
      "Estructura semi-entallada de diseño atemporal",
      "Forro interior 100% transpirable",
      "Bolsillos de ojal y cierre frontal con dos botones",
      "Limpieza en seco recomendada"
    ]
  },
  {
    id: 5,
    name: "Bolso Tote Bag Cuero Musgo",
    category: "Accesorios",
    price: 26000,
    originalPrice: null,
    badge: "Boutique",
    badgeType: "hot",
    colorName: "Verde Musgo",
    colorHex: "#394d3f",
    sizes: ["Única"],
    defaultSize: "Única",
    image: "https://i.pinimg.com/1200x/ed/d1/21/edd121b3614df755f209f33919d48835.jpg",
    description: "Bolso tote de silueta limpia y elegante elaborado en eco-cuero vegetal curtido responsablemente. Espacioso, con compartimento acolchado para tablet o cuaderno y broche magnético.",
    features: [
      "Eco-cuero premium de tacto granulado suave",
      "Asas dobles reforzadas para hombro o mano",
      "Bolsillo interior con cremallera para llaves y móvil",
      "Dimensiones: 38 cm x 30 cm x 12 cm"
    ]
  }
];

/* ==========================================================================
   ESTADO DE LA APLICACIÓN
   ========================================================================== */
let appState = {
  products: [...PRODUCTS],
  selectedCategory: "all",
  searchQuery: "",
  sortBy: "default",
  selectedSizes: {}, // { [productId]: "M" }
  cart: [] // [ { id, product, size, quantity } ]
};

// Inicializar tallas por defecto
PRODUCTS.forEach(p => {
  appState.selectedSizes[p.id] = p.defaultSize;
});

/* ==========================================================================
   ELEMENTOS DEL DOM
   ========================================================================== */
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const sortSelect = document.getElementById("sortSelect");
const filterChips = document.querySelectorAll(".filter-chip");
const noResultsMessage = document.getElementById("noResultsMessage");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");

// Elementos de WhatsApp y Header
const headerWaLink = document.getElementById("headerWaLink");
const heroWaBtn = document.getElementById("heroWaBtn");
const consultantWaBtn = document.getElementById("consultantWaBtn");
const footerWaIcon = document.getElementById("footerWaIcon");
const floatingWaBtn = document.getElementById("floatingWaBtn");
const displayPhone = document.getElementById("displayPhone");

// Elementos de Carrito y Drawer
const cartBtn = document.getElementById("cartBtn");
const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const cartItemsList = document.getElementById("cartItemsList");
const cartTotalDisplay = document.getElementById("cartTotalDisplay");
const cartCountBadge = document.getElementById("cartCountBadge");
const drawerItemsCount = document.getElementById("drawerItemsCount");
const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsAppBtn");

// Elementos de Modal Quick View
const quickViewModal = document.getElementById("quickViewModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalProductDetails = document.getElementById("modalProductDetails");

// Toast
const toastNotification = document.getElementById("toastNotification");
const toastMessage = document.getElementById("toastMessage");

/* ==========================================================================
   UTILIDADES & FORMATEO
   ========================================================================== */
function formatMoney(amount) {
  return STORE_CONFIG.currencySymbol + amount.toLocaleString("es-AR");
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function showToast(msg) {
  toastMessage.textContent = msg;
  toastNotification.classList.remove("hidden");
  setTimeout(() => {
    toastNotification.classList.add("hidden");
  }, 2800);
}

/* ==========================================================================
   CONFIGURAR ENLACES DIRECTOS DE WHATSAPP
   ========================================================================== */
function setupGlobalWhatsAppLinks() {
  const generalGreeting = `¡Hola ${STORE_CONFIG.storeName}! Vengo de su página web y me gustaría recibir asesoría del catálogo.`;
  const url = buildWhatsAppUrl(generalGreeting);

  if (headerWaLink) headerWaLink.href = url;
  if (heroWaBtn) heroWaBtn.href = url;
  if (consultantWaBtn) consultantWaBtn.href = url;
  if (footerWaIcon) footerWaIcon.href = url;
  if (floatingWaBtn) floatingWaBtn.href = url;
  if (displayPhone) displayPhone.textContent = STORE_CONFIG.defaultPhoneFormatted;
}

/* ==========================================================================
   RENDERIZADO DE PRODUCTOS
   ========================================================================== */
function filterAndSortProducts() {
  let list = PRODUCTS.filter(prod => {
    // Filtro por categoría
    const matchesCategory = (appState.selectedCategory === "all") || (prod.category === appState.selectedCategory);

    // Filtro por texto de búsqueda
    const query = appState.searchQuery.trim().toLowerCase();
    const matchesSearch = query === "" ||
      prod.name.toLowerCase().includes(query) ||
      prod.category.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // Ordenamiento
  if (appState.sortBy === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (appState.sortBy === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (appState.sortBy === "name-asc") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

function renderProducts() {
  const filtered = filterAndSortProducts();

  if (filtered.length === 0) {
    productsGrid.innerHTML = "";
    noResultsMessage.classList.remove("hidden");
    return;
  }

  noResultsMessage.classList.add("hidden");

  productsGrid.innerHTML = filtered.map(prod => {
    const currentSize = appState.selectedSizes[prod.id] || prod.defaultSize;

    // Mensaje para compra directa en WhatsApp
    const waMessage = `¡Hola ${STORE_CONFIG.storeName}! Quiero pedir la siguiente prenda:
• Prenda: ${prod.name}
• Categoría: ${prod.category}
• Talla elegida: ${currentSize}
• Precio: ${formatMoney(prod.price)}
¿Tienen disponibilidad para coordinar el envío?`;

    const waLink = buildWhatsAppUrl(waMessage);

    return `
      <article class="product-card" data-id="${prod.id}">
        <div class="product-image-wrap">
          ${prod.badge ? `<span class="badge-tag ${prod.badgeType}">${prod.badge}</span>` : ""}
          <img src="${prod.image}" alt="${prod.name}" loading="lazy">
          <button class="quick-view-overlay-btn" onclick="openQuickView(${prod.id})">
            <i class="fa-regular fa-eye"></i> Vista Rápida
          </button>
        </div>

        <div class="product-info">
          <div class="product-meta">
            <span class="product-category">${prod.category}</span>
            <span class="product-color-dot" style="background-color: ${prod.colorHex};" title="${prod.colorName}"></span>
          </div>

          <h3 class="product-title">${prod.name}</h3>

          <div class="product-price-box">
            <span class="product-price">${formatMoney(prod.price)}</span>
            ${prod.originalPrice ? `<span class="product-price-old">${formatMoney(prod.originalPrice)}</span>` : ""}
          </div>

          <!-- Selector de tallas -->
          <div class="size-selector-label">Selecciona tu talla:</div>
          <div class="size-selector-pills">
            ${prod.sizes.map(size => `
              <button 
                type="button" 
                class="size-pill ${size === currentSize ? 'selected' : ''}" 
                onclick="changeProductSize(${prod.id}, '${size}')"
              >
                ${size}
              </button>
            `).join("")}
          </div>

          <!-- Botones de Acción -->
          <div class="card-actions">
            <a href="${waLink}" target="_blank" class="btn-card-wa" id="wa-btn-${prod.id}">
              <i class="fa-brands fa-whatsapp"></i> Pedir por WhatsApp
            </a>
            <button type="button" class="btn-card-cart" onclick="addToCart(${prod.id})">
              <i class="fa-solid fa-bag-shopping"></i> Añadir a la Bolsa
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

/* ==========================================================================
   CAMBIO DE TALLA EN TARJETA
   ========================================================================== */
window.changeProductSize = function (productId, newSize) {
  appState.selectedSizes[productId] = newSize;
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  // Actualizar visualmente los botones de talla de esta tarjeta
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    const pills = card.querySelectorAll(".size-pill");
    pills.forEach(pill => {
      pill.classList.toggle("selected", pill.textContent.trim() === newSize);
    });

    // Actualizar el enlace del botón de WhatsApp de esta tarjeta
    const waBtn = card.querySelector(`#wa-btn-${productId}`);
    if (waBtn) {
      const waMessage = `¡Hola ${STORE_CONFIG.storeName}! Quiero pedir la siguiente prenda:
• Prenda: ${prod.name}
• Categoría: ${prod.category}
• Talla elegida: ${newSize}
• Precio: ${formatMoney(prod.price)}
¿Tienen disponibilidad para coordinar el envío?`;
      waBtn.href = buildWhatsAppUrl(waMessage);
    }
  }
};

/* ==========================================================================
   LÓGICA DEL CARRITO DE COMPRAS & CHECKOUT WHATSAPP
   ========================================================================== */
window.addToCart = function (productId, customSize = null) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const size = customSize || appState.selectedSizes[productId] || prod.defaultSize;

  // Buscar si ya está en el carrito con la misma talla
  const existingItem = appState.cart.find(item => item.id === productId && item.size === size);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appState.cart.push({
      id: productId,
      product: prod,
      size: size,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`¡"${prod.name}" (Talla ${size}) agregada a la bolsa!`);
};

window.changeCartQuantity = function (index, delta) {
  if (!appState.cart[index]) return;

  appState.cart[index].quantity += delta;
  if (appState.cart[index].quantity <= 0) {
    appState.cart.splice(index, 1);
  }

  updateCartUI();
};

window.removeFromCart = function (index) {
  appState.cart.splice(index, 1);
  updateCartUI();
};

function updateCartUI() {
  const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = appState.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  cartCountBadge.textContent = totalItems;
  drawerItemsCount.textContent = totalItems;
  cartTotalDisplay.textContent = formatMoney(totalPrice);

  if (appState.cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p><strong>Tu bolsa está vacía</strong></p>
        <p style="font-size: 0.85rem; margin-top: 6px;">Agrega tus prendas favoritas del catálogo para hacer tu pedido completo por WhatsApp.</p>
      </div>
    `;
    checkoutWhatsAppBtn.disabled = true;
    checkoutWhatsAppBtn.style.opacity = "0.5";
    checkoutWhatsAppBtn.style.cursor = "not-allowed";
  } else {
    checkoutWhatsAppBtn.disabled = false;
    checkoutWhatsAppBtn.style.opacity = "1";
    checkoutWhatsAppBtn.style.cursor = "pointer";

    cartItemsList.innerHTML = appState.cart.map((item, index) => `
      <div class="cart-item">
        <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.product.name}</h4>
          <div class="cart-item-meta">Talla: <strong>${item.size}</strong> • ${item.product.colorName}</div>
          <div class="cart-item-price">${formatMoney(item.product.price * item.quantity)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeCartQuantity(${index}, -1)" title="Reducir">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" onclick="changeCartQuantity(${index}, 1)" title="Aumentar">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart(${index})" title="Eliminar del pedido">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join("");
  }
}

// Botón de Enviar Pedido Completo por WhatsApp
if (checkoutWhatsAppBtn) {
  checkoutWhatsAppBtn.addEventListener("click", () => {
    if (appState.cart.length === 0) return;

    const totalPrice = appState.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    let message = `¡Hola ${STORE_CONFIG.storeName}! Quiero confirmar mi pedido desde la tienda web:\n\n`;
    message += `📋 *RESUMEN DEL PEDIDO:*\n`;
    message += `------------------------------------\n`;

    appState.cart.forEach((item, i) => {
      message += `${i + 1}. *${item.product.name}*\n`;
      message += `   • Talla: ${item.size}\n`;
      message += `   • Cantidad: ${item.quantity}\n`;
      message += `   • Subtotal: ${formatMoney(item.product.price * item.quantity)}\n\n`;
    });

    message += `------------------------------------\n`;
    message += `💰 *TOTAL ESTIMADO: ${formatMoney(totalPrice)}*\n\n`;
    message += `¿Me podrían indicar los medios de pago disponibles y el costo de envío a mi domicilio? ¡Muchas gracias!`;

    window.open(buildWhatsAppUrl(message), "_blank");
  });
}

// Control del Drawer del Carrito
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    cartDrawerOverlay.classList.remove("hidden");
  });
}

if (closeDrawerBtn) {
  closeDrawerBtn.addEventListener("click", () => {
    cartDrawerOverlay.classList.add("hidden");
  });
}

if (cartDrawerOverlay) {
  cartDrawerOverlay.addEventListener("click", (e) => {
    if (e.target === cartDrawerOverlay) {
      cartDrawerOverlay.classList.add("hidden");
    }
  });
}

/* ==========================================================================
   MODAL DE VISTA RÁPIDA (QUICK VIEW)
   ========================================================================== */
window.openQuickView = function (productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const currentSize = appState.selectedSizes[productId] || prod.defaultSize;

  const waMessage = `¡Hola ${STORE_CONFIG.storeName}! Me interesa consultar por el producto:
• Prenda: ${prod.name}
• Talla: ${currentSize}
• Precio: ${formatMoney(prod.price)}
¿Está disponible en stock?`;

  const waLink = buildWhatsAppUrl(waMessage);

  modalProductDetails.innerHTML = `
    <div class="modal-grid">
      <div class="modal-image-col">
        <img src="${prod.image}" alt="${prod.name}">
      </div>

      <div class="modal-info-col">
        ${prod.badge ? `<span class="badge-tag ${prod.badgeType}">${prod.badge}</span>` : ""}
        <span class="modal-category">${prod.category}</span>
        <h2 class="modal-title">${prod.name}</h2>

        <div class="modal-price-box">
          <span class="product-price">${formatMoney(prod.price)}</span>
          ${prod.originalPrice ? `<span class="product-price-old">${formatMoney(prod.originalPrice)}</span>` : ""}
        </div>

        <p class="modal-desc">${prod.description}</p>

        <div class="size-selector-label">Tallas disponibles:</div>
        <div class="size-selector-pills" id="modalSizePills">
          ${prod.sizes.map(size => `
            <button 
              type="button" 
              class="size-pill ${size === currentSize ? 'selected' : ''}" 
              onclick="selectModalSize(${prod.id}, '${size}')"
            >
              ${size}
            </button>
          `).join("")}
        </div>

        <ul class="modal-features">
          ${prod.features.map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join("")}
        </ul>

        <div class="card-actions">
          <a href="${waLink}" target="_blank" class="btn-card-wa" id="modalWaBtn">
            <i class="fa-brands fa-whatsapp"></i> Consultar / Pedir por WhatsApp
          </a>
          <button type="button" class="btn-card-cart" onclick="addToCart(${prod.id}, appState.selectedSizes[${prod.id}]); closeQuickView();">
            <i class="fa-solid fa-bag-shopping"></i> Añadir a la Bolsa y Continuar
          </button>
        </div>
      </div>
    </div>
  `;

  quickViewModal.classList.remove("hidden");
};

window.selectModalSize = function (productId, size) {
  changeProductSize(productId, size);

  // Actualizar píldoras del modal
  const pills = document.querySelectorAll("#modalSizePills .size-pill");
  pills.forEach(p => p.classList.toggle("selected", p.textContent.trim() === size));

  // Actualizar enlace de WhatsApp dentro del modal
  const prod = PRODUCTS.find(p => p.id === productId);
  const modalWaBtn = document.getElementById("modalWaBtn");
  if (prod && modalWaBtn) {
    const waMessage = `¡Hola ${STORE_CONFIG.storeName}! Me interesa consultar por el producto:
• Prenda: ${prod.name}
• Talla: ${size}
• Precio: ${formatMoney(prod.price)}
¿Está disponible en stock?`;
    modalWaBtn.href = buildWhatsAppUrl(waMessage);
  }
};

window.closeQuickView = function () {
  quickViewModal.classList.add("hidden");
};

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeQuickView);
}

if (quickViewModal) {
  quickViewModal.addEventListener("click", (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });
}

// Cerrar modales con tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeQuickView();
    cartDrawerOverlay.classList.add("hidden");
  }
});

/* ==========================================================================
   EVENT LISTENERS: FILTROS, BÚSQUEDA & ORDEN
   ========================================================================== */
// Filtro por categoría (chips)
filterChips.forEach(chip => {
  chip.addEventListener("click", () => {
    filterChips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    appState.selectedCategory = chip.getAttribute("data-category");
    renderProducts();
  });
});

// Búsqueda en tiempo real
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    appState.searchQuery = e.target.value;
    if (clearSearchBtn) {
      clearSearchBtn.classList.toggle("visible", appState.searchQuery.length > 0);
    }
    renderProducts();
  });
}

if (clearSearchBtn) {
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    appState.searchQuery = "";
    clearSearchBtn.classList.remove("visible");
    renderProducts();
    searchInput.focus();
  });
}

// Ordenamiento
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    appState.sortBy = e.target.value;
    renderProducts();
  });
}

// Botón restablecer filtros
if (resetFiltersBtn) {
  resetFiltersBtn.addEventListener("click", () => {
    appState.searchQuery = "";
    appState.selectedCategory = "all";
    appState.sortBy = "default";
    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "default";
    if (clearSearchBtn) clearSearchBtn.classList.remove("visible");

    filterChips.forEach(c => {
      c.classList.toggle("active", c.getAttribute("data-category") === "all");
    });

    renderProducts();
  });
}

/* ==========================================================================
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  setupGlobalWhatsAppLinks();
  renderProducts();
  updateCartUI();
});
