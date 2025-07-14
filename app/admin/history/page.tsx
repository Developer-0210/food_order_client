"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "../../../components/Layout"
import { ROUTES } from "../../../lib/routes"
import type { Order } from "../../../types"
import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function History() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [secretKeyPrompt, setSecretKeyPrompt] = useState(true)
  const [secretKey, setSecretKey] = useState("")

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${ROUTES.ORDER.LIST_History}?secret_key=${secretKey}`)
      const sorted = response.data.sort(
        (a: Order, b: Order) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      setOrders(sorted)
      setFilteredOrders(sorted)
      setSecretKeyPrompt(false) // ✅ Move this here only if request is successful
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403 || err.response?.status === 400) {
        alert("Incorrect secret key")
      } else {
        toast.error(err.response?.data?.detail || "Failed to fetch history")
      }
    } finally {
      setLoading(false)
    }
  }
  
  const handleSecretSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!secretKey) return toast.error("Enter your secret key")
    await fetchOrders()
  }
  

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSelectedDate(value)

    if (!value) {
      setFilteredOrders(orders)
      return
    }

    const filtered = orders.filter((order) =>
      new Date(order.created_at).toLocaleDateString("en-CA") === value
    )
    setFilteredOrders(filtered)
  }

  const totalEarnings = filteredOrders.reduce((sum, order) => sum + order.total_amount, 0)

  if (secretKeyPrompt) {
    return (
      <Layout title="Enter Secret Key">
        <div className="min-h-[70vh] flex flex-col justify-center items-center">
          <form onSubmit={handleSecretSubmit} className="bg-white shadow-md p-6 rounded-md max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Enter Secret Key to View History</h2>
            <Input
              type="password"
              placeholder="Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              required
              className="mb-4"
            />
            <Button type="submit" className="w-full">Verify & Continue</Button>
          </form>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Order History">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Order History</h1>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="mb-4 text-right text-lg font-semibold text-gray-800">
          Total Earnings: ₹{totalEarnings.toFixed(2)}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">No orders found</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100 text-sm">
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3">#{order.id}</td>
                    <td className="px-4 py-3">Table {order.table_number}</td>
                    <td className="px-4 py-3">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.quantity}× {item.menu_item.name}{" "}
                          <span className="text-gray-400">({item.selected_type})</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 capitalize">{order.status}</td>
                    <td className="px-4 py-3">
                      {new Date(order.created_at).toLocaleDateString("en-GB")}{" "}
                      {new Date(order.created_at).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 font-semibold">₹{order.total_amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  )
}
