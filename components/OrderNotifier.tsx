"use client"

import { useEffect, useRef } from "react"
import axios from "axios"
import toast, { Toast } from "react-hot-toast"
import { ROUTES } from "../lib/routes"
import { X } from "lucide-react"

export default function OrderNotifier() {
  const seenOrderIds = useRef<Set<number>>(new Set())

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(ROUTES.ORDER.POLL_NEW)
        const newOrders = res.data.orders || []

        for (const order of newOrders) {
          if (!seenOrderIds.current.has(order.id)) {
            seenOrderIds.current.add(order.id)

            // 👇 Use toast.custom for close button
            toast.custom((t: Toast) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-green-50 border border-green-200 shadow-lg rounded-xl pointer-events-auto flex items-center justify-between p-4`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍽️</span>
                  <div>
                    <p className="font-semibold text-green-900">
                      🆕 New Order #{order.id}
                    </p>
                    <p className="text-green-800 text-sm">
                      Table {order.table_number}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="text-green-900 hover:text-green-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ), {
              duration: Infinity, // stays until ❌ clicked
              position: "top-left",
            })
          }
        }
      } catch (err) {
        console.error("Polling error:", err)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return null
}
