import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../services/firestore";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const toast = (text, color = "#4caf50") =>
  Toastify({ text, duration: 3000, gravity: "top", position: "right", style: { background: color } }).showToast();

export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice } = useCart();
  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  const handleClear = () => {
    if (window.confirm("¿Vaciar todo el carrito?")) {
      clearCart();
      localStorage.removeItem("cart");
      toast("Carrito vaciado", "#ff9800");
    }
  };

  const handleRemove = (id, name) => {
    removeItem(id);
    toast(`"${name}" eliminado`, "#f44336");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyer.name || !buyer.phone || !buyer.email) {
      toast("Completá todos los datos", "#f44336");
      return;
    }
    if (!buyer.email.includes("@")) {
      toast("Email inválido", "#f44336");
      return;
    }

    setLoading(true);
    try {
      const order = {
        buyer,
        items: cart.map(item => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: totalPrice,
      };

      const id = await createOrder(order);
      setOrderId(id);
      clearCart();
      localStorage.removeItem("cart");
    } catch (error) {
      console.error(error);
      toast("Error al procesar la compra", "#f44336");
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de éxito
  if (orderId) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-success">✅ ¡Gracias por tu compra!</h2>
        <p className="lead">Tu número de orden es:</p>
        <h3 className="text-danger fw-bold">{orderId}</h3>
        <p>Guardá este número para hacer seguimiento de tu pedido.</p>
        <button className="btn btn-danger mt-3" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h2>🛒 Tu carrito está vacío</h2>
        <Link to="/merchandising" className="btn btn-danger mt-3">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">🛒 Carrito de compras</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price?.toLocaleString()}</td>
              <td>${(item.price * item.quantity)?.toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRemove(item.id, item.name)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-end fw-bold">Total:</td>
            <td className="fw-bold text-danger">${totalPrice?.toLocaleString()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div className="d-flex justify-content-between align-items-start gap-4 flex-wrap mt-4">
        <button className="btn btn-warning" onClick={handleClear}>
          🗑️ Vaciar carrito
        </button>

        <form onSubmit={handleSubmit} className="flex-grow-1" style={{ maxWidth: "500px" }}>
          <h4 className="mb-3">Datos del comprador</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre completo"
              value={buyer.name}
              onChange={e => setBuyer({ ...buyer, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Teléfono"
              value={buyer.phone}
              onChange={e => setBuyer({ ...buyer, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={buyer.email}
              onChange={e => setBuyer({ ...buyer, email: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            disabled={loading}
          >
            {loading ? "⏳ Procesando..." : "✅ Finalizar compra"}
          </button>
        </form>
      </div>
    </div>
  );
}