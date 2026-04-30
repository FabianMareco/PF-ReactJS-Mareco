import { Link } from "react-router-dom";

const Item = ({ id, name, price, pictureUrl, subcategory }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="d-flex justify-content-center align-items-center p-3" style={{ height: "200px", overflow: "hidden" }}>
        <img 
          src={pictureUrl} 
          className="img-fluid" 
          alt={name} 
          style={{ objectFit: "contain", maxHeight: "100%" }} 
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center">{name}</h5>
        {(subcategory === "remeras" || subcategory === "zapatillas") && (
          <div className="text-center small mb-2">
            {subcategory === "remeras" ? "📏 Talles: S, M, L, XL" : "👟 Talles: 35 al 42"}
          </div>
        )}
        <p className="card-text text-center mt-auto fw-bold">💰 ${price?.toLocaleString()}</p>
        <Link to={`/item/${id}`} className="btn btn-danger mt-2 w-100">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default Item;