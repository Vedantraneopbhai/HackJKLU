import React from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 480, margin: "60px auto", padding: 32, background: "rgba(99,102,241,0.06)", borderRadius: 16, boxShadow: "0 4px 32px rgba(99,102,241,0.08)" }}>
      <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Settings</h2>
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>Theme</label>
        <select style={{ padding: 8, borderRadius: 8, width: "100%" }}>
          <option>System</option>
          <option>Light</option>
          <option>Dark</option>
        </select>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>Notifications</label>
        <input type="checkbox" id="notif" /> <label htmlFor="notif">Enable notifications</label>
      </div>
      <button
        style={{
          width: "100%",
          padding: "12px 0",
          background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
          color: "#fff",
          fontWeight: 700,
          border: "none",
          borderRadius: 8,
          fontSize: 16,
          marginTop: 32,
          cursor: "pointer"
        }}
        onClick={() => {
          // Add your logout logic here
          // Optionally clear auth state here
          navigate("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}
