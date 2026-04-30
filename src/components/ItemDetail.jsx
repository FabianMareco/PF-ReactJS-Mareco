import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom';

const ItemDetail = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useCart();

  const handleOnAdd = (quantity) => {
    addItem(product, quantity);
    setQuantityAdded(quantity);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.pictureUrl} className="img-fluid" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <h3 className="text-danger">💰 ${product.price?.toLocaleString()}</h3>
          {quantityAdded === 0 ? (
            <ItemCount stock={product.stock} initial={1} onAdd={handleOnAdd} />
          ) : (
            <Link to="/cart" className="btn btn-success w-100 mt-3">
              🛒 Terminar mi compra
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;