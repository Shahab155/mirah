import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/product/${product.slug}`}>
        <div className="relative pb-[100%] overflow-hidden">
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-sm font-medium text-gray-800">{product.name}</h2>
          <p className="mt-1 text-sm text-gray-600">AED {product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
}
