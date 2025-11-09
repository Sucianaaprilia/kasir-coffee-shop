import { useState } from "react";
import MenuItem from "./MenuItem";
import OrderList from "./OrderList";
import TotalDisplay from "./TotalDisplay";
import { MENU_ITEMS } from "../data/mockData"; // ← Impor dari file terpisah

//=====
// penggunaan konstanta untuk state management
// useState (orderItems) sebagai single source of truth.
// Semua hal lain (seperti total harga) dihitung dari state ini,
// bukan disimpan di state terpisah.
//=====
export default function KasirApp() {
  const [orderItems, setOrderItems] = useState([]);

  //=====
  // Immutability:
  // jangan mengubah state secara langsung.
  // handleAddItem: Menggunakan spread syntax (...prev)
  // untuk menambah item baru.
  // handleUpdateQty: Menggunakan .map() untuk mengembalikan array baru.
  // handleRemoveItem: Menggunakan .filter() untuk mengembalikan array baru.
  //=====
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

  const total = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1>☕ Kasir Coffee Shop</h1>

      {/* 
        ===== gunakan key={item.id} di dalam .map()
        ini sangat penting untuk performa rendering list di React.
      */}

      {/* Grid Menu */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "16px",
        }}
      >
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.id} item={item} onAdd={handleAddItem} />
        ))}
      </div>

      {/* Pesanan & Total */}
      <div style={{ marginTop: "30px", maxWidth: "500px" }}>
        <OrderList orderItems={orderItems} onUpdateQty={handleUpdateQty} onRemove={handleRemoveItem} />
        <TotalDisplay total={total} />
      </div>
    </div>
  );
}
