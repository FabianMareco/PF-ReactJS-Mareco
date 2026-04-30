// src/services/firestore.js
import { db } from "./firebase";
import { collection, getDocs, getDoc, doc, addDoc, query, where, Timestamp } from "firebase/firestore";

const productsCollection = collection(db, "products");

// Obtener productos (por categoría opcional)
export const getProducts = async (categoryId) => {
  let q = productsCollection;
  if (categoryId) {
    q = query(productsCollection, where("category", "==", categoryId));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  throw new Error("Producto no encontrado");
};

// Crear una orden de compra
export const createOrder = async (order) => {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    date: Timestamp.now(),
  });
  return docRef.id;
};