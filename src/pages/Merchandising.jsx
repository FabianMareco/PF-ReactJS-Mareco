import { useState, useEffect } from "react";
import { getProducts } from "../services/firestore";
import ItemList from "../components/ItemList";

const Merchandising = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  const categories = [
    { id: "todos",        name: "Todos",        icon: "🛍️" },
    { id: "tazas",        name: "Tazas",        icon: "☕" },
    { id: "remeras",      name: "Remeras",      icon: "👕" },
    { id: "bolsos",       name: "Bolsos",       icon: "👜" },
    { id: "botellas",     name: "Botellas",     icon: "💧" },
    { id: "zapatillas",   name: "Zapatillas",   icon: "👟" },
    { id: "equipamiento", name: "Equipamiento", icon: "🧘" },
  ];

  const categoryNames = {
    tazas:        "☕ Tazas",
    remeras:      "👕 Remeras Oversize",
    bolsos:       "👜 Bolsos",
    botellas:     "💧 Botellas",
    zapatillas:   "👟 Zapatillas de Danza",
    equipamiento: "🧘 Equipamiento",
  };

  useEffect(() => {
    getProducts("merchandising")
      .then(data => {
        const vistos = new Set();
        const unicos = data.filter(p => {
          const key = p.name.trim().toUpperCase();
          if (vistos.has(key)) return false;
          vistos.add(key);
          return true;
        });
        const sorted = [...unicos].sort((a, b) => {
  if (a.subcategory !== b.subcategory) return a.subcategory.localeCompare(b.subcategory);
  return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
});
setAllProducts(sorted);
setFilteredProducts(sorted);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = allProducts;
    if (activeCategory !== "todos") {
      filtered = filtered.filter(p => p.subcategory === activeCategory);
    }
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, allProducts]);

  if (loading) return <div className="text-center mt-5">Cargando productos...</div>;

  const subcategoryOrder = categories.map(c => c.id).filter(id => id !== "todos");
  const grouped = {};
  filteredProducts.forEach(p => {
    if (!grouped[p.subcategory]) grouped[p.subcategory] = [];
    grouped[p.subcategory].push(p);
  });
  const orderedKeys = subcategoryOrder.filter(k => grouped[k]);

  return (
    <>
      <div className="container my-4">
        <h3>✨ Merchandising Store ✨</h3>
        <p className="text-center mb-4">Todo lo que necesitas para acompañar tu movimiento</p>
        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input type="text" className="form-control" placeholder="🔍 Buscar productos..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map(cat => (
            <button key={cat.id}
              className={`btn ${activeCategory === cat.id ? "btn-danger" : "btn-outline-danger"} rounded-pill`}
              onClick={() => setActiveCategory(cat.id)}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
        {orderedKeys.map(subcat => (
          <div key={subcat} className="mb-5 text-center">
            <h4 className="category-title mb-4">{categoryNames[subcat] || subcat}</h4>
            <ItemList items={grouped[subcat]} />
          </div>
        ))}
        {filteredProducts.length === 0 && <p className="text-center">No se encontraron productos.</p>}
      </div>
      <footer className="footer-edit bg-danger mt-5">
        <p className="texto-footer">Seguinos en nuestras redes sociales</p>
        <div className="redes">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://www.tiktok.com/es/" target="_blank" rel="noreferrer"><i className="fa-brands fa-tiktok"></i></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-youtube"></i></a>
          <a href="https://es-la.facebook.com/" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a>
        </div>
        <p className="texto-footer">todos los derechos reservados por copyright</p>
      </footer>
    </>
  );
};
export default Merchandising;
