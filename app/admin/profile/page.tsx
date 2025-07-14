"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "../../../components/Layout"
import { auth, type User } from "../../../lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Shield,
  ChefHat,
  TableProperties,
  ClipboardList,
  History,
  UserIcon,
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = auth.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
    } else {
      setUser(currentUser)
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const navigationItems = [
    {
      icon: ChefHat,
      title: "Menu",
      href: "/admin/menu",
      description: "Add, edit, and organize your food items",
      color: "bg-green-500",
    },
    {
      icon: TableProperties,
      title: "Tables",
      href: "/admin/tables",
      description: "Create and manage restaurant tables",
      color: "bg-purple-500",
    },
    {
      icon: ClipboardList,
      title: "Orders",
      href: "/admin/orders",
      description: "Monitor live orders from each table",
      color: "bg-orange-500",
    },
    {
      icon: History,
      title: "History",
      href: "/admin/history",
      description: "Track earnings and review past orders",
      color: "bg-indigo-500",
    },
  ]

  return (
    <Layout title="Your Profile">
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 h-full">
        <div className="max-w-4xl mx-auto px-4 h-full flex flex-col py-2">
          {/* Welcome Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-2 shadow-lg">
              <UserIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-sm text-gray-600 mb-1">
              Ready to manage your Business today?
            </p>
            <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
              <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                <Mail className="w-4 h-4" />
                {user.email}
              </span>
              <Badge
                variant={user.is_superuser ? "default" : "secondary"}
                className={`text-sm font-semibold ${
                  user.is_superuser
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                }`}
              >
                <Shield className="w-4 h-4 mr-1" />
                {user.is_superuser ? "SuperUser" : "Business Owner"}
              </Badge>
            </div>
          </div>
  
          {/* Navigation Guide */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm flex-1 flex flex-col">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-lg">
                <ChefHat className="w-5 h-5" />
                Quick Navigation Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 flex-1 flex flex-col">
              <p className="text-gray-600 mb-3 text-center text-sm">
                Explore all the features available in your restaurant management dashboard
              </p>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="group block p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
  
              <div className="mt-3 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-700 text-center">
                  💡 <strong>Pro Tip:</strong> Use the sidebar navigation to quickly access any of these features.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}  