'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DressesCategoryPage() {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/categories/dresses.json')
      .then((res) => res.json())
      .then((data) => {
        setDresses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center py-20 text-gray-600 tracking-wider">
        Loading...
      </p>
    );

  return (
    <section className="min-h-screen bg-white py-20 px-6 md:px-16">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading uppercase tracking-[0.25em] text-gray-900">
          Dresses
        </h1>
        <p className="text-base md:text-lg text-gray-600 mt-4 font-light tracking-wide">
          Discover our Fall/Winter 25 Collection — timeless silhouettes & refined elegance.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {dresses.map((item) => (
          <Link
            key={item.id}
            href={`/shop/product/${item.id}`}
            className="group block cursor-pointer"
          >
            <div className="relative bg-white overflow-hidden rounded-none transition-all duration-300">
              {/* Main Image */}
              <img
                src={item.images?.[0] || item.image}
                alt={item.title}
                className="w-full h-[550px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Image */}
              {item.images && item.images[1] && (
                <img
                  src={item.images[1]}
                  alt={`${item.title} alternate`}
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                />
              )}
            </div>

            {/* Product Info */}
            <div className="text-center mt-4 space-y-1">
              <h3 className="text-sm uppercase tracking-widest text-gray-900 font-light group-hover:opacity-70 transition-opacity duration-300">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs tracking-wider">{item.category}</p>
              <p className="text-[#c6b197] font-medium tracking-wide text-sm">
                {item.price} <span className="text-gray-500 text-xs font-light">AED</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
