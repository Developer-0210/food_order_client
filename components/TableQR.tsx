"use client";

import React, { useState } from "react";

interface TableQRProps {
  tableId: number;
  tableNumber: number;
}

const TableQR: React.FC<TableQRProps> = ({ tableId, tableNumber }) => {
  const [loading, setLoading] = useState(false);

  const downloadQR = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: Please login first.");
      return;
    }

    setLoading(true);
    try {
      // ✅ Replace with your actual backend domain
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/qr/${tableId}?token=${token}`;

      // ✅ This works in both browser and Android WebView (Applix)
      window.open(url, "_blank");
    } catch (error) {
      console.error("QR download error:", error);
      alert("Failed to open QR code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={downloadQR}
      disabled={loading}
      className={`mt-3 text-sm font-medium px-4 py-2 rounded transition ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {loading ? "Opening..." : `Download QR for Table ${tableNumber}`}
    </button>
  );
};

export default TableQR; 
