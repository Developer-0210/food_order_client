"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { auth, type User } from "../lib/auth" // Assuming this file exists and provides auth and User type
import { Menu, X, LogOut, Users, UtensilsCrossed, Table, ShoppingCart, History } from "lucide-react"

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default function Layout({ children, title }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname() // Used to determine the active navigation link [^2]

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

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "" : "hidden"}`}>
        <div className="fixed inset-0 bg-black bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-custom-purple-950 shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
            <div className="flex items-center justify-center px-4">
              <img src="/logo.png" alt="Restaurant Logo" className="h-16 w-auto" />
            </div>
            <nav className="mt-8 space-y-2 px-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200
                      ${isActive ? "bg-custom-purple-700 text-white shadow-md" : "text-custom-purple-100 hover:bg-custom-purple-800 hover:text-custom-purple-200"}
                    `}
                    onClick={() => setSidebarOpen(false)} // Close sidebar on navigation
                  >
                    <item.icon className="mr-4 h-6 w-6" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-custom-purple-950 border-r border-custom-purple-800 shadow-lg">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center justify-center px-4">
              <img src="/logo.png" alt="Restaurant Logo" className="h-20 w-auto" />
            </div>
            <nav className="mt-8 flex-1 space-y-2 px-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                      ${isActive ? "bg-custom-purple-700 text-white shadow-md" : "text-custom-purple-100 hover:bg-custom-purple-800 hover:text-custom-purple-200"}
                    `}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-custom-purple-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 flex-1 text-center lg:text-left">{title || "Dashboard"}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-custom-red-600 hover:bg-gray-50 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
