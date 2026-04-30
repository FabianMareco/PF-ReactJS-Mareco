import { useCart } from "../context/CartContext";

export default function CartWidget() {
  const { totalItems } = useCart();
  if (totalItems === 0) return null;
  return (
    <Link href="/cart" className="relative">
      <span className="text-2xl">🛒</span>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  );
}