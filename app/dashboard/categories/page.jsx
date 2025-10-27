'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CategoryListPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then(setCategories);
  }, []);

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this category?')) {
      await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <Link
            href="/dashboard/categories/add"
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm"
          >
            + Add New
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((c, i) => (
                  <tr
                    key={c.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3">{c.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.slug}</td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <Link
                        href={`/dashboard/categories/edit/${c.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-red-600 hover:text-red-800 font-medium transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500 font-medium"
                  >
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
