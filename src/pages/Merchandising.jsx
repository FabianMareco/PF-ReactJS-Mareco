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
    { id: "todos", name: "Todos", icon: "🛍️" },
    { id: "tazas", name: "Tazas", icon: "☕" },
    { id: "remeras", name: "Remeras", icon: "👕" },
    { id: "bolsos", name: "Bolsos", icon: "👜" },
    { id: "hidratarse", name: "Hidratación", icon: "💧" },
    { id: "zapatillas", name: "Zapatillas", icon: "👟" },
    { id: "elemento", name: "Elementos Yoga", icon: "🧘" }
  ];

  // Orden personalizado de productos
  const productOrder = [
    "TAZA 1", "TAZA 2", "TAZA 3",
    "REMERA 1", "REMERA 2", "REMERA 3",
    "BOLSO 1", "BOLSO 2", "BOLSO 3",
    "BOTELLA 1", "BOTELLA 2", "BOTELLA 3",
    "BALLET MODELO 1", "BALLROOM MODELO 2", "JAZZ MODELO 3",
    "MAT YOGA", "PESAS 2 KG", "LADRILLO YOGA"
  ];

  useEffect(() => {
    getProducts("merchandising")
  .then(data => {
    // Eliminar duplicados por nombre antes de guardar en estado
    const vistos = new Set();
    const unicos = data.filter(p => {
      const key = p.name.trim().toUpperCase();
      if (vistos.has(key)) return false;
      vistos.add(key);
      return true;
    });

    const sortedData = [...unicos].sort((a, b) => {
      const indexA = productOrder.indexOf(a.name);
      const indexB = productOrder.indexOf(b.name);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    setAllProducts(sortedData);
    setFilteredProducts(sortedData);
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
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [activeCategory, searchTerm, allProducts]);

  if (loading) return <div className="text-center mt-5">Cargando productos...</div>;

  const grouped = {};
  filteredProducts.forEach(p => {
    if (!grouped[p.subcategory]) grouped[p.subcategory] = [];
    grouped[p.subcategory].push(p);
  });

  const categoryNames = {
    tazas: "☕ Tazas",
    remeras: "👕 Remeras Oversize",
    bolsos: "👜 Bolsos",
    hidratarse: "💧 Hidratación",
    zapatillas: "👟 Zapatillas de Danza",
    elemento: "🧘 Elementos para Yoga"
  };

  return (
    <>
      <div className="container my-4">
        <h2 className="text-center">✨ Merchandising Store ✨</h2>
        <p className="text-center mb-4">Todo lo que necesitas para acompañar tu movimiento</p>

        <div className="row justify-content-center mb-4">
          <div className="col-md-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="🔍 Buscar productos..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`btn ${activeCategory === cat.id ? "btn-danger" : "btn-outline-danger"} rounded-pill`} 
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {Object.keys(grouped).map(subcat => (
          <div key={subcat} className="mb-5">
            <h4 className="text-center mt-4 mb-3" style={{ 
              background: "linear-gradient(90deg, #dc3545, #b02a37)", 
              color: "white", 
              padding: "10px 25px", 
              borderRadius: "30px", 
              display: "inline-block", 
              width: "auto", 
              margin: "0 auto 20px auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
            }}>
              {categoryNames[subcat]}
            </h4>
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