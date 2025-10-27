'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Loader, ArrowLeft } from 'lucide-react';

export default function EditCollectionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', slug: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch collection by ID
  useEffect(() => {
    async function fetchCollection() {
      try {
        const res = await fetch('/api/collections');
        const data = await res.json();
        const found = data.find((x) => x.id == id);
        if (found) setForm(found);
      } catch (err) {
        console.error(err);
        alert('❌ Failed to fetch collection.');
      } finally {
        setLoading(false);
      }
    }
    fetchCollection();
  }, [id]);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch('/api/collections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name: form.name, slug: form.slug }),
      });

      if (res.ok) {
        alert('✅ Collection updated successfully!');
        router.push('/dashboard/collections');
      } else {
        alert('❌ Failed to update collection.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Something went wrong.');
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading collection...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Edit className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-800">Edit Collection</h1>
          </div>
          <Link
            href="/dashboard/collections"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to List
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Collection Name
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().trim().replace(/\s+/g, '-'),
                })
              }
              placeholder="e.g. Summer Collection"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. summer-collection"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-800"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updating}
              className={`inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition ${
                updating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {updating && <Loader className="w-5 h-5 animate-spin" />}
              {updating ? 'Updating...' : 'Update Collection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
