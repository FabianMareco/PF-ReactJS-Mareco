import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ItemCount from './ItemCount';
import Description from './Description';
import { Link } from 'react-router-dom';

const TALLES_REMERA    = ['S', 'M', 'L', 'XL'];
const TALLES_ZAPATILLA = ['35', '36', '37', '38', '39', '40', '41', '42'];

const ItemDetail = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? null);
  const [selectedTalle, setSelectedTalle] = useState(null);
  const { addItem } = useCart();

  const isRemera    = product.subcategory === 'remeras';
  const isZapatilla = product.subcategory === 'zapatillas';
  const needsTalle  = isRemera || isZapatilla;
  const talles      = isRemera ? TALLES_REMERA : TALLES_ZAPATILLA;
  const currentImage = selectedColor ? selectedColor.pictureUrl : product.pictureUrl;

  const handleOnAdd = (quantity) => {
    if (needsTalle && !selectedTalle) return;
    addItem({
      ...product,
      name: `${product.name}${selectedColor ? ` – ${selectedColor.name}` : ''}${selectedTalle ? ` (T. ${selectedTalle})` : ''}`,
      pictureUrl: currentImage,
    }, quantity);
    setQuantityAdded(quantity);
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-6 d-flex flex-column align-items-center gap-3">
          <img src={currentImage} className="img-fluid rounded shadow" alt={product.name} style={{ maxHeight: '420px', objectFit: 'contain' }} />
          {isRemera && product.colors?.length > 0 && (
            <div className="d-flex flex-column align-items-center gap-2">
              <span className="fw-bold small text-muted">Color: <strong>{selectedColor?.name}</strong></span>
              <div className="d-flex gap-2">
                {product.colors.map((color, i) => (
                  <button key={i} onClick={() => setSelectedColor(color)}
                    className={`btn btn-sm ${selectedColor?.name === color.name ? 'btn-danger' : 'btn-outline-secondary'} rounded-pill`}
                    style={{ minWidth: '80px' }}>
                    {color.name}
                  </button>
                ))}
              </div>
              <div className="d-flex gap-2 mt-1">
                {product.colors.map((color, i) => (
                  <img key={i} src={color.pictureUrl} alt={color.name} onClick={() => setSelectedColor(color)}
                    style={{ width: '60px', height: '60px', objectFit: 'contain', cursor: 'pointer', borderRadius: '8px',
                      border: selectedColor?.name === color.name ? '2px solid #dc3545' : '2px solid transparent', transition: 'border 0.2s' }} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <h1>{product.name}</h1>
          <Description description={product.description} />
          <h3 className="text-danger my-3">💰 ${product.price?.toLocaleString()}</h3>
          {needsTalle && (
            <div className="mb-4">
              <p className="fw-bold mb-2">
                {isZapatilla ? '👟 Talle:' : '📏 Talle:'}{' '}
                {selectedTalle ? <span className="text-danger">{selectedTalle}</span> : <span className="text-muted small">Seleccioná un talle</span>}
              </p>
              <div className="d-flex flex-wrap gap-2">
                {talles.map(t => (
                  <button key={t} onClick={() => setSelectedTalle(t)}
                    className={`btn btn-sm fw-bold ${selectedTalle === t ? 'btn-danger' : 'btn-outline-danger'}`}
                    style={{ minWidth: '48px' }}>{t}</button>
                ))}
              </div>
              {!selectedTalle && <p className="text-danger small mt-2">⚠️ Seleccioná un talle para continuar</p>}
            </div>
          )}
          {quantityAdded === 0 ? (
            <ItemCount stock={product.stock} initial={1} onAdd={handleOnAdd} disabled={needsTalle && !selectedTalle} />
          ) : (
            <div className="d-flex flex-column gap-2 mt-3">
            <Link to="/cart" className="btn btn-success w-100 fw-bold fs-5">🛒 Terminar mi compra</Link>
            <Link to="/merchandising" className="btn btn-outline-danger w-100 fw-bold">🛍️ Seguir comprando</Link>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ItemDetail;
