// TotalDisplay.jsx
export default function TotalDisplay({ total }) {
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "16px",
        backgroundColor: "#e8f5e9",
        borderRadius: "8px",
        textAlign: "center",
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      Total: Rp{total.toLocaleString("id-ID")}
    </div>
  );
}
