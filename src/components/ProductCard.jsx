import { Link } from "react-router-dom";

export default function ProductCard({ id, name, price, pictureUrl, subcategory }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-48 flex items-center justify-center p-4">
        <img src={pictureUrl} alt={name} className="object-contain h-full" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-center">{name}</h3>
        <p className="text-center font-bold text-red-600 mt-2">💰 ${price?.toLocaleString()}</p>
        <Link to={`/item/${id}`} className="mt-4 bg-red-600 hover:bg-red-700 text-white text-center py-2 rounded block">
          Ver detalle
        </Link>
      </div>
    </div>
  );
}