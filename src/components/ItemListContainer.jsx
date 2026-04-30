import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/firestore";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    getProducts(categoryId)
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <div className="text-center mt-5">Cargando productos...</div>;

  return (
    <div className="container my-4">
      <h2 className="text-center">{categoryId ? `Categoría: ${categoryId}` : "Todos los productos"}</h2>
      <ItemList items={products} />
    </div>
  );
};

export default ItemListContainer;