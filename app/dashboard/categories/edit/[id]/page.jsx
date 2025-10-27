'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', slug: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        const found = data.find((x) => x.id == id);
        if (found) setForm(found);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch category.');
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);

    const res = await fetch('/api/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setUpdating(false);

    if (res.ok) {
      alert('✅ Category updated successfully!');
      router.push('/dashboard/categories');
    } else {
      alert('❌ Failed to update category.');
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading category...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto bg-white shadow-sm rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Category</h1>
          <Link
            href="/dashboard/categories"
            className="text-sm text-gray-600 hover:text-gray-900 transition"
          >
            ← Back to List
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                })
              }
              placeholder="e.g. Cricket Balls"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 transition outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg px-4 py-2.5 text-gray-800 transition outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`w-full text-white font-medium py-2.5 rounded-lg shadow-sm transition ${
              updating
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {updating ? 'Updating...' : 'Update Category'}
          </button>
        </form>
      </div>
    </div>
  );
}
