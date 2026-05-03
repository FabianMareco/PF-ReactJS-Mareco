import { useState } from 'react';
import AddItemButton from './AddItemButton';

export default function ItemCount({ stock, initial = 1, onAdd, disabled = false }) {
  const [count, setCount] = useState(initial);
  const increment = () => count < stock && setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  return (
    <div className="d-flex flex-column align-items-center gap-3 my-4">
      <div className="d-flex align-items-center overflow-hidden border border-danger rounded-pill">
        <button onClick={decrement} disabled={count <= 1} className="btn btn-outline-danger border-0 rounded-0 px-3" style={{ fontSize: '20px', fontWeight: 'bold' }}>−</button>
        <span className="px-3 fw-bold fs-5">{count}</span>
        <button onClick={increment} disabled={count >= stock} className="btn btn-outline-danger border-0 rounded-0 px-3" style={{ fontSize: '20px', fontWeight: 'bold' }}>+</button>
      </div>
      <AddItemButton count={count} stock={stock} onAdd={onAdd} disabled={disabled} />
      <p className="text-muted small mb-0">Stock disponible: <strong>{stock}</strong></p>
    </div>
  );
}
