# CRAZZY | Tienda de Ropa Streetwear & Urban (Tarija, Bolivia)

Interfaz demo moderna y responsiva para la tienda de ropa **CRAZZY**, diseñada con la paleta de colores **Rojo (`#ff1744`), Negro profundo (`#0a0a0a`) y Blanco (`#ffffff`)**.

---

## 🚀 Características Principales

1. **Paleta de Colores & Diseño**:
   - Estética *streetwear/urban* con fondo negro, acentos en rojo eléctrico y tipografía blanca de alto contraste.
   - Efectos visuales de brillo (*glow*), animaciones fluidas y diseño responsivo para celulares, tablets y computadoras.

2. **Catálogo con 5 Prendas Destacadas**:
   - **Hoodie Oversize "Acid Flame"** (Bs. 210) — Tallas: S, M, L, XL
   - **Polera Washed "Cyber Punk"** (Bs. 130) — Tallas: M, L, XL
   - **Pantalón Cargo Táctico "Shadow"** (Bs. 240) — Tallas: 30, 32, 34, 36
   - **Chaqueta Bomber "Red Alert" Reversible** (Bs. 320) — Tallas: M, L, XL
   - **Gorra Trucker "CRAZZY Logo" Edición Limitada** (Bs. 95) — Talla Única

3. **Sistema de Filtros en Tiempo Real**:
   - Filtrado instantáneo por botones de categorías: *Todos, Hoodies, Poleras, Pantalones, Chaquetas, Accesorios*.
   - Barra de búsqueda interactiva por nombre, estilo o descripción.
   - Contador dinámico de resultados y estado de "Sin resultados" con botón de restablecer.

4. **Integración Directa con WhatsApp (Bolivia)**:
   - Botón en cada prenda que abre automáticamente un chat de WhatsApp con el número boliviano **+591 78245678**.
   - Mensaje pre-rellenado con el nombre de la prenda seleccionada, el precio en Bolivianos (Bs.) y la talla elegida.
   - Botón flotante accesible en todo momento para atención rápida.

5. **Croquis de Ubicación y Mapa Interactivo en Tarija, Bolivia**:
   - Ubicación en el centro histórico de Tarija: *Calle Sucre #684, entre 15 de Abril y Madrid* (a 50 metros de la Plaza Principal Luis de Fuentes y Vargas).
   - Mapa interactivo con marcador animado personalizado.
   - Esquema visual de croquis de calles, horarios de atención y botón para abrir en Google Maps.

6. **Redes Sociales & Canales de Contacto**:
   - Botones oficiales para **TikTok** (`@crazzy.tarija`), **Instagram** (`@crazzy_bo`) y **Facebook** (`CRAZZY Streetwear Tarija`).
   - Número telefónico boliviano visible en cabecera, pie de página y sección de contacto.

---

## 💻 Cómo Ejecutar la Página

No requiere instalación de librerías complejas. Puedes abrirla de las siguientes maneras:

### Opción 1: Abrir directamente en el navegador
Simplemente haz doble clic en el archivo `index.html` o arrástralo a tu navegador web favorito (Chrome, Edge, Firefox, Brave).

### Opción 2: Ejecutar con un servidor local rápido
Si cuentas con Node.js o Python instalado en tu equipo, puedes abrir una terminal en esta carpeta y ejecutar:

```bash
# Con Python:
python -m http.server 3000

# O con npx:
npx serve .
```
Luego ingresa a `http://localhost:3000` en tu navegador.

---

## 📁 Estructura del Proyecto

```
crazzy-store/
├── index.html        # Maquetación completa, hero, filtros, catálogo, croquis y footer
├── styles.css        # Estilos visuales personalizados, paleta rojo/negro/blanco y animaciones
├── app.js            # Lógica de datos de prendas, filtrado, modal y generador de enlaces de WhatsApp
└── README.md         # Documentación del proyecto
```
