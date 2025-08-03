"use client"

import { useEffect } from "react"
import { auth } from "../lib/auth"

export default function TokenRestore() {
  useEffect(() => {
    const token = auth.getToken()
    if (token) {
      auth.setToken(token) // Restore Axios header
    }
  }, [])

  return null
}
