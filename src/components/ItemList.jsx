import Item from "./Item";

const ItemList = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className="text-center mt-5">No hay productos disponibles.</div>;
  }

  return (
    <div className="products-grid">
      {items.map(item => (
        <Item 
          key={item.id} 
          id={item.id}
          name={item.name}
          price={item.price}
          pictureUrl={item.pictureUrl}
          subcategory={item.subcategory}
        />
      ))}
    </div>
  );
};

export default ItemList;