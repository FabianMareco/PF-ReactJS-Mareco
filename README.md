# 🧘 MUEVETE – E‑commerce con React + Vite

> E‑commerce funcional desarrollado con React, Vite, React Router, Context API y Firebase.  
> Permite navegar por productos de merchandising y packs de clases, agregar al carrito y finalizar compra.

## 🚀 Tecnologías usadas

- **React 18** + Vite  
- **React Router DOM** (rutas dinámicas)  
- **Context API** (estado global del carrito)  
- **Firebase** (Firestore para productos y órdenes)  
- **Bootstrap 5** + estilos personalizados  
- **SweetAlert2** + Toastify (notificaciones)  
- **AOS** (animaciones al scroll)  

## 📁 Estructura del proyecto (versión final)
src/
├── components/
│ ├── Navbar.jsx
│ ├── CartWidget.jsx
│ ├── ItemListContainer.jsx
│ ├── ItemList.jsx
│ ├── Item.jsx
│ ├── ItemDetailContainer.jsx
│ ├── ItemDetail.jsx
│ ├── ItemCount.jsx
│ └── Cart.jsx
├── context/
│ └── CartContext.jsx
├── services/
│ ├── firebase.js
│ └── firestore.js
├── pages/
│ ├── Home.jsx
│ ├── Clases.jsx
│ ├── Merchandising.jsx
│ ├── Nosotros.jsx
│ ├── Contactanos.jsx
│ └── IngresoPlataforma.jsx
├── styles/
│ └── global.css
├── data/
│ └── packs.json
└── App.jsx / main.jsx

text

## 🔧 Instalación y configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/muevete-react-ecommerce.git
cd muevete-react-ecommerce
2. Instalar dependencias
bash
npm install
3. Configurar Firebase
Crea un proyecto en Firebase Console

Habilita Firestore Database (modo prueba)

Copia la configuración del SDK web

Crea un archivo .env en la raíz:

env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
4. Subir productos a Firestore
Ejecuta el script (necesitas el archivo serviceAccountKey.json desde Firebase):

bash
node scripts/uploadProducts.js
5. Ejecutar en desarrollo
bash
npm run dev
6. Construir para producción
bash
npm run build
✨ Funcionalidades principales
✅ Catálogo de productos (merchandising y packs) desde Firestore

✅ Detalle de producto con selector de cantidad (talles para ropa y zapatillas)

✅ Carrito de compras global (Context)

✅ Finalizar compra → genera orden en Firestore y actualiza stock

✅ Página de Clases (packs de movimiento y nutrición) con scroll suave a packs

✅ Filtro por categorías en merchandising

✅ Footer con redes sociales

✅ Diseño responsive con Bootstrap

🎯 Entrega final
Repositorio GitHub con código limpio y comentado

GIF/Video mostrando navegabilidad (Home, catálogo, detalle, carrito, checkout)

Proyecto desplegado en Vercel (opcional, pero recomendado)