'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, PlusCircle, Loader } from 'lucide-react';

export default function ListCollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch collections
  useEffect(() => {
    async function fetchCollections() {
      try {
        const res = await fetch('/api/collections');
        if (!res.ok) throw new Error('Failed to fetch collections');
        const data = await res.json();
        setCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  // Delete collection
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this collection?')) return;

    try {
      const res = await fetch('/api/collections', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCollections((prev) => prev.filter((c) => c.id !== id));
        alert('Collection deleted successfully!');
      } else {
        alert(data.message || 'Failed to delete collection');
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
      alert('Something went wrong while deleting.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading collections...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Collections</h2>
        <Link
          href="/dashboard/collections/add"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
        >
          <PlusCircle className="w-5 h-5" />
          Add New
        </Link>
      </div>

      {collections.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center italic">No collections found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Slug</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((col) => (
                <tr
                  key={col.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-700">{col.id}</td>
                  <td className="p-3 capitalize text-gray-700">{col.name}</td>
                  <td className="p-3 text-gray-500">{col.slug}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <Link
                        href={`/dashboard/collections/edit/${col.id}`}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit className="w-4 h-4" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(col.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
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
  );
}
