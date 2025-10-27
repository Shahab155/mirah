'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  async function handleDelete(id) {
    if (confirm('Are you sure you want to delete this product?')) {
      await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <Link
            href="/dashboard/products/add"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm"
          >
            + Add New Product
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 border-b text-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b hover:bg-gray-50 transition ${
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={p.image_url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {p.description || '—' }
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-700">
                      ${p.price}
                    </td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <Link
                        href={`/dashboard/products/edit/${p.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
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
                    No products found.
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
