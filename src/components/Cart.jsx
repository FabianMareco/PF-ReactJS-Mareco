import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../services/firestore";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
 
const toast = (text, color = "#4caf50") =>
  Toastify({ text, duration: 3000, gravity: "top", position: "right", style: { background: color } }).showToast();
 
export default function Cart() {
  const { cart, removeItem, clearCart, totalPrice } = useCart();
  const [buyer, setBuyer]     = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null); // guarda {id, items, total, buyer}
  const navigate = useNavigate();
 
  const handleClear = () => {
    Swal.fire({
      title: "¿Vaciar el carrito?",
      text: "Se eliminarán todos los productos agregados.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.isConfirmed) {
        clearCart();
        localStorage.removeItem("cart");
        toast("Carrito vaciado", "#ff9800");
      }
    });
  };
 
  const handleRemove = (id, name) => {
    Swal.fire({
      title: "¿Eliminar producto?",
      html: `¿Querés quitar <strong>${name}</strong> del carrito?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      if (result.isConfirmed) {
        removeItem(id);
        toast(`"${name}" eliminado`, "#f44336");
      }
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyer.name || !buyer.phone || !buyer.email) { toast("Completá todos los datos", "#f44336"); return; }
    if (!buyer.email.includes("@")) { toast("Email inválido", "#f44336"); return; }
    setLoading(true);
    const snapshot = [...cart]; // guardar antes de limpiar
    try {
      const order = {
        buyer,
        items: snapshot.map(item => ({ id: item.id, title: item.name, quantity: item.quantity, price: item.price })),
        total: totalPrice,
      };
      const id = await createOrder(order);
      clearCart();
      localStorage.removeItem("cart");
      setOrderData({ id, items: snapshot, total: totalPrice, buyer });
    } catch (error) {
      console.error(error);
      toast("Error al procesar la compra", "#f44336");
    } finally {
      setLoading(false);
    }
  };
 
  // --- Pantalla de confirmación completa ---
  if (orderData) {
    return (
      <div className="container my-5" style={{ maxWidth: "650px" }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: "64px" }}>✅</div>
          <h2 className="text-success fw-bold">¡Gracias por tu compra!</h2>
          <p className="text-muted">Tu pedido fue registrado correctamente.</p>
        </div>
 
        <div className="card border-success shadow-sm mb-4">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <span className="fw-bold">📋 Resumen de la orden</span>
            <span className="badge bg-light text-success fw-bold">#{orderData.id.slice(-8).toUpperCase()}</span>
          </div>
          <div className="card-body p-0">
            <table className="table table-sm mb-0">
              <thead className="table-light">
                <tr><th>Producto</th><th className="text-center">Cant.</th><th className="text-end">Subtotal</th></tr>
              </thead>
              <tbody>
                {orderData.items.map((item, i) => (
                  <tr key={i}>
                    <td>
                      {item.name}
                      {item.esRegalo && (
                        <span className="badge bg-warning text-dark ms-2">
                          🎁{item.nombreRegalo ? ` ${item.nombreRegalo}` : ""}
                        </span>
                      )}
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-success">
                  <td colSpan="2" className="fw-bold text-end">TOTAL:</td>
                  <td className="fw-bold text-end text-success fs-5">${orderData.total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
 
        <div className="card border-0 bg-light shadow-sm mb-4">
          <div className="card-body">
            <h6 className="fw-bold mb-3">👤 Datos del comprador</h6>
            <p className="mb-1"><strong>Nombre:</strong> {orderData.buyer.name}</p>
            <p className="mb-1"><strong>Teléfono:</strong> {orderData.buyer.phone}</p>
            <p className="mb-0"><strong>Email:</strong> {orderData.buyer.email}</p>
          </div>
        </div>
 
        <div className="alert alert-info text-center">
          <strong>N° de orden completo:</strong><br />
          <code className="fs-6">{orderData.id}</code><br />
          <small>Guardá este número para hacer seguimiento de tu pedido.</small>
        </div>
 
        <div className="d-flex gap-3 justify-content-center mt-3">
          <button className="btn btn-danger px-4" onClick={() => navigate("/")}>🏠 Volver al inicio</button>
          <button className="btn btn-outline-danger px-4" onClick={() => navigate("/merchandising")}>🛍️ Seguir comprando</button>
        </div>
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
          <tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th><th></th></tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>
                {item.name}
                {item.esRegalo && (
                  <span className="badge bg-warning text-dark ms-2">
                    🎁 Regalo{item.nombreRegalo ? ` para ${item.nombreRegalo}` : ""}
                  </span>
                )}
              </td>
              <td>{item.quantity}</td>
              <td>${item.price?.toLocaleString()}</td>
              <td>${(item.price * item.quantity)?.toLocaleString()}</td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(item.id, item.name)}>🗑️</button></td>
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
        <button className="btn btn-warning" onClick={handleClear}>🗑️ Vaciar carrito</button>
        <form onSubmit={handleSubmit} className="flex-grow-1" style={{ maxWidth: "500px" }}>
          <h4 className="mb-3">Datos del comprador</h4>
          <div className="mb-3"><input type="text" className="form-control" placeholder="Nombre completo" value={buyer.name} onChange={e => setBuyer({ ...buyer, name: e.target.value })} required /></div>
          <div className="mb-3"><input type="tel" className="form-control" placeholder="Teléfono" value={buyer.phone} onChange={e => setBuyer({ ...buyer, phone: e.target.value })} required /></div>
          <div className="mb-3"><input type="email" className="form-control" placeholder="Email" value={buyer.email} onChange={e => setBuyer({ ...buyer, email: e.target.value })} required /></div>
          <button type="submit" className="btn btn-success w-100 fw-bold" disabled={loading}>
            {loading ? "⏳ Procesando..." : "✅ Finalizar compra"}
          </button>
        </form>
      </div>
    </div>
  );
}
 