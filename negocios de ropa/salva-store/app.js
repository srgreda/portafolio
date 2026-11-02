// Configuración de la tienda SALVA
const STORE_CONFIG = {
  name: "SALVA",
  whatsappNumber: "59178234567", // Número de WhatsApp de Tarija / Bolivia
  whatsappDisplay: "+591 78234567",
  phone: "+591 4 664-5820",
  address: "Calle Ingavi #482 (entre Sucre y Daniel Campos), Centro Histórico, Tarija, Bolivia",
  hours: "Lunes a Sábado: 09:30 - 13:00 | 15:30 - 20:30",
  city: "Tarija, Bolivia",
  coordinates: {
    lat: -21.5348,
    lng: -64.7302
  },
  socials: {
    tiktok: "https://www.tiktok.com/@salva_bo",
    instagram: "https://www.instagram.com/salva.tarija",
    facebook: "https://www.facebook.com/salva.clothing"
  }
};

// Catálogo de 5 prendas de ejemplo con estética monocromática
const PRODUCTS = [
  {
    id: 1,
    name: "Polera Oversize Salva Signature",
    category: "remeras",
    categoryLabel: "Poleras / Remeras",
    price: 160,
    image: "https://i.pinimg.com/736x/d7/eb/47/d7eb47f84f093b6e94f75d869002f58b.jpg",
    badge: "MÁS VENDIDO",
    description: "Algodón peinado pesado de 240g con caída oversize relajada. Gráfico 'SALVA' en relieve serigrafiado al tono en el pecho.",
    sizes: ["S", "M", "L", "XL"],
    color: "Negro Asfalto / Tipografía Off-White"
  },
  {
    id: 2,
    name: "Pantalón Cargo Táctico Relaxed",
    category: "pantalones",
    categoryLabel: "Pantalones",
    price: 290,
    image: "https://i.pinimg.com/736x/5c/fe/54/5cfe543d5b7df8aeb0a4117bfb07e13b.jpg",
    badge: "NUEVO INGRESO",
    description: "Pantalón cargo de gabardina premium prelavada. 6 bolsillos utilitarios con trabillas reforzadas y bota con cordón regulable.",
    sizes: ["30", "32", "34", "36"],
    color: "Negro Mate"
  },
  {
    id: 3,
    name: "Chaqueta Bomber Minimal 'Monochrome'",
    category: "chaquetas",
    categoryLabel: "Chaquetas / Abrigos",
    price: 420,
    image: "https://i.pinimg.com/736x/f9/4d/67/f94d67e839c9490a09939de31bf3b1a8.jpg",
    badge: "DESTACADO",
    description: "Bomber jacket resistente al viento con acabado mate impermeable. Cuello y puños acanalados en punto tupido y forro satinado.",
    sizes: ["M", "L", "XL"],
    color: "Negro Profundo"
  },
  {
    id: 4,
    name: "Hoodie Heavyweight 'Salva Studio'",
    category: "chaquetas",
    categoryLabel: "Buzos / Hoodies",
    price: 320,
    image: "https://i.pinimg.com/736x/0c/31/c3/0c31c33660191276a2a66157a9fed0e7.jpg",
    badge: "EDICIÓN LIMITADA",
    description: "Sudadera de frisa pesada (400g) sin cordones en capucha para una estética ultra limpia. Bolsillo canguro invisible y logo bordado.",
    sizes: ["S", "M", "L", "XL"],
    color: "Blanco Crudo / Tonal Negro"
  },
  {
    id: 5,
    name: "Gorra Low Profile 6-Panel Salva",
    category: "accesorios",
    categoryLabel: "Accesorios",
    price: 110,
    image: "https://i.pinimg.com/1200x/95/4a/a4/954aa41552ead5189c4e830b228eac94.jpg",
    badge: "ESENCIAL",
    description: "Gorra dad-hat desestructurada en sarga de algodón 100%. Bordado frontal minimalista 'S' y broche metálico grabado en la parte trasera.",
    sizes: ["Única (Ajustable)"],
    color: "Negro / Costura Blanca"
  }
];

// Estado de la aplicación
let state = {
  currentFilter: "todas",
  searchQuery: "",
  sortBy: "default",
  cart: [],
  selectedProductForModal: null
};

// Inicialización cuando carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupEventListeners();
  initTarijaMap();
  updateCartUI();
});

// Renderizado de las prendas
function renderProducts() {
  const container = document.getElementById("productsGrid");
  const countSpan = document.getElementById("productCount");
  if (!container) return;

  // Filtrado
  let filtered = PRODUCTS.filter(product => {
    const matchesCategory = state.currentFilter === "todas" || product.category === state.currentFilter;
    const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Ordenamiento
  if (state.sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (countSpan) {
    countSpan.textContent = `${filtered.length} prenda${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <i data-lucide="package-x" class="w-12 h-12 mx-auto text-gray-400 mb-4"></i>
        <p class="text-lg font-medium text-black">No se encontraron prendas con este criterio</p>
        <p class="text-sm text-gray-500 mt-1">Intenta seleccionar otra categoría o cambiar tu búsqueda.</p>
        <button onclick="resetFilters()" class="mt-4 px-5 py-2 text-xs uppercase tracking-wider font-bold bg-black text-white hover:bg-neutral-800 transition">
          Ver todo el catálogo
        </button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(product => `
    <article class="group bg-white border border-gray-200 hover:border-black transition-all duration-300 flex flex-col justify-between">
      <!-- Imagen y Badges -->
      <div class="relative overflow-hidden bg-neutral-100 aspect-[4/5] cursor-pointer" onclick="openProductModal(${product.id})">
        <img 
          src="${product.image}" 
          alt="${product.name}" 
          class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute top-3 left-3 flex flex-col gap-1.5">
          <span class="bg-black text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
            ${product.badge}
          </span>
        </div>
        <button 
          onclick="event.stopPropagation(); openProductModal(${product.id})" 
          class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-black p-2.5 shadow-md hover:bg-black hover:text-white transition duration-200"
          title="Vista rápida"
        >
          <i data-lucide="eye" class="w-4 h-4"></i>
        </button>
      </div>

      <!-- Datos del Producto -->
      <div class="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-gray-500 uppercase tracking-wider mb-1">
            <span>${product.categoryLabel}</span>
            <span>Tallas: ${product.sizes.join(", ")}</span>
          </div>
          <h3 class="text-base font-bold text-black tracking-tight leading-snug group-hover:underline cursor-pointer" onclick="openProductModal(${product.id})">
            ${product.name}
          </h3>
          <p class="text-xs text-gray-600 mt-2 line-clamp-2">
            ${product.description}
          </p>
        </div>

        <div class="pt-4 mt-4 border-t border-gray-100">
          <div class="flex items-baseline justify-between mb-3">
            <span class="text-xs text-gray-500 uppercase tracking-wider font-semibold">Precio</span>
            <span class="text-lg font-black text-black">Bs. ${product.price}</span>
          </div>

          <!-- Botones de Acción -->
          <div class="grid grid-cols-2 gap-2">
            <button 
              onclick="addToCart(${product.id})"
              class="w-full py-2.5 px-2 bg-white text-black border border-black hover:bg-black hover:text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
            >
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>Al Carrito</span>
            </button>
            <a 
              href="${getDirectWhatsappLink(product)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-full py-2.5 px-2 bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
            >
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join("");

  lucide.createIcons();
}

// Generar enlace directo de WhatsApp para una sola prenda
function getDirectWhatsappLink(product, chosenSize = null) {
  const sizeText = chosenSize ? ` en talla *${chosenSize}*` : ` (disponible en ${product.sizes.join(", ")})`;
  const message = `¡Hola *SALVA* Tarija! 👋 Quisiera consultar sobre la prenda:\n\n👕 *${product.name}*${sizeText}\n💰 *Precio:* Bs. ${product.price}\n\n¿Tienen disponibilidad en tienda física (Calle Ingavi) o hacen envíos? ¡Muchas gracias!`;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Configurar event listeners
function setupEventListeners() {
  // Filtros por categoría
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("bg-black", "text-white");
        b.classList.add("bg-white", "text-black");
      });
      btn.classList.remove("bg-white", "text-black");
      btn.classList.add("bg-black", "text-white");

      state.currentFilter = btn.dataset.category;
      renderProducts();
    });
  });

  // Búsqueda en vivo
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Ordenar por
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }
}

function resetFilters() {
  state.currentFilter = "todas";
  state.searchQuery = "";
  state.sortBy = "default";

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = "default";

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(b => {
    if (b.dataset.category === "todas") {
      b.classList.add("bg-black", "text-white");
      b.classList.remove("bg-white", "text-black");
    } else {
      b.classList.remove("bg-black", "text-white");
      b.classList.add("bg-white", "text-black");
    }
  });

  renderProducts();
}

// Carrito de compras
function addToCart(productId, size = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const chosenSize = size || product.sizes[0];
  const cartKey = `${product.id}-${chosenSize}`;

  const existingItem = state.cart.find(item => item.cartKey === cartKey);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      cartKey,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: chosenSize,
      quantity: 1
    });
  }

  updateCartUI();
  showToast(`¡"${product.name}" añadido al carrito!`);
}

function updateCartQuantity(cartKey, delta) {
  const itemIndex = state.cart.findIndex(item => item.cartKey === cartKey);
  if (itemIndex > -1) {
    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
    }
  }
  updateCartUI();
}

function removeFromCart(cartKey) {
  state.cart = state.cart.filter(item => item.cartKey !== cartKey);
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById("cartCountBadge");
  const drawerList = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const totalItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (badge) {
    badge.textContent = totalItemsCount;
    badge.style.display = totalItemsCount > 0 ? "flex" : "none";
  }

  if (subtotalEl) {
    subtotalEl.textContent = `Bs. ${totalAmount}`;
  }

  if (drawerList) {
    if (state.cart.length === 0) {
      drawerList.innerHTML = `
        <div class="py-16 text-center text-gray-500">
          <i data-lucide="shopping-bag" class="w-10 h-10 mx-auto text-gray-300 mb-3"></i>
          <p class="font-medium text-black">Tu bolsa está vacía</p>
          <p class="text-xs text-gray-500 mt-1">Explora las prendas en el catálogo y agrégalas aquí.</p>
        </div>
      `;
    } else {
      drawerList.innerHTML = state.cart.map(item => `
        <div class="flex items-center gap-3 py-3 border-b border-gray-100">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover bg-neutral-100" />
          <div class="flex-grow">
            <h4 class="text-xs font-bold text-black uppercase leading-snug">${item.name}</h4>
            <div class="text-[11px] text-gray-500 mt-0.5">Talla: <span class="font-semibold text-black">${item.size}</span></div>
            <div class="text-xs font-black text-black mt-1">Bs. ${item.price} c/u</div>
            <div class="flex items-center gap-2 mt-2">
              <button onclick="updateCartQuantity('${item.cartKey}', -1)" class="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-black hover:text-white transition">-</button>
              <span class="text-xs font-bold px-1">${item.quantity}</span>
              <button onclick="updateCartQuantity('${item.cartKey}', 1)" class="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-black hover:text-white transition">+</button>
            </div>
          </div>
          <button onclick="removeFromCart('${item.cartKey}')" class="text-gray-400 hover:text-black p-1" title="Eliminar">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `).join("");
    }
  }

  lucide.createIcons();
}

function toggleCart(forceOpen = null) {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (!drawer || !overlay) return;

  const isCurrentlyOpen = !drawer.classList.contains("translate-x-full");
  const shouldOpen = forceOpen !== null ? forceOpen : !isCurrentlyOpen;

  if (shouldOpen) {
    drawer.classList.remove("translate-x-full");
    drawer.classList.add("translate-x-0");
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    drawer.classList.add("translate-x-full");
    drawer.classList.remove("translate-x-0");
    overlay.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

// Finalizar pedido completo por WhatsApp
function checkoutViaWhatsapp() {
  if (state.cart.length === 0) {
    alert("Tu carrito está vacío. Agrega una o más prendas primero.");
    return;
  }

  const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let message = `¡Hola *SALVA* Tarija! 👋 Quisiera realizar el siguiente pedido desde su tienda online:\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  state.cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n   - Talla: ${item.size}\n   - Cantidad: ${item.quantity}\n   - Subtotal: Bs. ${item.price * item.quantity}\n\n`;
  });
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*TOTAL A PAGAR: Bs. ${totalAmount}*\n\n`;
  message += `📍 *Ubicación de entrega:* [Tarija / Recojo en tienda de Calle Ingavi / Envío a domicilio]\n`;
  message += `👤 *Mi nombre:* \n`;
  message += `¿Me confirman el método de pago (QR / Efectivo) y disponibilidad? ¡Muchas gracias!`;

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Modal de detalle de producto
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("productModal");
  const content = document.getElementById("productModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative bg-white max-w-2xl w-full border border-black shadow-2xl overflow-hidden flex flex-col md:flex-row">
      <!-- Botón cerrar -->
      <button onclick="closeProductModal()" class="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 border border-black text-black hover:bg-black hover:text-white transition">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <!-- Imagen -->
      <div class="md:w-1/2 aspect-[4/5] bg-neutral-100 relative">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover" />
        <span class="absolute top-3 left-3 bg-black text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
          ${product.badge}
        </span>
      </div>

      <!-- Información -->
      <div class="md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">${product.categoryLabel}</span>
          <h2 class="text-xl font-black text-black mt-1 leading-tight font-heading">${product.name}</h2>
          <div class="text-2xl font-black text-black mt-2">Bs. ${product.price}</div>
          
          <div class="text-xs text-gray-500 mt-1">Color: <strong class="text-black">${product.color}</strong></div>
          <p class="text-xs text-gray-600 mt-4 leading-relaxed">${product.description}</p>

          <!-- Selector de Tallas -->
          <div class="mt-5">
            <label class="block text-xs font-bold uppercase tracking-wider text-black mb-2">Selecciona tu talla:</label>
            <div class="flex flex-wrap gap-2" id="modalSizeOptions">
              ${product.sizes.map((s, idx) => `
                <button 
                  type="button"
                  onclick="selectModalSize(this, '${s}')" 
                  class="size-pill text-xs font-bold px-3 py-1.5 border ${idx === 0 ? 'border-black bg-black text-white' : 'border-gray-300 bg-white text-black hover:border-black'} transition"
                  data-size="${s}"
                >
                  ${s}
                </button>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
          <button 
            id="modalAddToCartBtn"
            onclick="addModalProductToCart(${product.id})"
            class="w-full py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white text-xs font-bold uppercase tracking-widest transition flex items-center justify-center gap-2"
          >
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            <span>Añadir a la Bolsa</span>
          </button>
          
          <button 
            id="modalWhatsappBtn"
            onclick="consultModalProductWhatsapp(${product.id})"
            class="w-full py-3 bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-widest transition flex items-center justify-center gap-2"
          >
            <i data-lucide="message-circle" class="w-4 h-4"></i>
            <span>Comprar directo por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  lucide.createIcons();
}

let activeModalSelectedSize = null;

function selectModalSize(buttonEl, size) {
  activeModalSelectedSize = size;
  const allButtons = document.querySelectorAll("#modalSizeOptions .size-pill");
  allButtons.forEach(btn => {
    btn.classList.remove("border-black", "bg-black", "text-white");
    btn.classList.add("border-gray-300", "bg-white", "text-black");
  });
  buttonEl.classList.remove("border-gray-300", "bg-white", "text-black");
  buttonEl.classList.add("border-black", "bg-black", "text-white");
}

function addModalProductToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const size = activeModalSelectedSize || product.sizes[0];
  addToCart(productId, size);
  closeProductModal();
  toggleCart(true);
}

function consultModalProductWhatsapp(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const size = activeModalSelectedSize || product.sizes[0];
  const url = getDirectWhatsappLink(product, size);
  window.open(url, "_blank");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
  activeModalSelectedSize = null;
}

// Toast de notificación rápida
function showToast(text) {
  let toast = document.getElementById("salvaToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "salvaToast";
    toast.className = "fixed bottom-6 left-6 z-50 bg-black text-white text-xs font-bold tracking-wide uppercase px-5 py-3 border border-white/20 shadow-2xl transition-all duration-300 transform translate-y-10 opacity-0 flex items-center gap-2";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-white"></i><span>${text}</span>`;
  lucide.createIcons();

  toast.classList.remove("translate-y-10", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-10", "opacity-0");
  }, 2800);
}

// Inicialización de Leaflet Map de Tarija (con tema estilizado en escala de grises)
function initTarijaMap() {
  const mapElement = document.getElementById("tarijaMap");
  if (!mapElement || typeof L === "undefined") return;

  const lat = STORE_CONFIG.coordinates.lat;
  const lng = STORE_CONFIG.coordinates.lng;

  // Centro de Tarija (cerca de Plaza Luis de Fuentes y Calle Ingavi)
  const map = L.map('tarijaMap', {
    scrollWheelZoom: false
  }).setView([lat, lng], 16);

  // Tiles de OpenStreetMap con clase para filtro monocromático
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    className: 'leaflet-bw-map'
  }).addTo(map);

  // Marcador custom negro minimalista
  const customIcon = L.divIcon({
    className: 'custom-pin',
    html: `
      <div style="background-color: #000; color: #fff; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.5); font-family: 'Syne', sans-serif; font-weight: 800; font-size: 14px;">
        S
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });

  const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

  marker.bindPopup(`
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; color: #000;">
      <strong style="font-size: 14px; font-weight: 800; text-transform: uppercase;">SALVA • Tarija</strong>
      <p style="font-size: 11px; margin: 4px 0 8px 0; color: #444;">${STORE_CONFIG.address}</p>
      <a href="https://maps.google.com/?q=${lat},${lng}" target="_blank" style="display: inline-block; background: #000; color: #fff; text-decoration: none; padding: 4px 8px; font-size: 10px; font-weight: 700; text-transform: uppercase;">
        Ver en Google Maps &rarr;
      </a>
    </div>
  `).openPopup();
}
