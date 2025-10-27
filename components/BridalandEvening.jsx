'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CollectionPage() {
  const { collection } = useParams(); // e.g. "bridal-evening-25"
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load collection-specific data dynamically
    fetch(`/api/collections/${collection}.json`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading collection:', err);
        setLoading(false);
      });
  }, [collection]);

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
          {collection.replace(/-/g, ' ')}
        </h1>
        <br></br>
        <br></br>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900 mb-4">
  The Core Edit Collection 25–26
</h2>

<p className="text-base md:text-lg text-gray-600 font-light leading-relaxed tracking-wide">
  The Core Edit Collection by <span className="font-medium text-gray-800">Mirah</span> redefines modern modest fashion through timeless sophistication and effortless grace. 
  Each abaya, kaftan, and dress is thoughtfully designed to celebrate femininity, confidence, and contemporary elegance — crafted from premium fabrics with meticulous tailoring and graceful movement.
</p>

<p className="text-base md:text-lg text-gray-600 font-light leading-relaxed tracking-wide mt-4">
  From chic new arrivals to refined classics, every piece transitions seamlessly through the seasons. With soft textures, fluid silhouettes, and a harmonious neutral palette, 
  the Core Edit embodies a refined vision of modest wear — elegant, versatile, and enduringly stylish.
</p>

<p className="text-base md:text-lg text-gray-600 mt-4 font-light tracking-wide italic">
  Explore the {collection.replace(/-/g, ' ')} collection — timeless designs crafted for elegance and celebration.
</p>

      </div>

      {/* Products Grid */}
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {products.map((item) => (
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
