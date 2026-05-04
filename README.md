# 🧘 MUEVETE – E-commerce con React + Vite

E-commerce funcional desarrollado como proyecto final del curso de React JS en CoderHouse.
Orientado a la venta de merchandising y packs de clases de movimiento y nutrición.

## 🌐 Demo en producción

🔗 **[pf-react-js-mareco.vercel.app](https://pf-react-js-mareco.vercel.app)**

> 📹 **Video demo:** *(https://drive.google.com/file/d/1aQC0dfFFsRYGodSB5qFjSo_-khpku0p4/view?usp=drive_link)*

---

## 🚀 Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| React Router DOM | Navegación y rutas dinámicas |
| Context API | Estado global del carrito |
| Firebase Auth | Autenticación email/contraseña y Google OAuth |
| Firebase / Firestore | Base de datos de productos y órdenes |
| Bootstrap 5 | Estilos y diseño responsive |
| SweetAlert2 + Toastify | Notificaciones de usuario |
| AOS | Animaciones al hacer scroll |

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── CartWidget.jsx
│   ├── FloatingCart.jsx
│   ├── ScrollToTop.jsx
│   ├── ItemListContainer.jsx
│   ├── ItemList.jsx
│   ├── Item.jsx
│   ├── ItemDetailContainer.jsx
│   ├── ItemDetail.jsx
│   ├── ItemCount.jsx
│   ├── AddItemButton.jsx
│   ├── Description.jsx
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
├── scripts/
│   ├── uploadAllData.mjs
│   └── checkFirestore.mjs
├── styles/
│   └── global.css
├── data/
│   └── packs.json
└── App.jsx / main.jsx
```

---

## 🔧 Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/FabianMareco/PF-ReactJS-Mareco.git
cd PF-ReactJS-Mareco
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilitar **Firestore Database** y **Authentication** (Email/Password + Google)
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
npm install firebase-admin --save-dev
node src/scripts/uploadAllData.mjs
```

> Requiere el archivo `serviceAccountKey.json` descargado desde Firebase Console → Configuración del proyecto → Cuentas de servicio.

### 5. Iniciar en modo desarrollo

```bash
npm run dev
```

### 6. Build para producción

```bash
npm run build
```

---

## ☁️ Deploy en Vercel

El proyecto está configurado para deploy automático en Vercel con `vercel.json` para soporte de React Router SPA.

**Variables de entorno requeridas en Vercel:**

| Variable | Descripción |
|---|---|
| `VITE_FIREBASE_API_KEY` | API Key de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain del proyecto |
| `VITE_FIREBASE_PROJECT_ID` | ID del proyecto |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Sender ID |
| `VITE_FIREBASE_APP_ID` | App ID |

> ⚠️ Recordá agregar el dominio de Vercel en Firebase Console → Authentication → Dominios autorizados para que Google OAuth funcione en producción.

---

## ✨ Funcionalidades

- 🛍️ Catálogo de productos con datos desde Firestore separados por subcategorías
- 🔍 Filtro por categoría y búsqueda en tiempo real en Merchandising
- 👕 Selector de color para remeras y selector de talle para remeras y zapatillas
- 🛒 Carrito global con Context API (`addItem`, `removeItem`, `clearCart`, `isInCart`)
- ✅ Checkout con form de comprador, generación de orden en Firestore y resumen completo
- 🔐 Autenticación con email/contraseña y Google OAuth (Firebase Auth)
- 💃 Página de Clases con packs de movimiento y nutrición, opción de regalo con nombre
- 📬 Formulario de contacto con validación y confirmación via SweetAlert2
- 🔝 Botón flotante para volver al inicio de página
- 📱 Diseño responsive con Bootstrap 5

---

## 👤 Autor

**Fabián Mareco** – Proyecto Final React JS – CoderHouse 2026