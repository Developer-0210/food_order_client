import axios from "axios"

export interface User {
  id: number
  name: string
  is_superuser: number
  restaurant_id?: number
  role:string
  email:string
}

export const auth = {
  setToken: (token: string) => {
    localStorage.setItem("token", token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  },

  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token")
    }
    return null
  },

  removeToken: () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
  },

  isAuthenticated: () => {
    return !!auth.getToken()
  },

  getCurrentUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user")
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  },

  setCurrentUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user))
  },

  logout: () => {
    auth.removeToken()
    localStorage.removeItem("user")
  },
}

// Set up axios interceptor to include token
if (typeof window !== "undefined") {
  const token = auth.getToken()
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
}
