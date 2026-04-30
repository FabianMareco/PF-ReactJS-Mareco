import { useState } from 'react';

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial);

  const increment = () => count < stock && setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", margin: "24px 0" }}>
      
      {/* Contador */}
      <div style={{ display: "flex", alignItems: "center", gap: "0", borderRadius: "50px", overflow: "hidden", border: "2px solid #dc3545", width: "fit-content" }}>
        <button
          onClick={decrement}
          disabled={count <= 1}
          style={{
            width: "44px", height: "44px", border: "none", background: count <= 1 ? "#f5f5f5" : "#dc3545",
            color: count <= 1 ? "#aaa" : "white", fontSize: "22px", fontWeight: "bold",
            cursor: count <= 1 ? "not-allowed" : "pointer", transition: "all 0.2s"
          }}
        >
          −
        </button>
        <span style={{
          minWidth: "52px", textAlign: "center", fontSize: "20px", fontWeight: "700",
          background: "white", color: "#333", padding: "0 8px", height: "44px",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {count}
        </span>
        <button
          onClick={increment}
          disabled={count >= stock}
          style={{
            width: "44px", height: "44px", border: "none", background: count >= stock ? "#f5f5f5" : "#dc3545",
            color: count >= stock ? "#aaa" : "white", fontSize: "22px", fontWeight: "bold",
            cursor: count >= stock ? "not-allowed" : "pointer", transition: "all 0.2s"
          }}
        >
          +
        </button>
      </div>

      {/* Botón agregar */}
      <button
        onClick={() => onAdd(count)}
        disabled={stock === 0}
        style={{
          background: stock === 0 ? "#ccc" : "linear-gradient(135deg, #dc3545, #b02a37)",
          color: "white", border: "none", borderRadius: "50px",
          padding: "12px 32px", fontSize: "16px", fontWeight: "700",
          cursor: stock === 0 ? "not-allowed" : "pointer",
          boxShadow: stock === 0 ? "none" : "0 4px 15px rgba(220, 53, 69, 0.4)",
          transition: "all 0.2s", letterSpacing: "0.5px"
        }}
        onMouseEnter={e => { if (stock > 0) e.target.style.transform = "scale(1.05)"; }}
        onMouseLeave={e => { e.target.style.transform = "scale(1)"; }}
      >
        🛒 Agregar al carrito ({count})
      </button>

      <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
        Stock disponible: <strong>{stock}</strong>
      </p>
    </div>
  );
}