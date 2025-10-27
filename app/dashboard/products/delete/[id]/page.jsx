'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DeleteProductPage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const confirmDelete = async () => {
      if (confirm('Delete this product?')) {
        await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        alert('Product deleted!');
        router.push('/dashboard/products/list');
      } else {
        router.push('/dashboard/products/list');
      }
    };
    confirmDelete();
  }, [id, router]);

  return <div className="p-6">Deleting product...</div>;
}
