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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/qr/${tableId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch QR");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Open in new tab
      const newTab = window.open();
      if (newTab) {
        const imgHtml = `
          <html>
            <head><title>QR Code</title></head>
            <body style="margin:0;display:flex;align-items:center;justify-content:center;background:#fff;">
              <img src="${url}" alt="QR Code" style="max-width:100%;height:auto;" />
              <script>
                const link = document.createElement('a');
                link.href = '${url}';
                link.download = 'table_${tableNumber}_qr.png';
                link.click();
              </script>
            </body>
          </html>
        `;
        newTab.document.write(imgHtml);
        newTab.document.close();
      } else {
        alert("Pop-up blocked! Please allow pop-ups for this site.");
      }
    } catch (error) {
      console.error("QR download error:", error);
      alert("Failed to download QR. Please try again.");
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
      {loading ? "Downloading..." : `Download QR for Table ${tableNumber}`}
    </button>
  );
};

export default TableQR;
