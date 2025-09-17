"use client"

import { toast } from "react-hot-toast"
import { X } from "lucide-react"

export function showToast(
  message: string,
  type: "success" | "error" | "info" = "success"
) {
  toast.custom(
    (t) => (
      <div
        className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-md border
          ${type === "success" ? "bg-green-50 border-green-300 text-green-700" : ""}
          ${type === "error" ? "bg-red-50 border-red-300 text-red-700" : ""}
          ${type === "info" ? "bg-blue-50 border-blue-300 text-blue-700" : ""}`}
      >
        <span>{message}</span>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-500 hover:text-gray-800"
        >
          <X size={16} />
        </button>
      </div>
    ),
    { duration: Infinity }
  )
}

