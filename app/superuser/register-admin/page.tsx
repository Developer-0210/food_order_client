"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { ROUTES } from "../../../lib/routes"
import type { Admin } from "../../../types"
import { Plus, Trash2, Edit, X, Check, LogOut, Loader2 } from "lucide-react"
import { auth } from "../../../lib/auth"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area" // Import ScrollBar for horizontal scroll indicator

export default function RegisterAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    restaurant_name: "",
    secret_key: "",
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  useEffect(() => {
    const currentUser = auth.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    fetchAdmins()
  }, [router])

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(ROUTES.SUPERUSER.GET_ADMINS)
      setAdmins(response.data)
    } catch (err) {
      console.error("Failed to fetch admins:", err)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      contact: "",
      restaurant_name: "",
      secret_key: "",
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const payload = {
      ...formData,
      is_superuser: 0,
    }

    try {
      if (editingId) {
        await axios.put(ROUTES.SUPERUSER.UPDATE_ADMIN(editingId), payload)
        setSuccess("Admin updated successfully!")
      } else {
        await axios.post(ROUTES.SUPERUSER.CREATE_ADMIN, payload)
        setSuccess("Admin created successfully!")
      }
      resetForm()
      fetchAdmins()
    } catch (err: any) {
      setError(err.response?.data?.detail || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this admin?")) return
    try {
      await axios.delete(ROUTES.SUPERUSER.DELETE_ADMIN(id))
      fetchAdmins()
    } catch (err) {
      console.error("Failed to delete admin:", err)
    }
  }

  const handleEdit = (admin: Admin) => {
    setEditingId(admin.id)
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "", // Password should not be pre-filled for security
      contact: admin.contact,
      restaurant_name: admin.restaurant_name || "",
      secret_key: "", // Secret key should not be pre-filled for security
    })
    setError("")
    setSuccess("")
  }

  const handleLogout = () => {
    auth.logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
                JIFFYMENU
              </h1>
              <Badge
                variant="default"
                className="ml-4 px-4 py-1 text-sm font-medium bg-purple-600 text-white rounded-full shadow-sm"
              >
                Super Admin
              </Badge>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center text-sm text-gray-700 hover:text-purple-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-xl border-none rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-700 to-pink-500 text-white py-5 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold">
                  {editingId ? "Update Admin" : "Create New Admin"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                {error && (
                  <Alert variant="destructive" className="mb-4 rounded-lg">
                    <X className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert
                    variant="default"
                    className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-300 rounded-lg"
                  >
                    <Check className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="mt-1 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="admin@example.com"
                        className="mt-1 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="mt-1 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact" className="text-sm font-medium text-gray-700">
                        Contact
                      </Label>
                      <Input
                        id="contact"
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="+1234567890"
                        className="mt-1 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="restaurant_name" className="text-sm font-medium text-gray-700">
                        Restaurant Name
                      </Label>
                      <Input
                        id="restaurant_name"
                        type="text"
                        required
                        value={formData.restaurant_name}
                        onChange={(e) => setFormData({ ...formData, restaurant_name: e.target.value })}
                        placeholder="My Restaurant"
                        className="mt-1 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secret_key" className="text-sm font-medium text-gray-700">
                        Secret Key
                      </Label>
                      <Input
                        id="secret_key"
                        type="password"
                        required
                        value={formData.secret_key}
                        onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                        placeholder="••••••••"
                        className="mt-1 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 py-2.5 rounded-lg font-semibold text-white shadow-md transition-all duration-300 ${editingId ? "bg-amber-500 hover:bg-amber-600" : "bg-purple-600 hover:bg-purple-700"}`}
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      ) : editingId ? (
                        <Edit className="h-5 w-5 mr-2" />
                      ) : (
                        <Plus className="h-5 w-5 mr-2" />
                      )}
                      {loading
                        ? editingId
                          ? "Updating..."
                          : "Creating..."
                        : editingId
                          ? "Update Admin"
                          : "Create Admin"}
                    </Button>
                    {editingId && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        className="py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 bg-transparent"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Admins List Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-none rounded-2xl min-h-[50vh] lg:h-[calc(100vh-180px)] flex flex-col">
              <CardHeader className="bg-gradient-to-r from-purple-700 to-pink-500 text-white py-5 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold">Existing Admins</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                {admins.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <div className="text-2xl font-bold mb-2">No admins found</div>
                    <p className="text-base">Start by creating your first admin using the form on the left!</p>
                  </div>
                ) : (
                  <ScrollArea className="h-full w-full">
                    <div className="min-w-full inline-block align-middle">
                      {" "}
                      {/* Ensures table takes minimum full width and allows overflow */}
                      <Table>
                        <TableHeader className="sticky top-0 bg-gray-50 z-10">
                          <TableRow>
                            <TableHead className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                              Name
                            </TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-bold text-purple-700 uppercase tracking-wider">
                              Email
                            </TableHead>
                            <TableHead className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                              Restaurant
                            </TableHead>
                            <TableHead className="px-6 py-3 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white divide-y divide-gray-200">
                          {admins.map((admin) => (
                            <TableRow key={admin.id} className="hover:bg-purple-50 transition-colors duration-150">
                              <TableCell className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg shadow-sm">
                                    {admin.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                    <div className="text-sm text-gray-500">{admin.contact}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{admin.email}</div>
                              </TableCell>
                              <TableCell className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{admin.restaurant_name}</div>
                              </TableCell>
                              <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(admin)}
                                    title="Edit"
                                    className="text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
                                  >
                                    <Edit className="h-5 w-5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(admin.id)}
                                    title="Delete"
                                    className="text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors duration-200"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <ScrollBar orientation="horizontal" /> {/* Add horizontal scrollbar */}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
