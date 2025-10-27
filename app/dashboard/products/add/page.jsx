'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    collection_id: '',
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/categories').then((r) => r.json()).then(setCategories);
    fetch('/api/collections').then((r) => r.json()).then(setCollections);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price || !form.category_id) {
      alert('Please fill all required fields.');
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);

    setLoading(true);
    const res = await fetch('/api/products', { method: 'POST', body: fd });
    setLoading(false);

    if (res.ok) {
      alert('✅ Product added successfully!');
      router.push('/dashboard/products');
    } else {
      alert('❌ Failed to add product.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-sm rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
          <Link
            href="/dashboard/products"
            className="text-sm text-gray-600 hover:text-gray-900 transition"
          >
            ← Back to List
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Stylish T-Shirt"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Write short product description..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 h-28 resize-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 49.99"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Category & Collection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection
              </label>
              <select
                value={form.collection_id}
                onChange={(e) =>
                  setForm({ ...form, collection_id: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="">Select Collection</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <label
              className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="text-center">
                <p className="text-gray-600">
                  {image ? (
                    <span className="font-medium text-blue-600">
                      {image.name}
                    </span>
                  ) : (
                    'Click to upload image'
                  )}
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-medium py-2.5 rounded-lg shadow-sm transition ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
