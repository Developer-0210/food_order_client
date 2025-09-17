"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Layout from "../../../components/Layout"
import { ROUTES } from "../../../lib/routes"
import type { MenuItem } from "../../../types"
import { Plus, Edit, Trash2, X } from "lucide-react"
import toast from "react-hot-toast"

type QuantityType = "quarter" | "half" | "full"

type QuantityPrice = {
  quantity_type: QuantityType
  price: string
}

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    food_category_name: "",
    is_available: true,
    quantity_prices: [] as QuantityPrice[],
  })
  const [error, setError] = useState("")
  const seenOrderIds = useRef<Set<number>>(new Set())

  // 🔔 Notification sound
  const playNotificationSound = () => {
    try {
      const audio = new Audio("https://www.soundjay.com/misc/sounds/bell-ringing-05.wav")
      audio.volume = 0.7
      audio.play().catch(() => {
        const fallbackAudio = new Audio(
          "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/zapsplat_multimedia_notification_bell_ping_001_44712.mp3"
        )
        fallbackAudio.volume = 0.7
        fallbackAudio.play().catch(() => {
          const beepAudio = new Audio(
            "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuR2O/Eeyw"
          )
          beepAudio.volume = 0.5
          beepAudio.play().catch(() => console.log("All audio playback failed"))
        })
      })
    } catch (error) {
      console.log("Audio init failed:", error)
    }
  }

  // 🔄 Poll new orders and show toast
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(ROUTES.ORDER.POLL_NEW)
        const newOrders = res.data.orders || []
        for (const order of newOrders) {
          if (!seenOrderIds.current.has(order.id)) {
            seenOrderIds.current.add(order.id)

            playNotificationSound()

            toast.custom(
              (t) => (
                <div
                  className={`flex items-center justify-between gap-3 border border-green-500 bg-green-50 text-green-900 rounded-xl shadow-lg px-4 py-3 w-full max-w-sm ${
                    t.visible ? "animate-enter" : "animate-leave"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="plate">🍽️</span>
                    <span className="font-semibold">
                      🆕 New Order #{order.id} • Table {order.table_number}
                    </span>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ),
              { duration: Infinity, position: "top-left" }
            )
          }
        }
      } catch (err) {
        console.error("Polling error:", err)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const res = await axios.get(ROUTES.MENU.LIST)
      setMenuItems(res.data)
    } catch (err) {
      console.error("Failed to fetch menu items:", err)
    }
  }

  const handleQuantityPriceChange = (type: QuantityType, price: string) => {
    setFormData((prev) => {
      const existing = prev.quantity_prices.find((q) => q.quantity_type === type)
      let updated: QuantityPrice[]
      if (existing) {
        updated = prev.quantity_prices.map((q) =>
          q.quantity_type === type ? { ...q, price } : q
        )
      } else {
        updated = [...prev.quantity_prices, { quantity_type: type, price }]
      }
      return { ...prev, quantity_prices: updated }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const filteredPrices = formData.quantity_prices
      .filter((qp) => qp.price && !isNaN(parseFloat(qp.price)))
      .map((qp) => ({ ...qp, price: parseFloat(qp.price) }))

    const payload = {
      name: formData.name,
      food_category_name: formData.food_category_name,
      is_available: formData.is_available,
      quantity_prices: filteredPrices,
    }

    try {
      if (editingItem) {
        await axios.put(ROUTES.MENU.UPDATE(editingItem.id), payload)
      } else {
        await axios.post(ROUTES.MENU.CREATE, payload)
      }

      resetForm()
      fetchMenuItems()
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to save menu item")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      food_category_name: item.food_category?.name || "",
      is_available: item.is_available,
      quantity_prices: item.quantity_prices.map((qp) => ({
        quantity_type: qp.quantity_type,
        price: qp.price.toString(),
      })),
    })
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      await axios.delete(ROUTES.MENU.DELETE(id))
      fetchMenuItems()
    } catch (err) {
      console.error("Failed to delete item:", err)
    }
  }

  const resetForm = () => {
    setEditingItem(null)
    setFormData({
      name: "",
      food_category_name: "",
      is_available: true,
      quantity_prices: [],
    })
    setError("")
  }

  const getPriceForType = (type: QuantityType) =>
    formData.quantity_prices.find((q) => q.quantity_type === type)?.price || ""

  return (
    <Layout title="Menu Management">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h3>
          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Item Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Food Category</label>
                  <input
                    type="text"
                    required
                    value={formData.food_category_name}
                    onChange={(e) => setFormData({ ...formData, food_category_name: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="e.g., Indian, Chinese"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity-wise Pricing</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {["quarter", "half", "full"].map((type) => (
                    <div key={type}>
                      <label className="text-sm capitalize">{type}</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="₹"
                        value={getPriceForType(type as QuantityType)}
                        onChange={(e) =>
                          handleQuantityPriceChange(type as QuantityType, e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Available?</label>
                <label className="inline-flex items-center mt-1 space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_available}
                    onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span>{formData.is_available ? "Yes" : "No"}</span>
                </label>
              </div>

              <div className="flex space-x-3 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  <Plus className="h-4 w-4 inline-block mr-1" />
                  {loading ? "Saving..." : editingItem ? "Update Item" : "Add Item"}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Menu Items</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Prices</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{item.food_category?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.is_available ? (
                        <span className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-full text-xs">Yes</span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-red-700 bg-red-100 rounded-full text-xs">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.quantity_prices
                        ?.map((qp) => `${qp.quantity_type}: ₹${qp.price.toFixed(2)}`)
                        .join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}
