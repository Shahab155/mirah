'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail({ product, language = 'en' }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const isRTL = language === 'ar';
  const zoomFactor = 2.2;
  const lensSize = 150;

  // Hover movement
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleMouseMove = (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLensPos({ x, y });
    };

    img.addEventListener('mousemove', handleMouseMove);
    img.addEventListener('mouseenter', () => setIsHovering(true));
    img.addEventListener('mouseleave', () => setIsHovering(false));

    return () => {
      img.removeEventListener('mousemove', handleMouseMove);
    };
  }, [selectedImage]);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
  }, [isFullscreen]);

  const translations = {
    en: {
      addToCart: 'Add to Cart',
      description: 'Description',
      details: 'Product Details',
      size: 'Size',
      quantity: 'Quantity',
      availableSizes: 'Available Sizes',
      selectSize: 'Select Size',
      relatedProducts: 'Related Products',
      backToShop: 'Back to Shop',
    },
    ar: {
      addToCart: 'إضافة إلى السلة',
      description: 'الوصف',
      details: 'تفاصيل المنتج',
      size: 'المقاس',
      quantity: 'الكمية',
      availableSizes: 'الأحجام المتاحة',
      selectSize: 'اختر المقاس',
      relatedProducts: 'منتجات ذات صلة',
      backToShop: 'العودة للتسوق',
    },
  };
  const t = translations[language];

  const handleAddToCart = async () => {
    if (!size) {
      alert('Please select a size');
      return;
    }

    setIsLoading(true);
    try {
      const cartItem = {
        id: product.id,
        name: product.title,
        image: selectedImage,
        price: product.price,
        quantity,
        size,
      };

      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = existingCart.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItemIndex >= 0) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/shop" className="text-gray-500 hover:text-[#c6b197] transition">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-gray-500 hover:text-[#c6b197] transition"
          >
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Product Images */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 w-full md:w-28 md:max-h-[500px] overflow-x-auto md:overflow-y-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-24 md:w-28 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? 'border-[#c6b197] ring-2 ring-[#c6b197]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div
              className="relative flex-1 cursor-zoom-in rounded-xl overflow-hidden shadow-md bg-white aspect-square flex items-center justify-center"
              onClick={() => setIsFullscreen(true)}
            >
              <Image
                ref={imgRef}
                src={selectedImage}
                alt={product.title}
                fill
                className="object-contain p-2 transition-transform duration-500 hover:scale-105"
              />

              {/* Hover Zoom Lens */}
              {isHovering && !isFullscreen && (
                <div
                  className="absolute border-2 border-gray-300 rounded-full pointer-events-none"
                  style={{
                    width: `${lensSize}px`,
                    height: `${lensSize}px`,
                    left: `${lensPos.x - lensSize / 2}px`,
                    top: `${lensPos.y - lensSize / 2}px`,
                    boxShadow: '0 0 8px rgba(0,0,0,0.2)',
                    backgroundImage: `url(${selectedImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: `${imgRef.current?.width * zoomFactor}px ${
                      imgRef.current?.height * zoomFactor
                    }px`,
                    backgroundPosition: `-${lensPos.x * (zoomFactor - 1)}px -${
                      lensPos.y * (zoomFactor - 1)
                    }px`,
                  }}
                />
              )}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading uppercase tracking-wide text-gray-900 mb-2">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-[#c6b197] mb-4">{product.price}</p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm text-gray-500">
                  {product.availability ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="text-sm text-gray-500">
                  {product.rating} ★ ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold uppercase tracking-wide text-gray-900">
                {t.description}
              </h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-900">
                {t.details}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">{t.size}:</span>
                  <div className="mt-1 space-y-1">
                    {product.sizes.map((sizeOption) => (
                      <label key={sizeOption} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="size"
                          value={sizeOption}
                          checked={size === sizeOption}
                          onChange={(e) => setSize(e.target.value)}
                          className="rounded border-gray-300 text-[#c6b197] focus:ring-[#c6b197]"
                        />
                        <span className="text-gray-700">{sizeOption}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">{t.quantity}:</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 pt-6 border-t">
              {size ? (
                <button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-lg font-semibold uppercase tracking-wide transition-all ${
                    isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gray-900 hover:bg-[#c6b197] text-white hover:text-gray-900'
                  }`}
                >
                  {isLoading ? 'Adding...' : t.addToCart}
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 px-6 bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed"
                >
                  {t.selectSize}
                </button>
              )}
            </div>

            {/* Info */}
            <div className="text-sm space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Material:</span> {product.material}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Care:</span> {product.care}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Category:</span> {product.category}
              </p>
            </div>
          </div>
        </div>

        {/* Fullscreen Zoom View */}
        {isFullscreen && (
          <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-[9999]">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 text-white text-3xl font-light hover:scale-110 transition"
            >
              ✕
            </button>
            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
              <Image src={selectedImage} alt="Zoomed Product" fill className="object-contain" />
            </div>
            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? 'border-[#c6b197]'
                      : 'border-transparent hover:border-gray-400'
                  }`}
                >
                  <Image src={img} alt={`Fullscreen ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 🛍️ Related Products Section */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-20 border-t pt-12">
            <h2 className="text-2xl font-semibold uppercase tracking-wide text-gray-900 mb-8">
              {t.relatedProducts}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {product.relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="group block border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#c6b197] transition">
                      {item.title}
                    </h3>
                    <p className="text-[#c6b197] font-semibold mt-2">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
