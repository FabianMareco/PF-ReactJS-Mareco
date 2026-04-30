import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const FloatingCart = () => {
  const { totalItems } = useCart();
  if (totalItems === 0) return null;
  return (
    <Link to="/cart" className="btn btn-danger position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg" style={{ width: "60px", height: "60px", fontSize: "24px", zIndex: 1050 }}>
      🛒 <span className="badge bg-light text-dark position-absolute top-0 start-100 translate-middle rounded-pill">{totalItems}</span>
    </Link>
  );
};

export default FloatingCart;