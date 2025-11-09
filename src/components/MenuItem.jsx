// MenuItem.jsx
export default function MenuItem({ item, onAdd }) {
  return (
    <div
      onClick={() => onAdd(item)}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        cursor: "pointer",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#e0f7fa")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#f9f9f9")}
    >
      <h3>{item.name}</h3>
      <p>Rp{item.price.toLocaleString("id-ID")}</p>
    </div>
  );
}
