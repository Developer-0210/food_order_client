"use client" // must be a Client Component at top

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { ROUTES } from "../../lib/routes"
import type { MenuItem } from "../../types"
import { ShoppingCart, Plus, Minus, Filter } from "lucide-react"

interface CartLine {
  item: MenuItem
  qty: number
  selected_type: string
}

type FoodCategory = string

export default function FoodPage() {
  const searchParams = useSearchParams()
  const tableIdParam = searchParams.get("table_id")

  const [menu, setMenu] = useState<MenuItem[]>([])
  const [cart, setCart] = useState<CartLine[]>([])
  const [placing, setPlacing] = useState(false)
  const [msg, setMsg] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>("all")
  const [quantitySelections, setQuantitySelections] = useState<Record<number, string>>({})
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [categories, setCategories] = useState<FoodCategory[]>(["all"])

  const tableId = tableIdParam ? Number(tableIdParam) : null

  useEffect(() => {
    if (tableId) fetchMenu(tableId)
  }, [tableId])

  const fetchMenu = async (tableId: number) => {
    try {
      const res = await axios.get(ROUTES.MENU.BY_TABLE(tableId))
      const availableItems = res.data.filter((item: MenuItem) => item.is_available)
      setMenu(availableItems)

      const uniqueCategories = new Set<string>()
      availableItems.forEach((item: MenuItem) => {
        const name = item.food_category?.name?.toLowerCase() || "uncategorized"
        uniqueCategories.add(name)
      })
      setCategories(["all", ...Array.from(uniqueCategories)])
    } catch (err) {
      console.error("Failed to fetch menu", err)
    }
  }

  const getPriceForType = (item: MenuItem, type: string): number => {
    const entry = item.quantity_prices?.find((p) => p.quantity_type === type)
    return entry?.price ?? 0
  }

  const addToCart = (item: MenuItem) => {
    const selectedType = quantitySelections[item.id] || item.quantity_prices?.[0]?.quantity_type
    const qty = quantities[item.id] || 1
    if (!selectedType) return

    setCart((prev) => {
      const existing = prev.find((l) => l.item.id === item.id && l.selected_type === selectedType)
      if (existing) {
        return prev.map((l) =>
          l.item.id === item.id && l.selected_type === selectedType
            ? { ...l, qty: l.qty + qty }
            : l
        )
      }
      return [...prev, { item, qty, selected_type: selectedType }]
    })

    setQuantities((prev) => ({ ...prev, [item.id]: 1 }))
    setQuantitySelections((prev) => ({ ...prev, [item.id]: selectedType }))
  }

  const changeQty = (id: number, selected_type: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.item.id === id && l.selected_type === selected_type
            ? { ...l, qty: l.qty + delta }
            : l
        )
        .filter((l) => l.qty > 0)
    )
  }

  const total = cart.reduce((sum, l) => {
    const price = getPriceForType(l.item, l.selected_type)
    return sum + price * l.qty
  }, 0)

  const placeOrder = async () => {
    if (!tableId || cart.length === 0) return
    setPlacing(true)
    setMsg("")

    try {
      await axios.post(ROUTES.ORDER.CREATE, {
        table_id: tableId,
        items: cart.map((l) => ({
          menu_item_id: l.item.id,
          quantity: l.qty,
          selected_type: l.selected_type,
        })),
      })
      setMsg("✅ Order placed! Your food will be prepared shortly.")
      setCart([])
    } catch (e: any) {
      console.error("Order placement error:", e.response)
      setMsg(e.response?.data?.detail || "Failed to place order.")
    } finally {
      setPlacing(false)
    }
  }

  const groupedMenu = menu.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const key = item.food_category?.name?.toLowerCase() || "uncategorized"
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

  const filteredMenu =
    selectedCategory === "all"
      ? groupedMenu
      : { [selectedCategory]: groupedMenu[selectedCategory] || [] }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <img src="/logo.png" alt="Logo" className="w-13 h-20" />
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-8">
          {Object.entries(filteredMenu).map(([category, items]) => (
            <div key={category}>
              <div className="flex items-center mb-3">
                <div className="w-1.5 h-6 bg-blue-600 rounded-sm mr-3" />
                <h2 className="text-lg font-semibold capitalize text-gray-800">{category}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => {
                  const quantityTypes = item.quantity_prices.map((qp) => qp.quantity_type)
                  const selectedType = quantitySelections[item.id] || quantityTypes[0]
                  const price = getPriceForType(item, selectedType)

                  return (
                    <div
                      key={item.id}
                      className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="mb-3">
                        <h3 className="text-md font-semibold text-gray-900">{item.name}</h3>
                        <label className="block text-sm mt-1 text-gray-600">
                          Type:
                          <select
                            value={selectedType}
                            onChange={(e) =>
                              setQuantitySelections((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }))
                            }
                            className="ml-2 border rounded px-1 text-sm"
                          >
                            {quantityTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-600">₹{price.toFixed(2)}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            value={quantities[item.id] || 1}
                            onChange={(e) =>
                              setQuantities((prev) => ({
                                ...prev,
                                [item.id]: Math.max(1, Number(e.target.value)),
                              }))
                            }
                            className="w-12 text-center border rounded text-sm"
                          />
                          <button
                            onClick={() => addToCart(item)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </section>

        <aside className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" /> Cart
          </h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {cart.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No items added yet.</p>
            )}
            {cart.map((l) => {
              const linePrice = getPriceForType(l.item, l.selected_type) * l.qty
              return (
                <div
                  key={`${l.item.id}-${l.selected_type}`}
                  className="p-4 flex items-center justify-between text-sm"
                >
                  <div>
                    {l.qty}× {l.item.name}
                    <span className="block text-xs text-gray-500 capitalize">
                      {l.selected_type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">₹{linePrice.toFixed(2)}</span>
                    <button
                      onClick={() => changeQty(l.item.id, l.selected_type, -1)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => changeQty(l.item.id, l.selected_type, +1)}
                      className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="space-y-2">
            <div className="text-right font-semibold">Total: ₹{total.toFixed(2)}</div>
            <button
              disabled={placing || !tableId || cart.length === 0}
              onClick={placeOrder}
              className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded disabled:opacity-50 hover:bg-blue-700"
            >
              {placing ? "Placing…" : "Place Order"}
            </button>
            {msg && <div className="text-sm text-center text-green-700">{msg}</div>}
          </div>
        </aside>
      </main>
    </div>
  )
}
