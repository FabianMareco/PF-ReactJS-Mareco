import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/firestore";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <div className="text-center mt-5">Cargando...</div>;

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;