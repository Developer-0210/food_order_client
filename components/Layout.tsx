"use client"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth, type User } from "../lib/auth"
import {
  Menu,
  X,
  LogOut,
  Users,
  UtensilsCrossed,
  Table,
  ShoppingCart,
  History,
} from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = auth.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    auth.logout()
    router.push("/login")
  }

  const navigation =
    user?.role === "superuser"
      ? [{ name: "Register Admin", href: "/superuser/register-admin", icon: Users }]
      : [
          { name: "Profile", href: "/admin/profile", icon: Users },
          { name: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
          { name: "Tables", href: "/admin/tables", icon: Table },
          { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
          { name: "History", href: "/admin/history", icon: History },
        ]

  if (!user) return <div className="text-center text-xl py-10 text-purple-700">Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "" : "hidden"}`}>
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white shadow-lg">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-red-600" />
            </button>
          </div>
          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex items-center space-x-2 px-4 mb-6">
             
              <span className="text-xl font-bold text-purple-700">JiffyMenu</span>
            </div>
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-900 transition"
                >
                  <item.icon className="mr-4 h-5 w-5 text-green-600 group-hover:text-purple-600" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r border-gray-200 shadow-sm">
        <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center px-4 space-x-2 mb-6">
            
            <span className="text-2xl font-semibold text-purple-700">JiffyMenu</span>
          </div>
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-purple-100 hover:text-purple-900 transition"
              >
                <item.icon className="mr-3 h-5 w-5 text-green-600 group-hover:text-purple-600" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-purple-700" />
            </button>
            <h1 className="text-lg font-semibold text-purple-700">{title}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-800">{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-red-600 hover:text-red-800 font-medium"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Children Content */}
        <main className="p-4 sm:p-6 lg:p-8 bg-white shadow-inner min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
