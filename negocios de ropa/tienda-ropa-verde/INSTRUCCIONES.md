# 🌿 Guía de Uso: Plantilla Web para Tienda de Ropa (Verde Botánica)

¡Felicidades! Ya tienes lista la base completa y profesional del catálogo web. No necesitas saber programación ni instalar ningún programa para usarla o mostrársela a tu cliente.

---

## 🚀 1. ¿Cómo ver la página web ahora mismo?

1. Ve a la carpeta de tu computadora:
   `C:\Users\HP\.gemini\antigravity\scratch\tienda-ropa-verde\`
2. Haz **doble clic en el archivo `index.html`**.
3. Se abrirá inmediatamente en Google Chrome, Microsoft Edge o tu navegador habitual.
4. ¡Listo! Verás el diseño completo interactivo con paleta verde, catálogo, buscador, filtros y botones de WhatsApp.

---

## 📱 2. ¿Cómo cambiar el número de WhatsApp para tu cliente?

El número de WhatsApp está centralizado en un solo lugar. Cuando tu cliente te dé su número real:

1. Abre el archivo `app.js` con el **Bloc de Notas** (o cualquier editor de texto).
2. Justo al inicio (línea 7) verás:
   ```javascript
   whatsappNumber: "5491123456789", 
   ```
3. Reemplázalo por el número de tu cliente con el código de su país **sin espacios ni el símbolo +**:
   - **Colombia (+57):** `"573001234567"`
   - **México (+52):** `"5215512345678"`
   - **Argentina (+54):** `"5491123456789"`
   - **Chile (+56):** `"56912345678"`
   - **España (+34):** `"34612345678"`
   - **Perú (+51):** `"51912345678"`
4. Guarda el archivo (`Ctrl + S`) y recarga la página en tu navegador (`F5`). ¡Todos los botones de WhatsApp de la página se actualizarán automáticamente!

---

## 🏷️ 3. ¿Cómo cambiar el nombre de la tienda y los precios?

En el mismo archivo `app.js`:
- Para el nombre de la tienda (línea 5):
  ```javascript
  storeName: "Nombre De La Tienda de tu Cliente",
  ```
- Para los productos (líneas 16 en adelante):
  Cada producto tiene:
  - `name`: Nombre de la prenda (ej: `"Vestido Fiesta Verde Esmeralda"`).
  - `price`: Precio numérico (ej: `45000`).
  - `sizes`: Lista de tallas (ej: `["S", "M", "L", "XL"]`).
  - `description`: Descripción comercial de la prenda.

---

## 📸 4. ¿Cómo cambiar las fotos de la ropa?

Actualmente los 5 productos utilizan fotografías de moda profesionales de alta definición de Unsplash.
Para poner las fotos reales de la tienda:
1. Puedes pegar las imágenes dentro de esta misma carpeta (ej: `foto1.jpg`, `foto2.jpg`).
2. En `app.js`, en el campo `image`, pones el nombre del archivo:
   ```javascript
   image: "foto1.jpg",
   ```

---

## 💼 5. Consejos para ofrecer y vender esta plantilla a tu cliente

Cuando presentes esta propuesta a la dueña o dueño de la tienda:

1. **Abre la página y muéstrale el diseño en celular:**
   - La mayoría de compradores de ropa compran desde el teléfono. Puedes presionar `F12` en tu teclado y luego el ícono de móvil, o abrir la página en tu teléfono. El diseño está 100% optimizado para pantallas pequeñas.
2. **Haz una prueba en vivo del botón de WhatsApp:**
   - Selecciona una talla (ej. Talla M) y presiona **"Pedir por WhatsApp"**.
   - Muéstrale cómo se redacta solo el mensaje con el nombre exacto de la prenda, la talla y el precio.
3. **Muestra el Carrito de Compras (Bolsa):**
   - Agrega 2 prendas a la bolsa, abre el carrito lateral y presiona **"Enviar Pedido por WhatsApp"**.
   - Le encantará porque recibirá los pedidos organizados con lista, tallas y el total sumado, ahorrándole horas de chat manual.
4. **Resalta la paleta verde:**
   - Explícale que seleccionaste tonos verdes botánicos (esmeralda, salvia y oliva) para transmitir frescura, elegancia y exclusividad a su marca.
