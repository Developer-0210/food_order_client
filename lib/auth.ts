import axios from "axios"

export interface User {
  id: number
  name: string
  is_superuser: number
  restaurant_id?: number
  role: string
  email: string
}

const TOKEN_KEY = "token"
const USER_KEY = "user"

export const auth = {
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY)
    }
    return null
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY)
    delete axios.defaults.headers.common["Authorization"]
  },

  isAuthenticated: (): boolean => {
    return !!auth.getToken()
  },

  getCurrentUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(USER_KEY)
      return userStr ? JSON.parse(userStr) : null
    }
    return null
  },

  setCurrentUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  removeCurrentUser: () => {
    localStorage.removeItem(USER_KEY)
  },

  logout: () => {
    auth.removeToken()
    auth.removeCurrentUser()
  },
}

// Ensure token is set on initial load (e.g., after refresh)
if (typeof window !== "undefined") {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
}
