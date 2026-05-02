# 🧘 MUEVETE – E-commerce con React + Vite

E-commerce funcional desarrollado como proyecto integrador, orientado a la venta de
merchandising y packs de clases de movimiento y nutrición.

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| React Router DOM | Navegación y rutas dinámicas |
| Context API | Estado global del carrito |
| Firebase / Firestore | Base de datos de productos y órdenes |
| Bootstrap 5 | Estilos y diseño responsive |
| SweetAlert2 + Toastify | Notificaciones de usuario |
| AOS | Animaciones al hacer scroll |

## 📁 Estructura del proyecto
src/
├── components/
│   ├── Navbar.jsx
│   ├── CartWidget.jsx
│   ├── ItemListContainer.jsx
│   ├── ItemList.jsx
│   ├── Item.jsx
│   ├── ItemDetailContainer.jsx
│   ├── ItemDetail.jsx
│   ├── ItemCount.jsx
│   └── Cart.jsx
├── context/
│   └── CartContext.jsx
├── services/
│   ├── firebase.js
│   └── firestore.js
├── pages/
│   ├── Home.jsx
│   ├── Clases.jsx
│   ├── Merchandising.jsx
│   ├── Nosotros.jsx
│   ├── Contactanos.jsx
│   └── IngresoPlataforma.jsx
├── styles/
│   └── global.css
├── data/
│   └── packs.json
└── App.jsx / main.jsx

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/muevete-react-ecommerce.git
cd muevete-react-ecommerce
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar **Firestore Database** (modo prueba)
3. Copiar la configuración del SDK web y crear un archivo `.env` en la raíz:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Cargar productos en Firestore

```bash
node scripts/uploadProducts.js
```

> Requiere el archivo `serviceAccountKey.json` descargado desde la consola de Firebase.

### 5. Iniciar en modo desarrollo

```bash
npm run dev
```

### 6. Build para producción

```bash
npm run build
```

## ✨ Funcionalidades

- 🛍️ Catálogo de productos con datos desde Firestore (merchandising y packs)
- 🔍 Detalle de producto con selector de cantidad y talle (ropa y zapatillas)
- 🛒 Carrito global con Context API
- ✅ Checkout con generación de orden en Firestore y actualización de stock
- 🏋️ Página de Clases con scroll suave hacia los packs disponibles
- 🏷️ Filtro por categorías en la sección de merchandising
- 📱 Diseño responsive con Bootstrap 5
