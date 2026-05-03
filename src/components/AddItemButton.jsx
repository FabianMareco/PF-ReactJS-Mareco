const AddItemButton = ({ count, stock, onAdd, disabled = false }) => {
  const isDisabled = stock === 0 || disabled;
  return (
    <button
      onClick={() => !isDisabled && onAdd(count)}
      disabled={isDisabled}
      className="btn btn-danger rounded-pill px-4 fw-bold"
      style={{
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.15s',
      }}
      onMouseEnter={e => { if (!isDisabled) e.currentTarget.style.transform = 'scale(1.05)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      🛒 Agregar al carrito ({count})
    </button>
  );
};

export default AddItemButton;
