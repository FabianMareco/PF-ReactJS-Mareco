// src/scripts/productos-merchandising.js
// ESTE ARCHIVO ES PARA SUBIR PRODUCTOS A FIRESTORE DESDE LA CONSOLA DEL NAVEGADOR

const productos = [
  // TAZAS
  { name: "TAZA 1", price: 10000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 1 - diseño exclusivo", pictureUrl: "/multimedia/merchandising2/taza1.jpg" },
  { name: "TAZA 2", price: 12000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 2 - arte en cerámica", pictureUrl: "/multimedia/merchandising2/taza2.jpg" },
  { name: "TAZA 3", price: 20000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 3 - edición limitada", pictureUrl: "/multimedia/merchandising2/taza3.jpeg" },
  
  // REMERAS
  { name: "REMERA 1", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize modelo 1", pictureUrl: "/multimedia/merchandising2/remera1.jpeg" },
  { name: "REMERA 2", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize modelo 2", pictureUrl: "/multimedia/merchandising2/remera2.jpg" },
  { name: "REMERA 3", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize modelo 3", pictureUrl: "/multimedia/merchandising2/remera3.jpg" },
  
  // BOLSOS
  { name: "BOLSO 1", price: 65000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso modelo 1 - ecológico", pictureUrl: "/multimedia/merchandising2/bolso1.jpeg" },
  { name: "BOLSO 2", price: 75000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso modelo 2 - con cierre", pictureUrl: "/multimedia/merchandising2/bolso2.jpg" },
  { name: "BOLSO 3", price: 25000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso modelo 3 - morral", pictureUrl: "/multimedia/merchandising2/bolso3.jpg" },
  
  // HIDRATACIÓN
  { name: "BOTELLA 1", price: 35000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella térmica modelo 1", pictureUrl: "/multimedia/merchandising2/botella1.jpeg" },
  { name: "BOTELLA 2", price: 45000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella deportiva modelo 2", pictureUrl: "/multimedia/merchandising2/botella2.jpeg" },
  { name: "BOTELLA 3", price: 25000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Botella plegable modelo 3", pictureUrl: "/multimedia/merchandising2/botella3.jpg" },
  
  // ZAPATILLAS
  { name: "BALLET MODELO 1", price: 99000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de ballet - punta", pictureUrl: "/multimedia/merchandising2/zapatilla1.jpg" },
  { name: "BALLROOM MODELO 2", price: 125000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de baile social", pictureUrl: "/multimedia/merchandising2/zapatilla2.jpg" },
  { name: "JAZZ MODELO 3", price: 150000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Zapatillas de jazz", pictureUrl: "/multimedia/merchandising2/zapatilla3.jpeg" },
  
  // ELEMENTOS YOGA
  { name: "MAT YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Mat antideslizante 6mm", pictureUrl: "/multimedia/merchandising2/mat.jpg" },
  { name: "PESAS 2 KG", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Par de pesas de 2 kg", pictureUrl: "/multimedia/merchandising2/pesas.jpg" },
  { name: "LADRILLO YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Bloque de espuma para yoga", pictureUrl: "/multimedia/merchandising2/ladrillo.jpg" }
];

// Exportar para usar en otros archivos
export default productos;

// Función para subir a Firestore (ejecutar en consola del navegador)
export async function subirProductosAFirestore() {
  const { db } = await import('../services/firebase.js');
  const { collection, addDoc } = await import('firebase/firestore');
  
  const productsCol = collection(db, "products");
  for (const p of productos) {
    try {
      const docRef = await addDoc(productsCol, p);
      console.log(`✅ ${p.name} agregado con ID: ${docRef.id}`);
    } catch (error) {
      console.error(`❌ Error con ${p.name}:`, error);
    }
  }
  console.log("🎉 Todos los productos subidos a Firestore");
}