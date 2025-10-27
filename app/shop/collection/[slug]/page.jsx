'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CollectionPage() {
  const { slug } =  useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/collections/${slug}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
  <>
    <Header/>

      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-gray-500 text-lg tracking-wide">Loading collection...</p>
      </div>
      <Footer/>
  </>
    );

  return (
    <>
    <Header/>
    <section className="max-w-7xl mx-auto py-10 px-6">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl md:text-5xl tracking-wider mb-4 text-gray-900 capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600 text-base">
          Discover timeless pieces curated for the {slug.replace(/-/g, ' ')} collection.
        </p>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products found in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={p.image_url || '/placeholder.png'}
                alt={p.name}
                width={500}
                height={600}
                className="w-full h-[480px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center">
                <h2 className="text-white text-2xl font-semibold uppercase tracking-wide mb-2">
                  {p.name}
                </h2>
                <p className="text-gray-200 text-sm px-6 line-clamp-2">{p.description}</p>
                <p className="text-[#c6b197] font-semibold mt-4 text-lg">${p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
      <Footer/>

    </>
  );
}
