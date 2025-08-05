"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { ROUTES } from "../../../lib/routes"
import type { Admin } from "../../../types"
import { Plus, Trash2, Edit, X, Check } from "lucide-react"

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

  useEffect(() => {
    fetchAdmins()
  }, [])

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
      password: "",
      contact: admin.contact,
      restaurant_name: admin.restaurant_name || "",
      secret_key: "",
    })
    setError("")
    setSuccess("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              JIFFYMENU
            </h1>
            <span className="ml-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Super Admin
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4">
                <h3 className="text-lg font-medium text-white">
                  {editingId ? "Update Admin" : "Create New Admin"}
                </h3>
              </div>
              <div className="p-6">
                {error && (
                  <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <div className="flex items-center">
                      <X className="h-5 w-5 mr-2" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}
                {success && (
                  <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2" />
                      <span>{success}</span>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="admin@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="+1234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
                      <input
                        type="text"
                        required
                        value={formData.restaurant_name}
                        onChange={(e) => setFormData({ ...formData, restaurant_name: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="My Restaurant"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                      <input
                        type="text"
                        required
                        value={formData.secret_key}
                        onChange={(e) => setFormData({ ...formData, secret_key: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-medium text-white ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} transition shadow-md disabled:opacity-50`}
                    >
                      {loading ? (
                        <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
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
                    </button>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Admins List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-4">
                <h3 className="text-lg font-medium text-white">Existing Admins</h3>
              </div>
              <div className="p-4">
                {admins.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">No admins found</div>
                    <p className="text-sm text-gray-500">Create your first admin using the form</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restaurant</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin) => (
                          <tr key={admin.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                                  {admin.name.charAt(0)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                  <div className="text-sm text-gray-500">{admin.contact}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{admin.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{admin.restaurant_name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleEdit(admin)}
                                  className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition"
                                  title="Edit"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(admin.id)}
                                  className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"
                                  title="Delete"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
