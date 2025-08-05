"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import {
  LogIn,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  User,
} from "lucide-react"

import { ROUTES } from "../../lib/routes"
import { auth } from "../../lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()


  useEffect(() => {
  const token = localStorage.getItem("token")
  if (token) {
    // You can also check if it's expired here if needed
    router.replace("/admin/profile") // or your appropriate redirect page
  }
}, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const formData = new URLSearchParams()
      formData.append("username", username)
      formData.append("password", password)

      const response = await axios.post(ROUTES.LOGIN, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })

      const { access_token, user } = response.data

      await auth.setToken(access_token)
      await auth.setCurrentUser(user)

      if (user.is_superuser) {
        router.push("/superuser/register-admin")
      } else {
        router.push("/admin/profile")
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* Login Card */}
      <div className="w-full max-w-lg relative z-10">
        <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="mx-auto mb-6 relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-blue-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </CardTitle>
            <p className="text-slate-400 text-base leading-relaxed">
              Sign in to your restaurant dashboard and manage your business.
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-3">
                <Label htmlFor="username" className="text-sm font-semibold text-slate-300">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    id="username"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-300">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl transition-all duration-200"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 text-base mt-8"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Signing you in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Footer links */}
            <div className="mt-8 pt-6 border-t border-slate-700 text-center space-y-4">
              <p className="text-slate-400 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-400 hover:text-blue-300 font-medium transition duration-200 hover:underline underline-offset-4"
                >
                  Sign up here
                </Link>
              </p>
              <Link
                href="/forgot"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition duration-200 hover:underline underline-offset-4"
              >
                <Lock className="h-4 w-4" />
                Forgot your password?
              </Link>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center text-xs text-slate-500">
              By signing in, you agree to our{" "}
              <Link href="/privacy-policy" className="text-green-500 hover:underline">
                privacy policy
              </Link>{" "}
              and{" "}
              <Link href="/contact" className="text-green-500 hover:underline">
                contact us
              </Link>
              .
            </div>
          </CardContent>
        </Card>

        {/* Security notice */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Secure login with end-to-end encryption</span>
        </div>
      </div>
    </div>
  )
}
