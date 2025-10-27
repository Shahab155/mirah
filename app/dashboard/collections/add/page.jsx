'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Loader } from 'lucide-react';

export default function AddCollectionPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
    setSlug(inputName.toLowerCase().trim().replace(/\s+/g, '-'));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !slug) {
      alert('Please enter both name and slug.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('✅ Collection added successfully!');
        router.push('/dashboard/collections');
      } else {
        alert('❌ Failed to add collection.');
      }
    } catch (error) {
      console.error('Error adding collection:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 bg-white border border-gray-100 shadow-lg rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Add New Collection</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Collection Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Collection Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            placeholder="e.g. Summer Collection"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="e.g. summer-collection"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading && <Loader className="w-5 h-5 animate-spin" />}
            {loading ? 'Adding...' : 'Add Collection'}
          </button>
        </div>
      </form>
    </div>
  );
}
