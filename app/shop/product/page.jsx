'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <>
    <Header/>
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#c6b197]">
        🛒 Explore Our Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-60 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{p.name}</h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{p.description}</p>
              <p className="font-bold text-[#c6b197] text-lg">Rs. {p.price}</p>
              <button className="mt-4 w-full bg-[#c6b197] text-white py-2 rounded-lg hover:bg-[#b79d82] transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}
