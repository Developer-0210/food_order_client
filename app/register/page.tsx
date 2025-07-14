"use client"

import type React from "react"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import Link from "next/link"
import { ROUTES } from "../../lib/routes"
import {
  UserPlus,
  Eye,
  EyeOff,
  Loader2,
  User,
  Mail,
  Phone,
  Store,
  Lock,
  Sparkles,
} from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    restaurant_name: "",
    password: "",
    secret_key: "",
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(ROUTES.OTP.CREATE, form)
      toast.success("Signup successful. Redirecting...")
      setTimeout(() => {
        router.push("/otp")
      }, 1500)
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    form.name && form.email && form.contact && form.restaurant_name && form.password && form.secret_key

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl" />
      </div>

      {/* Layout Container */}
      <div className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Section */}
        <div className="text-center lg:text-left lg:flex-1">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Us Today! </h1>
          <p className="text-lg text-gray-600 mb-6">Create your restaurant management account and start managing your business efficiently</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-blue-600" />
              <span>Manage your restaurant operations</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              <span>Track orders and customer interactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              <span>Secure and reliable platform</span>
            </div>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full max-w-lg">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-5">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Sparkles className="w-6 h-6" />
                Create Account
              </CardTitle>
              <CardDescription className="text-blue-100">Join us as a restaurant owner</CardDescription>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="name" className="flex gap-2 items-center text-gray-700 text-sm font-medium">
                    <User className="w-4 h-4 text-blue-600" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email" className="flex gap-2 items-center text-gray-700 text-sm font-medium">
                    <Mail className="w-4 h-4 text-green-600" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>

                {/* Contact */}
                <div className="space-y-1">
                  <Label htmlFor="contact" className="flex gap-2 items-center text-gray-700 text-sm font-medium">
                    <Phone className="w-4 h-4 text-orange-600" />
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    name="contact"
                    type="tel"
                    value={form.contact}
                    onChange={handleChange}
                    required
                    placeholder="Enter your contact number"
                    disabled={loading}
                  />
                </div>

                {/* Restaurant Name */}
                <div className="space-y-1">
                  <Label htmlFor="restaurant_name" className="flex gap-2 items-center text-gray-700 text-sm font-medium">
                    <Store className="w-4 h-4 text-indigo-600" />
                    Restaurant Name
                  </Label>
                  <Input
                    id="restaurant_name"
                    name="restaurant_name"
                    type="text"
                    value={form.restaurant_name}
                    onChange={handleChange}
                    required
                    placeholder="Enter restaurant name"
                    disabled={loading}
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password" className="flex gap-2 items-center text-gray-700 text-sm font-medium">
                    <Lock className="w-4 h-4 text-purple-600" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a strong password"
                      disabled={loading}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Secret Key */}
                <div className="space-y-1">
                  <Label htmlFor="secret_key" className="flex gap-2 items-center text-gray-700 text-sm font-medium">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    Secret Key
                  </Label>
                  <Input
                    id="secret_key"
                    name="secret_key"
                    type="text"
                    value={form.secret_key}
                    onChange={handleChange}
                    required
                    placeholder="Enter the secret key provided"
                    disabled={loading}
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full h-11 mt-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-center">
  <div className="w-full">
    <Separator className="mb-4" />
    <p className="text-sm text-center text-gray-600">
      Already have an account?{" "}
      <Link
        href="/login"
        className="text-blue-600 font-medium hover:underline"
      >
        Sign in here
      </Link>
    </p>
  </div>
</CardFooter>

          </Card>

          {/* Security Info */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-gray-600 font-medium">Secure registration with email verification</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
