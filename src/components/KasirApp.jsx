// src/components/KasirApp.jsx
import { useState } from "react";
import MenuItem from "./MenuItem";
import OrderList from "./OrderList";
import TotalDisplay from "./TotalDisplay";
import { MENU_CATEGORIES } from "../data/mockData"; // ← Impor kategori

export default function KasirApp() {
  const [orderItems, setOrderItems] = useState([]);

  const handleAddItem = (item) => {
    setOrderItems((prev) => {
      const existingItem = prev.find((order) => order.id === item.id);
      if (existingItem) {
        return prev.map((order) => (order.id === item.id ? { ...order, qty: order.qty + 1 } : order));
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) return;
    setOrderItems((prev) => prev.map((order) => (order.id === id ? { ...order, qty: newQty } : order)));
  };

  const handleRemoveItem = (id) => {
    setOrderItems((prev) => prev.filter((order) => order.id !== id));
  };

  const handleReset = () => {
    setOrderItems([]);
  };

  const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>☕ Kasir Coffee Shop</h1>

      {/* Render berdasarkan kategori */}
      {MENU_CATEGORIES.map((category) => (
        <div key={category.id} style={{ marginBottom: "30px" }}>
          <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "8px" }}>{category.name}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
            {category.items.map((item) => (
              <MenuItem key={item.id} item={item} onAdd={handleAddItem} />
            ))}
          </div>
        </div>
      ))}

      {/* Pesanan & Total */}
      <div style={{ marginTop: "40px", maxWidth: "500px" }}>
        <OrderList orderItems={orderItems} onUpdateQty={handleUpdateQty} onRemove={handleRemoveItem} />
        <TotalDisplay total={total} />
        <button
          onClick={handleReset}
          style={{
            marginTop: "16px",
            padding: "10px 20px",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Reset Pesanan
        </button>
      </div>
    </div>
  );
}
