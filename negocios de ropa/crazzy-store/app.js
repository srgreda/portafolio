/**
 * CRAZZY STORE - FRONTEND LOGIC
 * Streetwear & Urban Fashion Store - Tarija, Bolivia
 */

// Store Configuration
const STORE_CONFIG = {
  name: 'CRAZZY',
  phone: '+591 78245678',
  whatsappRaw: '59178245678',
  city: 'Tarija, Bolivia',
  address: 'Calle Sucre #684 entre 15 de Abril y Madrid, Zona Central',
  coordinates: [-21.5338, -64.7335] // Tarija Centro
};

// 5 Example Clothing Items
const PRODUCTS = [
  {
    id: 1,
    name: 'Hoodie Oversize "Acid Flame"',
    category: 'hoodies',
    categoryName: 'Hoodies',
    price: 210,
    badge: 'Bestseller 🔥',
    image: 'https://i.pinimg.com/736x/1b/9b/67/1b9b679ceb2115b941eeff3dbfe3bdd5.jpg',
    tagline: 'Corte Loose Fit • Algodón Frisa Pesada 380g',
    description: 'Capucha doble forrada, serigrafía tacto cero en pecho y espalda con diseño de flamas rojas. Máxima comodidad y caída estética para el estilo urbano de Tarija.',
    sizes: ['S', 'M', 'L', 'XL'],
    defaultSize: 'M'
  },
  {
    id: 2,
    name: 'Polera Washed "Cyber Punk"',
    category: 'poleras',
    categoryName: 'Poleras',
    price: 130,
    badge: 'Nuevo Drop',
    image: 'https://i.pinimg.com/736x/18/ef/19/18ef19a73082eacb48320d9cb5bea88c.jpg',
    tagline: 'Efecto Vintage Lavado • Cuello Rib Grueso',
    description: 'Confección en algodón 20/1 peinado, textura premium desgastada en tonos negros profundos con serigrafía en contraste rojo y blanco puro.',
    sizes: ['M', 'L', 'XL'],
    defaultSize: 'L'
  },
  {
    id: 3,
    name: 'Pantalón Cargo Táctico "Shadow"',
    category: 'pantalones',
    categoryName: 'Pantalones',
    price: 240,
    badge: 'Favorito',
    image: 'https://i.pinimg.com/736x/9e/aa/42/9eaa428a21f668e16630a56f23df568e.jpg',
    tagline: '6 Bolsillos Funcionales • Tobillos Ajustables',
    description: 'Tela ripstop antidesgarro con correas decorativas tácticas, elástico ajustable y bolsillos laterales de gran capacidad para el día a día.',
    sizes: ['30', '32', '34', '36'],
    defaultSize: '32'
  },
  {
    id: 4,
    name: 'Chaqueta Bomber "Red Alert" Reversible',
    category: 'chaquetas',
    categoryName: 'Chaquetas',
    price: 320,
    badge: 'Exclusivo',
    image: 'https://i.pinimg.com/736x/91/87/2d/91872d5cd43a15515c886a713d4deab5.jpg',
    tagline: 'Exterior Negro Mate • Interior Rojo Carmesí',
    description: 'Chaqueta bomber urbana con cierre metálico industrial de alto calibre, forro térmico impermeable y tira roja distintiva CRAZZY en la manga.',
    sizes: ['M', 'L', 'XL'],
    defaultSize: 'L'
  },
  {
    id: 5,
    name: 'Gorra Trucker "CRAZZY Logo" Ed. Limitada',
    category: 'accesorios',
    categoryName: 'Accesorios',
    price: 95,
    badge: 'Últimas Piezas',
    image: 'https://i.pinimg.com/736x/f8/8b/0a/f88b0aa64a0e13aebb11066180f9f76f.jpg',
    tagline: 'Bordado 3D de Alta Densidad • Broche Ajustable',
    description: 'Malla trasera respirable de alto confort, panel frontal estructurado con logotipo CRAZZY en relieve bordado con hilos rojo escarlata y blanco.',
    sizes: ['Talla Única'],
    defaultSize: 'Talla Única'
  }
];

// State Management
let currentCategory = 'todos';
let searchQuery = '';
let selectedProductForModal = null;
let currentModalSize = '';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const emptyState = document.getElementById('empty-state');
const filteredCount = document.getElementById('filtered-count');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const resetFiltersBtn = document.getElementById('reset-filters-btn');
const categoryButtons = document.querySelectorAll('.filter-btn');

// Modal Elements
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalImg = document.getElementById('modal-img');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalTagline = document.getElementById('modal-tagline');
const modalPrice = document.getElementById('modal-price');
const modalDesc = document.getElementById('modal-desc');
const modalSizesContainer = document.getElementById('modal-sizes');
const modalWhatsappLink = document.getElementById('modal-whatsapp-link');

// Mobile Menu Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Helper to construct WhatsApp link with custom pre-filled message
function buildWhatsAppUrl(productName, price, size = null) {
  let message = `¡Hola ${STORE_CONFIG.name}! 👋 Vi su página web y me interesa adquirir la siguiente prenda en Tarija:\n\n`;
  message += `👕 *Prenda:* ${productName}\n`;
  message += `💰 *Precio:* Bs. ${price}\n`;
  if (size) {
    message += `📏 *Talla de interés:* ${size}\n`;
  }
  message += `📍 *Ciudad:* Tarija, Bolivia\n\n`;
  message += `¿Tienen stock disponible para retiro en tienda o entrega? ¡Gracias!`;

  return `https://wa.me/${STORE_CONFIG.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

// Render Products Grid
function renderProducts() {
  const filtered = PRODUCTS.filter(product => {
    const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filteredCount.textContent = filtered.length;

  if (filtered.length === 0) {
    productsGrid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  productsGrid.innerHTML = filtered.map(product => {
    const waUrl = buildWhatsAppUrl(product.name, product.price, product.defaultSize);

    return `
      <article class="bg-brand-card border border-brand-border rounded-2xl overflow-hidden crazzy-card-hover flex flex-col group shadow-xl">
        
        <!-- Image & Badges -->
        <div class="relative h-72 sm:h-80 bg-zinc-900 overflow-hidden cursor-pointer" onclick="openProductModal(${product.id})">
          <img src="${product.image}" alt="${product.name}" 
               class="w-full h-full object-cover object-center group-hover:scale-108 transition duration-700">
          
          <div class="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-70"></div>

          <!-- Category pill -->
          <span class="absolute top-3 left-3 bg-black/85 backdrop-blur-md text-[10px] uppercase font-bold tracking-wider text-zinc-300 px-3 py-1 rounded-full border border-zinc-700">
            ${product.categoryName}
          </span>

          <!-- Promo Badge -->
          <span class="absolute top-3 right-3 bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md shadow-brand-red/50">
            ${product.badge}
          </span>

          <!-- Quick View overlay hint on hover -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <span class="px-4 py-2 bg-white text-black font-bold text-xs rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all">
              <i class="fa-solid fa-eye"></i> Vista Rápida
            </span>
          </div>
        </div>

        <!-- Product Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 class="font-display font-black text-lg text-white group-hover:text-brand-red transition-colors cursor-pointer" onclick="openProductModal(${product.id})">
                ${product.name}
              </h3>
            </div>

            <p class="text-xs text-brand-gray font-medium mb-3">
              ${product.tagline}
            </p>

            <!-- Available sizes tags -->
            <div class="flex items-center gap-1.5 mb-4">
              <span class="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mr-1">Tallas:</span>
              ${product.sizes.map(size => `
                <span class="px-2 py-0.5 bg-brand-dark border border-brand-border rounded text-[11px] font-semibold text-zinc-300">
                  ${size}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Price & Buttons Section -->
          <div class="pt-4 border-t border-brand-border/60">
            <div class="flex items-baseline justify-between mb-4">
              <div>
                <span class="text-[10px] text-zinc-400 uppercase tracking-wider block font-bold">Precio Tarija</span>
                <div class="flex items-baseline gap-1">
                  <span class="font-display font-black text-2xl text-brand-red">Bs. ${product.price}</span>
                  <span class="text-xs text-zinc-400">BOB</span>
                </div>
              </div>
              <span class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <i class="fa-solid fa-circle-check text-[10px]"></i> En Stock
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-2">
              <button onclick="openProductModal(${product.id})" class="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-brand-border hover:border-zinc-500 transition-colors flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-sliders"></i>
                <span>Detalle</span>
              </button>

              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" 
                 class="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all shadow-md shadow-emerald-950 flex items-center justify-center gap-1.5 hover:scale-[1.02]">
                <i class="fa-brands fa-whatsapp text-sm"></i>
                <span>Pedir WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </article>
    `;
  }).join('');
}

// Modal Functions
function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  selectedProductForModal = product;
  currentModalSize = product.defaultSize;

  modalImg.src = product.image;
  modalImg.alt = product.name;
  modalCategory.textContent = product.categoryName;
  modalTitle.textContent = product.name;
  modalTagline.textContent = product.tagline;
  modalPrice.textContent = `Bs. ${product.price}`;
  modalDesc.textContent = product.description;

  // Render size selector
  modalSizesContainer.innerHTML = product.sizes.map(size => `
    <button type="button" 
            class="size-btn ${size === currentModalSize ? 'active' : ''}" 
            onclick="selectModalSize('${size}')">
      ${size}
    </button>
  `).join('');

  updateModalWhatsAppUrl();

  productModal.classList.remove('hidden');
  productModal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function selectModalSize(size) {
  currentModalSize = size;
  const buttons = modalSizesContainer.querySelectorAll('.size-btn');
  buttons.forEach(btn => {
    if (btn.textContent.trim() === size) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  updateModalWhatsAppUrl();
}

function updateModalWhatsAppUrl() {
  if (!selectedProductForModal) return;
  const url = buildWhatsAppUrl(
    selectedProductForModal.name,
    selectedProductForModal.price,
    currentModalSize
  );
  modalWhatsappLink.href = url;
}

function closeModal() {
  productModal.classList.add('hidden');
  productModal.classList.remove('flex');
  document.body.style.overflow = 'auto';
  selectedProductForModal = null;
}

// Leaflet Map Initialization
function initTarijaMap() {
  const mapElement = document.getElementById('tarija-map');
  if (!mapElement) return;

  // Center coordinates: Plaza Principal Luis de Fuentes, Tarija
  const tarijaCoords = STORE_CONFIG.coordinates;

  const map = L.map('tarija-map', {
    center: tarijaCoords,
    zoom: 16,
    scrollWheelZoom: false
  });

  // OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors | CRAZZY Store Tarija'
  }).addTo(map);

  // Custom Pulsing Red Marker
  const customMarkerIcon = L.divIcon({
    className: 'crazzy-map-marker-container',
    html: `
      <div class="crazzy-map-marker">
        <i class="fa-solid fa-shirt"></i>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22]
  });

  // Add marker
  const marker = L.marker(tarijaCoords, { icon: customMarkerIcon }).addTo(map);

  // Custom Popup content
  const popupContent = `
    <div style="font-family: 'Montserrat', sans-serif; text-align: left; padding: 4px;">
      <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
        <span style="background: #ff1744; color: #fff; font-size: 10px; font-weight: 900; padding: 2px 6px; border-radius: 4px;">CRAZZY</span>
        <strong style="color: #fff; font-size: 13px;">Tienda Tarija</strong>
      </div>
      <p style="color: #d1d5db; font-size: 11px; margin: 0 0 6px 0;">
        📍 Calle Sucre #684 (Entre 15 de Abril y Madrid)
      </p>
      <p style="color: #9ca3af; font-size: 10px; margin: 0 0 8px 0;">
        A 50m de la Plaza Principal Luis de Fuentes
      </p>
      <a href="https://wa.me/${STORE_CONFIG.whatsappRaw}?text=Hola%20CRAZZY!%20%C2%BFMe%20pueden%20dar%20indicaciones%20para%20llegar%20a%20su%20tienda%20en%20Tarija?" 
         target="_blank" 
         style="display: inline-block; background: #059669; color: #fff; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; text-decoration: none;">
        <i class="fa-brands fa-whatsapp"></i> Contactar por WhatsApp
      </a>
    </div>
  `;

  marker.bindPopup(popupContent).openPopup();
}

// Event Listeners Setup
function setupEventListeners() {

  // Category Filter Buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      categoryButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      currentCategory = button.getAttribute('data-category');
      renderProducts();
    });
  });

  // Search Input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    if (searchQuery.length > 0) {
      clearSearchBtn.classList.remove('hidden');
    } else {
      clearSearchBtn.classList.add('hidden');
    }
    renderProducts();
  });

  // Clear Search Button
  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.classList.add('hidden');
    renderProducts();
    searchInput.focus();
  });

  // Reset Filters Button
  resetFiltersBtn.addEventListener('click', () => {
    currentCategory = 'todos';
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    categoryButtons.forEach(b => {
      if (b.getAttribute('data-category') === 'todos') {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    renderProducts();
  });

  // Modal Close Events
  closeModalBtn.addEventListener('click', closeModal);
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !productModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when link is clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupEventListeners();
  initTarijaMap();
});
