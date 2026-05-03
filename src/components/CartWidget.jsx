import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartWidget() {
  const { totalItems } = useCart();
  if (totalItems === 0) return null;
  return (
    <Link to="/cart" className="btn btn-outline-light position-relative ms-3">
      🛒
      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger fw-bold">
        {totalItems}
      </span>
    </Link>
  );
}
