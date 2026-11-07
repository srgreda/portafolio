# BobaBoom Tarija 🧋🐾🍰
**Demo Web & Tienda Online de Boba Tea y Postres Artesanales**

Bienvenido al proyecto modular de **BobaBoom**, la tienda de boba tea y repostería artesanal de **Tarija, Bolivia**, famosa por el mural/tapiz de sus paredes decorado con **perritos y gatitos cocineros**, usleros, batidores y teteras.

---

## 🏗️ Arquitectura Modular del Código

El proyecto ha sido completamente reorganizado siguiendo los principios estándar de separación de responsabilidades:

```text
bobaboom-tarija/
├── index.html          # Estructura semántica de la página (HTML5)
├── css/
│   └── styles.css      # Sistema de diseño, paleta de colores, doodles y estilo Zine (CSS3)
├── js/
│   └── app.js          # Lógica interactiva, carrito, filtros y checkout WhatsApp (ES6+)
└── README.md           # Documentación y guía de uso
```

---

## 🎨 1. Diseño y Paleta de Colores (`css/styles.css`)

El archivo CSS centraliza todo el diseño visual mediante **variables CSS** y clases modulares:
- **Predominante Blanco:** Variables `--bg-white: #FFFFFF` y `--bg-paper: #FAF9F6` para emular páginas de cómic y fanzine limpio.
- **Poco Negro:** Variable `--color-black: #141414` utilizada para trazos de dibujo (*line art*), bordes neobrutalistas (`2px solid`) y tipografía de alto contraste.
- **Poco Morado:** Variables `--color-purple: #7E22CE` y `--color-purple-light: #F3E8FF` para detalles selectivos (perlas de boba taro, badges, botones de acción).
- **Fondo de Tapis Line Art:** Patrón SVG vectorial integrado en `.wallpaper-doodles-layer` con perros y gatos chefs, rodillos de amasar y utensilios de repostería.
- **Estilo Zine y Mixed Media:** Efecto de cinta adhesiva japonesa (*.washi-tape* y *.washi-tape-purple*), sombras brutales cuadradas (`box-shadow: 4px 4px 0px #141414`) y textura de papel risográfico.

---

## 📄 2. Estructura de la Página (`index.html`)

El HTML contiene únicamente la estructura semántica y accesible:
- **Ticker superior:** Aviso de envíos en Tarija y estado del local.
- **Header:** Logotipo del gato chef con perla boba, navegación y acceso al carrito.
- **Hero:** Portada con titulares estilo rotulador y tarjeta collage polaroid del mural original.
- **Sección Menú:** Contenedor y botones de filtrado rápido.
- **Sección Historia:** Relato del por qué de los animalitos cocineros en el tapiz.
- **Croquis de la Sucursal:** Mapa vectorial que ubica el local en la **Calle 15 de Abril esq. Daniel Campos** (referencias: Plazuela Sucre, Parque Bolívar).
- **Delivery y Pago QR:** Teléfono boliviano de contacto y maqueta de pago con **QR Simple Bolivia**.
- **Footer y Redes Sociales:** Enlaces oficiales a Instagram (`@bobaboom.tarija`), TikTok (`@bobaboom_tarija`) y Facebook (`BobaBoom Tarija`).

---

## ⚡ 3. Lógica Interactiva (`js/app.js`)

El archivo JavaScript gestiona todo el comportamiento del sitio:
- **Catálogo de Productos:** Arreglo `PRODUCTS` con 6 especialidades y precios en Bolivianos (`Bs. 18` a `Bs. 38`).
- **Filtrado por Categorías:** Filtra en tiempo real entre *Todos*, *Boba Tea*, *Postres de Michi* y *Combos*.
- **Carrito de Compras:**
  - Agregar productos y modificar cantidades (+ / -).
  - Cálculo automático de subtotales y total general en Bs.
  - Persistencia en el navegador mediante `localStorage`.
- **Integración con WhatsApp:**
  - Envía la orden formateada con la lista de productos, total, dirección de entrega y modalidad (*Delivery Tarija* o *Retiro en Sucursal*) directamente a la línea oficial **`+591 76194820`**.
- **Feedback Visual:** Notificaciones flotantes tipo *Toast* al agregar postres a la canasta.

---

## 🚀 Cómo Ejecutar y Probar

Abre [index.html](./index.html) en un navegador web o visita la demo publicada:

https://srgreda.github.io/portafolio/negocios%20de%20comida/bobaboom-tarija-codediv/
