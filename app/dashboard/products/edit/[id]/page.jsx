'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const { id } = useParams();
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

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(setCategories);
    fetch('/api/collections').then(r => r.json()).then(setCollections);
    fetch(`/api/products?id=${id}`).then(r => r.json()).then(setForm);
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append('image', image);
    fd.append('id', id);

    await fetch(`/api/products/${id}`, { method: 'PUT', body: fd });
    alert('✅ Product updated successfully!');
    router.push('/dashboard/products/');
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-md p-6 border">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          ✏️ Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Product Name</label>
            <input
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Description</label>
            <textarea
              className="border border-gray-300 rounded-lg p-3 w-full h-28 resize-none focus:ring-2 focus:ring-green-500 outline-none"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 outline-none"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Category</label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:ring-2 focus:ring-green-500 outline-none"
              value={form.category_id}
              onChange={e => setForm({ ...form, category_id: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Collection */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Collection</label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full bg-white focus:ring-2 focus:ring-green-500 outline-none"
              value={form.collection_id}
              onChange={e => setForm({ ...form, collection_id: e.target.value })}
            >
              <option value="">Select Collection</option>
              {collections.map(col => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Product Image</label>
            <input
              type="file"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 outline-none"
              onChange={e => setImage(e.target.files[0])}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 transition text-white font-medium px-6 py-3 rounded-lg shadow-md"
            >
              💾 Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
