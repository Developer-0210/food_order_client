"use client"

import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoginPage from "./login/page"

export default function HomePage() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")
    const userStr = localStorage.getItem("user")
    const user = userStr ? JSON.parse(userStr) : null

    if (token && user) {
      if (user.is_superuser) {
        router.push("/superuser/register-admin")
      } else {
        router.push("/admin/profile")
      }
    } else {
      setIsChecking(false)
    }
  }, [])

  if (isChecking) return null // prevent flicker

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginPage />
    </div>
  )
}
