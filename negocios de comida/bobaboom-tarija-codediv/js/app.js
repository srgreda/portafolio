/**
 * ==========================================================================
 * BOBABOOM TARIJA - LÓGICA INTERACTIVA (JAVASCRIPT)
 * Funcionalidades:
 *   1. Catálogo dinámico de postres y boba teas con precios en Bolivianos (Bs.)
 *   2. Sistema de filtrado por categorías (Todos, Boba Tea, Postres, Combos)
 *   3. Carrito de compras interactivo con persistencia local
 *   4. Control de cantidades (+ / -) y cálculo automático de totales
 *   5. Generador de pedidos automáticos para WhatsApp (+591 76194820)
 *   6. Notificaciones flotantes tipo Toast
 *   7. Control de apertura/cierre de cajón lateral y modal
 * ==========================================================================
 */

// 1. CONFIGURACIÓN Y CONSTANTES
const STORE_PHONE = '59167992051'; // Número Boliviano de Tarija
const LOCAL_STORAGE_KEY = 'bobaboom_cart_v1';

// 2. CATÁLOGO OFICIAL DE PRODUCTOS (POSTRES Y BEBIDAS)
const PRODUCTS = [
  {
    id: 'taro-boom',
    title: 'Taro Boom Clásico',
    category: 'boba',
    price: 24,
    size: '500 ml',
    tag: 'MÁS PEDIDO',
    tagClass: 'bg-purple',
    subtitle: 'Con auténtica raíz de taro y perlas negras',
    description: 'Infusión dulce y cremosa de taro morado con base de leche suave y abundante tapioca artesanal recién cocinada cada hora.',
    imagenUrl: 'https://i.pinimg.com/1200x/c7/4c/34/c74c346c74700564f004b685cd520f9c.jpg'
  },
  {
    id: 'cheesecake-michi',
    title: 'Cheesecake Michi Pastelero',
    category: 'desserts',
    price: 22,
    size: 'Porción XL',
    tag: 'HORNEADO HOY',
    tagClass: 'bg-black',
    subtitle: 'Con compota artesanal de arándanos',
    description: 'Cremoso cheesecake estilo Nueva York con base de galletas caseras y reducción de arándanos frescos de los valles tarijeños.',
    imagenUrl: 'https://i.pinimg.com/1200x/61/eb/bf/61ebbf8f5d8da8ee09e28d606edc50ab.jpg'
  },
  {
    id: 'matcha-firulais',
    title: 'Matcha Firulais Milk Tea',
    category: 'boba',
    price: 25,
    size: '500 ml',
    tag: '100% ORGÁNICO',
    tagClass: 'bg-green',
    subtitle: 'Té verde ceremonial & popping lichi',
    description: 'Matcha japonés grado ceremonial batido con chasen tradicional, leche aterciopelada y perlas de tapioca negra con popping de fruta.',
    imagenUrl: 'https://i.pinimg.com/736x/f1/1e/2d/f11e2d94ac4ac76a201f4fd1287dc0d3.jpg'
  },
  {
    id: 'mochi-waffle',
    title: 'Mochi Waffle Catnip',
    category: 'desserts',
    price: 20,
    size: '2 Unidades',
    tag: 'CRUJIENTE',
    tagClass: 'bg-purple-light',
    subtitle: 'Harina de arroz glutinoso + helado',
    description: 'Waffle caliente y elástico por dentro con textura crocante exterior. Acompañado de bola de helado artesanal y miel de caña.',
    imagenUrl: 'https://i.pinimg.com/736x/7c/26/7e/7c267e523b67842160135cc6df24fbdb.jpg'
  },
  {
    id: 'brownie-chef',
    title: 'Brownie Chef Perruno',
    category: 'desserts',
    price: 18,
    size: '120 gr',
    tag: 'CHOCOLATE 70%',
    tagClass: 'bg-black',
    subtitle: 'Fudge tibio con cacao boliviano y nuez',
    description: 'Masa húmeda de chocolate boliviano con nueces seleccionadas y una pizca de sal marina de Uyuni. ¡Para humanos dulceros!',
    imagenUrl: 'https://i.pinimg.com/1200x/de/3a/21/de3a2199180206c1f82e426d232fdf37.jpg'
  },
  {
    id: 'combo-chapaco',
    title: 'Combo Dúo Chapaco',
    category: 'combos',
    price: 38,
    size: '1 Boba + 1 Postre',
    tag: 'AHORRA BS. 7',
    tagClass: 'bg-purple',
    subtitle: '1 Boba a elección + 1 Postre artesanal',
    description: 'La combinación favorita: elige tu té Boba preferido acompañado con una generosa porción de Cheesecake Michi o Brownie tibio.',
    imagenUrl: 'https://i.pinimg.com/736x/ee/66/90/ee669001d2a28e79582278fcd5fd4bb5.jpg'
  }
];

// 3. ESTADO DEL CARRITO DE COMPRAS
let cartState = [];
let deliveryMode = 'Delivery Tarija';

// 4. ELEMENTOS DEL DOM
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartModal = document.getElementById('cartModal');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsContainer = document.getElementById('cartItemsList');
const cartTotalEl = document.getElementById('cartTotalPrice');
const cartCountBadge = document.getElementById('cartCountBadge');
const checkoutWhatsAppBtn = document.getElementById('checkoutWhatsAppBtn');
const orderAddressInput = document.getElementById('orderAddress');
const deliveryOptionBtn = document.getElementById('deliveryOptionBtn');
const pickupOptionBtn = document.getElementById('pickupOptionBtn');
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

// 5. CARGAR CARRITO DESDE LOCALSTORAGE
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      cartState = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error al cargar carrito local', e);
    cartState = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartState));
  } catch (e) {
    console.error('Error al guardar carrito local', e);
  }
}

// 6. RENDERIZAR CATÁLOGO DE PRODUCTOS
function renderProducts(filterCategory = 'all') {
  if (!productsGrid) return;
  productsGrid.innerHTML = '';

  const filtered = filterCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filterCategory);

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);

    // Etiqueta de color
    let tagBadgeStyle = 'background-color: var(--color-black); color: white;';
    if (product.tagClass === 'bg-purple') {
      tagBadgeStyle = 'background-color: var(--color-purple); color: white;';
    } else if (product.tagClass === 'bg-green') {
      tagBadgeStyle = 'background-color: #ECFDF5; color: #065F46; border-color: #065F46;';
    } else if (product.tagClass === 'bg-purple-light') {
      tagBadgeStyle = 'background-color: var(--color-purple-light); color: var(--color-purple);';
    }

    card.innerHTML = `
      <div>
        <div class="product-image-box" style="padding: 0; overflow: hidden; position: relative;">
          <span class="product-badge-corner" style="${tagBadgeStyle}; z-index: 2;">${product.tag}</span>
          
          <!-- Se reemplaza product.svg por product.imagenUrl -->
          <img src="${product.imagenUrl}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">
          
          <div style="position: absolute; bottom: 8px; right: 10px; font-family: var(--font-mono); font-size: 10px; color: white; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px; z-index: 2;">
            ${product.size}
          </div>
        </div>

        <div class="product-info-top">
          <div>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-subtitle">${product.subtitle}</p>
          </div>
          <span class="product-price-tag">Bs. ${product.price}</span>
        </div>

        <p class="product-description">${product.description}</p>
      </div>

      <div class="product-card-footer">
        <button class="btn-add-cart" onclick="handleAddToCart('${product.id}')">
          <i data-lucide="plus-circle" style="width: 16px; height: 16px;"></i>
          <span>Agregar al Carrito</span>
        </button>
        <a href="https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(`¡Hola BobaBoom! Quiero pedir el postre/boba *${product.title}* (Bs. ${product.price}) para delivery en Tarija 🐾`)}" 
           target="_blank" 
           class="btn-whatsapp-item" 
           title="Pedir directo por WhatsApp">
          <i data-lucide="message-circle" style="width: 18px; height: 18px;"></i>
        </a>
      </div>
    `;

    productsGrid.appendChild(card);
  });

  // Re-inicializar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 7. FUNCIONES DEL CARRITO
window.handleAddToCart = function (productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cartState.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartState.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`¡${product.title} agregado a tu canastita!`);
};

window.changeQuantity = function (productId, delta) {
  const item = cartState.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cartState = cartState.filter(i => i.id !== productId);
  }

  saveCartToStorage();
  updateCartUI();
};

window.removeFromCart = function (productId) {
  cartState = cartState.filter(i => i.id !== productId);
  saveCartToStorage();
  updateCartUI();
};

function updateCartUI() {
  const totalItems = cartState.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartCountBadge) cartCountBadge.textContent = totalItems;
  if (cartTotalEl) cartTotalEl.textContent = `Bs. ${totalCost}`;

  if (!cartItemsContainer) return;

  if (cartState.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--color-gray-text); padding: 24px;">
        <span style="font-size: 40px; margin-bottom: 8px;">🐾🧁</span>
        <p style="font-weight: 800; font-size: 15px; color: var(--color-black);">Tu canasta está vacía</p>
        <p style="font-family: var(--font-doodle); font-size: 13px; margin-top: 4px;">Los michis reposteros están listos para hornear tu pedido.</p>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cartState.map(item => `
    <div class="cart-item-row">
      <div>
        <h4 style="font-weight: 800; font-size: 13px; color: var(--color-black);">${item.title}</h4>
        <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 800; color: var(--color-purple);">
          Bs. ${item.price} c/u &bull; Subtotal: Bs. ${item.price * item.quantity}
        </span>
      </div>

      <div style="display: flex; align-items: center; gap: 8px;">
        <div class="cart-qty-controls">
          <button class="cart-qty-btn" onclick="changeQuantity('${item.id}', -1)">&minus;</button>
          <span style="padding: 0 8px; font-family: var(--font-mono); font-size: 12px; font-weight: 800;">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="changeQuantity('${item.id}', 1)">&#43;</button>
        </div>
        <button onclick="removeFromCart('${item.id}')" style="color: #EF4444; padding: 4px;" title="Eliminar">
          <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 8. CONTROL DEL MODAL Y DRAWER
function openCart() {
  if (cartModal) {
    cartModal.classList.add('open');
  }
}

function closeCart() {
  if (cartModal) {
    cartModal.classList.remove('open');
  }
}

if (openCartBtn) openCartBtn.addEventListener('click', openCart);
if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartModal) {
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCart();
  });
}

// 9. SELECTOR DE MODALIDAD DE ENTREGA
if (deliveryOptionBtn && pickupOptionBtn) {
  deliveryOptionBtn.addEventListener('click', () => {
    deliveryMode = 'Delivery Tarija';
    deliveryOptionBtn.classList.add('active');
    pickupOptionBtn.classList.remove('active');
  });

  pickupOptionBtn.addEventListener('click', () => {
    deliveryMode = 'Retiro en Sucursal (Calle 15 de Abril)';
    pickupOptionBtn.classList.add('active');
    deliveryOptionBtn.classList.remove('active');
  });
}

// 10. CHECKOUT AUTOMÁTICO VÍA WHATSAPP (CON NÚMERO BOLIVIANO)
if (checkoutWhatsAppBtn) {
  checkoutWhatsAppBtn.addEventListener('click', () => {
    if (cartState.length === 0) {
      alert('Por favor agrega al menos un postre o boba a la canastita.');
      return;
    }

    const address = (orderAddressInput && orderAddressInput.value.trim())
      ? orderAddressInput.value.trim()
      : 'No especificada (Coordinar en el chat)';

    const totalCost = cartState.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let message = `¡Hola *BobaBoom Tarija*! 🐾🧋\nQuiero confirmar el siguiente pedido de su web:\n\n`;
    cartState.forEach((item, index) => {
      message += `${index + 1}. *${item.title}* x${item.quantity} = Bs. ${item.price * item.quantity}\n`;
    });

    message += `\n💰 *Total:* Bs. ${totalCost}\n`;
    message += `🛵 *Modalidad:* ${deliveryMode}\n`;
    message += `📍 *Dirección/Referencia:* ${address}\n`;
    message += `💳 *Método de pago preferido:* Pago con QR o Efectivo\n\n`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_PHONE}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  });
}

// 11. SISTEMA DE FILTRADO POR CATEGORÍA
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');
    renderProducts(category);
  });
});

// 12. NOTIFICACIÓN TOAST
function showToast(message) {
  if (!toastNotification || !toastMessage) return;
  toastMessage.textContent = message;
  toastNotification.classList.add('show');

  setTimeout(() => {
    toastNotification.classList.remove('show');
  }, 2500);
}

// 13. INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  loadCartFromStorage();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
