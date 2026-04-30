import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import FloatingCart from "./components/FloatingCart";
import Home from "./pages/Home";
import Nosotros from "./pages/Nosotros";
import Clases from "./pages/Clases";
import Contactanos from "./pages/Contactanos";
import IngresoPlataforma from "./pages/IngresoPlataforma";
import Merchandising from "./pages/Merchandising";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/contactanos" element={<Contactanos />} />
          <Route path="/ingreso" element={<IngresoPlataforma />} />
          <Route path="/merchandising" element={<Merchandising />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <FloatingCart />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;