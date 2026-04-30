// src/scripts/UploadProducts.jsx
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const productos = [
  // TAZAS
  { name: "TAZA 1", price: 10000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 1", pictureUrl: "/multimedia/merchandising2/taza1.jpg" },
  { name: "TAZA 2", price: 12000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 2", pictureUrl: "/multimedia/merchandising2/taza2.jpg" },
  { name: "TAZA 3", price: 20000, stock: 50, category: "merchandising", subcategory: "tazas", description: "Taza modelo 3", pictureUrl: "/multimedia/merchandising2/taza3.jpeg" },
  // REMERAS
  { name: "REMERA 1", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize 1", pictureUrl: "/multimedia/merchandising2/remera1.jpeg" },
  { name: "REMERA 2", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize 2", pictureUrl: "/multimedia/merchandising2/remera2.jpg" },
  { name: "REMERA 3", price: 40000, stock: 50, category: "merchandising", subcategory: "remeras", description: "Remera oversize 3", pictureUrl: "/multimedia/merchandising2/remera3.jpg" },
  // BOLSOS
  { name: "BOLSO 1", price: 65000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso ecológico", pictureUrl: "/multimedia/merchandising2/bolso1.jpeg" },
  { name: "BOLSO 2", price: 75000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Bolso con cierre", pictureUrl: "/multimedia/merchandising2/bolso2.jpg" },
  { name: "BOLSO 3", price: 25000, stock: 20, category: "merchandising", subcategory: "bolsos", description: "Morral", pictureUrl: "/multimedia/merchandising2/bolso3.jpg" },
  // BOTELLAS
  { name: "BOTELLA 1", price: 35000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Térmica", pictureUrl: "/multimedia/merchandising2/botella1.jpeg" },
  { name: "BOTELLA 2", price: 45000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Deportiva", pictureUrl: "/multimedia/merchandising2/botella2.jpeg" },
  { name: "BOTELLA 3", price: 25000, stock: 25, category: "merchandising", subcategory: "hidratarse", description: "Plegable", pictureUrl: "/multimedia/merchandising2/botella3.jpg" },
  // ZAPATILLAS
  { name: "BALLET MODELO 1", price: 99000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Ballet punta", pictureUrl: "/multimedia/merchandising2/zapatilla1.jpg" },
  { name: "BALLROOM MODELO 2", price: 125000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Baile social", pictureUrl: "/multimedia/merchandising2/zapatilla2.jpg" },
  { name: "JAZZ MODELO 3", price: 150000, stock: 25, category: "merchandising", subcategory: "zapatillas", description: "Jazz suela", pictureUrl: "/multimedia/merchandising2/zapatilla3.jpeg" },
  // ELEMENTOS
  { name: "MAT YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Mat antideslizante", pictureUrl: "/multimedia/merchandising2/mat.jpg" },
  { name: "PESAS 2 KG", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Par de pesas", pictureUrl: "/multimedia/merchandising2/pesas.jpg" },
  { name: "LADRILLO YOGA", price: 45000, stock: 50, category: "merchandising", subcategory: "elemento", description: "Bloque espuma", pictureUrl: "/multimedia/merchandising2/ladrillo.jpg" }
];

const UploadProducts = () => {
  const [status, setStatus] = useState("Subiendo productos...");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const subirProductos = async () => {
      try {
        const col = collection(db, "products");
        let count = 0;
        
        for (const p of productos) {
          await addDoc(col, p);
          count++;
          setStatus(`Subiendo: ${count}/${productos.length} - ${p.name}`);
        }
        
        setStatus(`✅ ¡Éxito! Se subieron ${productos.length} productos a Firestore`);
        setCompleted(true);
      } catch (error) {
        console.error("Error:", error);
        setStatus(`❌ Error: ${error.message}`);
      }
    };
    
    subirProductos();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1>Subiendo productos a Firestore</h1>
      <p>{status}</p>
      {completed && (
        <button onClick={() => window.location.href = "/"} style={{ marginTop: "20px", padding: "10px 20px" }}>
          Ir a la tienda
        </button>
      )}
    </div>
  );
};

export default UploadProducts;