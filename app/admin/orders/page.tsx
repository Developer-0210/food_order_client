"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Layout from "../../../components/Layout"
import { ROUTES } from "../../../lib/routes"
import type { Order } from "../../../types"
import { CheckCircle, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

interface TableRequest {
  id: number
  table_number: number
  created_at: string
  fixed_message: string
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [requests, setRequests] = useState<TableRequest[]>([])
  const [loading, setLoading] = useState(false)
  const seenOrderIds = useRef<Set<number>>(new Set())

  useEffect(() => {
    fetchOrders()
    fetchTableRequests()

    const interval = setInterval(() => {
      fetchOrders()
      fetchTableRequests()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(ROUTES.ORDER.LIST)
      const activeOrders = response.data.filter((order: Order) => order.status !== "served")
      setOrders(activeOrders)
      activeOrders.forEach((order: Order) => seenOrderIds.current.add(order.id))
    } catch (err) {
      console.error("Failed to fetch orders:", err)
    }
  }

  const fetchTableRequests = async () => {
    try {
      const response = await axios.get(ROUTES.ORDER.TABLE_REQUEST)
      setRequests(response.data.requests)
    } catch (err) {
      console.error("Failed to fetch table requests:", err)
    }
  }

  const deleteRequest = async (requestId: number) => {
    try {
      await axios.delete(ROUTES.ORDER.TABLE_REQUEST_DELETE(requestId))
      fetchTableRequests()
    } catch (err) {
      console.error("Failed to delete request:", err)
    }
  }

  const [toggledStatuses, setToggledStatuses] = useState<{ [key: number]: boolean }>({})

  const toggleLocalStatus = (orderId: number) => {
    setToggledStatuses((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }))
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(ROUTES.ORDER.POLL_NEW)
        const newOrders = res.data.orders

        for (const order of newOrders) {
          if (!seenOrderIds.current.has(order.id)) {
            seenOrderIds.current.add(order.id)

            toast.success(`🆕 New Order #${order.id} • Table ${order.table_number}`, {
              duration: 10000,
              position: "top-left",
              icon: "🍽️",
              style: {
                fontSize: "1.1rem",
                fontWeight: "600",
                padding: "16px 24px",
                border: "1px solid #22c55e",
                backgroundColor: "#f0fdf4",
                color: "#14532d",
                borderRadius: "12px",
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
              },
            })

            fetchOrders()
          }
        }
      } catch (err) {
        console.error("Polling error:", err)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const updateOrderStatus = async (orderId: number, status: string) => {
    setLoading(true)
    try {
      await axios.patch(ROUTES.ORDER.UPDATE_STATUS(orderId, status))
      if (status === "served") {
        setOrders((prev) => prev.filter((order) => order.id !== orderId))
      } else {
        fetchOrders()
      }
    } catch (err) {
      console.error("Failed to update order status:", err)
    } finally {
      setLoading(false)
    }
  }

  const deleteOrder = async (orderId: number) => {
    if (!confirm(`Are you sure you want to delete Order #${orderId}?`)) return
    setLoading(true)
    try {
      await axios.delete(ROUTES.ORDER.DELETE(orderId))
      fetchOrders()
    } catch (err) {
      console.error("Failed to delete order:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Order Management">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Order Management</h1>

        {/* Table Requests */}
        {requests.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Table Requests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-yellow-50 border border-yellow-200 shadow-md rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-lg font-bold text-yellow-800">Table {req.table_number}</p>
                    <p className="text-sm text-yellow-700">🛎️ {req.fixed_message || "Call for waiter"}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(req.created_at).toLocaleTimeString()}</p>
                  </div>
                  <button
                    onClick={() => deleteRequest(req.id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders */}
        {orders.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">No active orders</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col"
              >
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                    <div
                      onClick={() => toggleLocalStatus(order.id)}
                      className="flex flex-col items-center justify-center cursor-pointer select-none space-y-1"
                    >
                      <span
                        className={`relative inline-block w-10 h-5 transition rounded-full ${
                          toggledStatuses[order.id] ? "bg-green-400" : "bg-red-400"
                        }`}
                      >
                        <span
                          className={`absolute left-0 top-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                            toggledStatuses[order.id] ? "translate-x-5" : "translate-x-0"
                          }`}
                        ></span>
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          toggledStatuses[order.id] ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {toggledStatuses[order.id] ? "Delivered" : "Pending"}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Table {order.table_number} • {new Date(order.created_at).toLocaleTimeString()}
                  </p>
                </div>

                <div className="px-6 py-4 flex-1">
                  <div className="space-y-2 text-sm text-gray-700">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {item.quantity}× {item.menu_item.name}
                          <span className="text-gray-400"> ({item.selected_type})</span>
                        </span>
                        <span className="font-medium">₹{(item.price_at_order * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 text-sm flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{order.total_amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 space-y-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "served")}
                      disabled={loading}
                      className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md disabled:opacity-50 transition"
                    >
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Mark as Done
                    </button>
                  )}

                  {order.status === "ready" && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "served")}
                      disabled={loading}
                      className="w-full px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md disabled:opacity-50 transition"
                    >
                      Mark as Served
                    </button>
                  )}

                  {order.status === "served" && (
                    <div className="text-center text-sm text-gray-500">Order completed</div>
                  )}

                  <button
                    onClick={() => deleteOrder(order.id)}
                    disabled={loading}
                    className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md disabled:opacity-50 flex items-center justify-center transition"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
