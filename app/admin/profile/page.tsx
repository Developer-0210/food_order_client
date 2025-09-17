"use client"

import { useEffect, useState, useRef } from "react"
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
  X,
} from "lucide-react"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { ROUTES } from "../../../lib/routes"

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const seenOrderIds = useRef<Set<number>>(new Set())

  // 🔔 Function to play notification sound
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

  // 🔄 Polling for new orders & showing toast
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(ROUTES.ORDER.POLL_NEW)
        const newOrders = res.data.orders || []
        for (const order of newOrders) {
          if (!seenOrderIds.current.has(order.id)) {
            seenOrderIds.current.add(order.id)

            // Play sound
            playNotificationSound()

            // Show toast
            toast.custom(
              (t) => (
                <div
                  className={`flex items-center justify-between gap-3 border border-green-500 bg-green-50 text-green-900 rounded-xl shadow-lg px-4 py-3 w-full max-w-sm ${
                    t.visible ? "animate-enter" : "animate-leave"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="plate">
                      🍽️
                    </span>
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

  // 🔑 Authentication check
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
