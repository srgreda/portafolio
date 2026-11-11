# el.kumpita.lukas — Interfaz Demo Streetwear

Página web demo para la tienda de ropa urbana **el.kumpita.lukas**, diseñada con estética de urbanismo y referencias de palmeras en paleta **negro, blanco y verde**.

## Estructura dividida en 3 partes

1. **`index.html` — Estructura (HTML):**
   - Barra superior animada (`top-ticker`) y encabezado fijo con logo SVG de palmera urbana.
   - Sección Hero editorial con estética concreto + palmeras.
   - Panel de filtros (búsqueda, ordenamiento, categoría, color y talla) y grilla de 5 prendas.
   - Croquis de ubicación interactivo en SVG con puntos de referencia y modo Día/Nocturno.
   - Sección de redes sociales, carrito lateral (*drawer*), modal de detalle rápido y botón flotante de WhatsApp.

2. **`styles.css` — Diseño (CSS):**
   - Variables de color (`--bg-black`, `--bg-white`, `--green`, `--green-bright`), grilla arquitectónica de fondo, tarjetas urbanas, estilos responsivos para móvil/escritorio y tema Día/Nocturno del croquis.

3. **`app.js` — Interactividad (JavaScript):**
   - Catálogo de 5 prendas con precios en Bolivianos (`Bs.`), filtros combinables y búsqueda en tiempo real.
   - Selector de tallas por prenda (`S`, `M`, `L`, `XL`), modal de vista rápida y carrito persistente en `localStorage`.
   - Botones de pedido directo y envío de resumen del carrito por **WhatsApp (`+591 67992051`)**.
   - Interactividad de pines del croquis, copiado de referencia y alertas *toast*.

## Cómo visualizar

Abre `index.html` directamente en tu navegador o sirve la carpeta con cualquier servidor estático local.
