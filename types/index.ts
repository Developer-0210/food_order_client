// Quantity Types
export type QuantityType = "quarter" | "half" | "full"

// Food Category
export interface FoodCategory {
  id: number
  name: string
}

// Quantity Price (price for a specific quantity type of a menu item)
export interface QuantityPrice {
  id: number
  menu_item_id: number
  quantity_type: QuantityType
  price: number
}

// Menu Item
export interface MenuItem {
  id: number
  name: string
  quantity_prices: QuantityPrice[] // 🆕 contains per-type pricing
  food_category: FoodCategory
  is_available: boolean
}

// Flattened version of MenuItem (useful for forms/dropdowns)
export interface FlatMenuItem {
  id: number
  name: string
  price: number
  quantity_type: QuantityType
  food_category: string
  is_available: boolean
}

// Table
export interface Table {
  id: number
  table_number: number
  is_occupied: boolean
}

// Order Item (for creating or storing an item in an order)
export interface OrderItem {
  menu_item_id: number
  menu_item_name?: string
  quantity: number
  selected_type: QuantityType
  price: number // price per unit for the selected type
}

// Backend Order Item (with menu relation)
export interface OrderItemWithMenu {
  menu_item: {
    name: string
    id: number
  }
  selected_type: QuantityType
  quantity: number
  price_at_order: number
}

// Order
export interface Order {
  id: number
  table_id: number
  table_number: number
  status: "pending" | "preparing" | "ready" | "served"
  estimated_time?: string | null
  total_amount: number
  created_at: string
  items: OrderItemWithMenu[]
}

// Admin User
export interface Admin {
  id: number
  name: string
  email: string
  contact: string
  is_superuser: number
  restaurant_name?: string
  created_at: string
}
