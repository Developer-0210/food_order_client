"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../components/Layout";
import { ROUTES } from "../../../lib/routes";
import { Plus, Edit, Trash2 } from "lucide-react";
import TableQR from "@/components/TableQR";

interface Table {
  id: number;
  table_number: number;
  is_occupied?: boolean;
}

export default function TableManagement() {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);
  const [formData, setFormData] = useState({ table_number: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get(ROUTES.TABLE.LIST);
      setTables(response.data);
    } catch (err) {
      console.error("Failed to fetch tables:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = { table_number: Number(formData.table_number) };

      if (editingTable) {
        await axios.put(ROUTES.TABLE.UPDATE(editingTable.id), data);
      } else {
        await axios.post(ROUTES.TABLE.CREATE, data);
      }

      setFormData({ table_number: "" });
      setEditingTable(null);
      fetchTables();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to save table");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (table: Table) => {
    setEditingTable(table);
    setFormData({ table_number: table.table_number.toString() });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this table?")) return;

    try {
      await axios.delete(ROUTES.TABLE.DELETE(id));
      fetchTables();
    } catch (err) {
      console.error("Failed to delete table:", err);
    }
  };

  const cancelEdit = () => {
    setEditingTable(null);
    setFormData({ table_number: "" });
    setError("");
  };

  return (
    <Layout title="Table Management">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {editingTable ? "Edit Table" : "Add New Table"}
            </h3>
            <p className="text-sm text-gray-600">
  Kindly download QR from&nbsp;
  <a
    href="https://www.jiffymenu.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline font-medium"
  >
    www.jiffymenu.com
  </a>
</p>

          </div>
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Table Number
                </label>
                <input
                  type="number"
                  required
                  value={formData.table_number}
                  onChange={(e) =>
                    setFormData({ table_number: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {loading
                    ? "Saving..."
                    : editingTable
                    ? "Update Table"
                    : "Add Table"}
                </button>
                {editingTable && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table List */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Tables</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {tables.map((table) => (
              <div
                key={table.id}
                className={`relative p-4 rounded-lg border-2 ${
                  table.is_occupied
                    ? "border-red-200 bg-red-50"
                    : "border-green-200 bg-green-50"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    Table {table.table_number}
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      table.is_occupied ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {table.is_occupied ? "Occupied" : "Available"}
                  </div>
                </div>

                {/* QR Code */}
                <TableQR
                  tableId={table.id}
                  tableNumber={table.table_number}
                />

                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => handleEdit(table)}
                    className="p-1 text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(table.id)}
                    className="p-1 text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
