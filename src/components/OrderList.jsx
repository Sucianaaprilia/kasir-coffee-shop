// OrderList.jsx
import { useState } from "react";

export default function OrderList({ orderItems, onUpdateQty, onRemove }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Daftar Pesanan</h2>
      {orderItems.length === 0 ? (
        <p>Belum ada pesanan.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orderItems.map((order) => (
            <li
              key={order.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {order.name} × {order.qty}
              </span>
              <span>Rp{(order.price * order.qty).toLocaleString("id-ID")}</span>
              <div>
                <button onClick={() => onUpdateQty(order.id, order.qty + 1)} style={{ marginRight: "6px" }}>
                  +
                </button>
                <button
                  onClick={() => {
                    if (order.qty > 1) {
                      onUpdateQty(order.id, order.qty - 1);
                    } else {
                      onRemove(order.id);
                    }
                  }}
                  style={{ marginRight: "6px" }}
                >
                  –
                </button>
                <button onClick={() => onRemove(order.id)} style={{ color: "red" }}>
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
