
'use client';
import { useState, useEffect } from 'react';

export default function FilterSidebar({
  availability,
  setAvailability,
  priceRange,
  setPriceRange,
  sort,
  setSort,
  language = 'en', // Added for multilingual support
}) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [error, setError] = useState('');

  // Translations for multilingual support
  const translations = {
    en: {
      filter: 'Filter',
      availability: 'Availability',
      all: 'All',
      inStock: 'In Stock',
      sortBy: 'Sort By',
      default: 'Default',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      priceRange: 'Price Range',
      min: 'Min',
      max: 'Max',
      reset: 'Reset Filters',
      error: 'Minimum price must be less than maximum price.',
    },
    ar: {
      filter: 'تصفية',
      availability: 'التوفر',
      all: 'الكل',
      inStock: 'متوفر',
      sortBy: 'ترتيب حسب',
      default: 'الافتراضي',
      priceAsc: 'السعر: من الأقل إلى الأعلى',
      priceDesc: 'السعر: من الأعلى إلى الأقل',
      priceRange: 'نطاق السعر',
      min: 'الحد الأدنى',
      max: 'الحد الأقصى',
      reset: 'إعادة تعيين الفلاتر',
      error: 'يجب أن يكون الحد الأدنى للسعر أقل من الحد الأقصى.',
    },
  };

  const t = translations[language];
  const isRTL = language === 'ar';

  // Sync localPriceRange with prop changes
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  // Handle price range input changes with validation
  const handlePriceChange = (index, value) => {
    const newValue = Math.max(0, Number(value) || 0); // Prevent negative or non-numeric values
    const newRange = [...localPriceRange];
    newRange[index] = newValue;
    setLocalPriceRange(newRange);

    // Validate min < max
    if (newRange[0] > newRange[1] && newRange[1] !== 0) {
      setError(t.error);
    } else {
      setError('');
      setPriceRange(newRange); // Update parent state only if valid
    }
  };

  // Handle reset filters
  const handleReset = () => {
    setAvailability('all');
    setSort('default');
    setPriceRange([0, 1000]); // Default range, adjust as needed
    setLocalPriceRange([0, 1000]);
    setError('');
  };

  return (
    <div className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm ${isRTL ? 'font-arabic text-right' : 'font-sans text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <h3 className="text-lg font-semibold mb-4">{t.filter}</h3>

      {/* Availability */}
      <div className="mb-6">
        <label htmlFor="availability" className="block text-sm font-medium mb-1">
          {t.availability}
        </label>
        <select
          id="availability"
          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#c6b197]"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          aria-label={t.availability}
        >
          <option value="all">{t.all}</option>
          <option value="in-stock">{t.inStock}</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="mb-6">
        <label htmlFor="sort" className="block text-sm font-medium mb-1">
          {t.sortBy}
        </label>
        <select
          id="sort"
          className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#c6b197]"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t.sortBy}
        >
          <option value="default">{t.default}</option>
          <option value="price-asc">{t.priceAsc}</option>
          <option value="price-desc">{t.priceDesc}</option>
        </select>
      </div>

      {/* Price Range Slider */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">{t.priceRange}</label>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <input
              type="number"
              className="w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#c6b197]"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              placeholder={t.min}
              min="0"
              aria-label={t.min}
            />
            <input
              type="number"
              className="w-1/2 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#c6b197]"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              placeholder={t.max}
              min="0"
              aria-label={t.max}
            />
          </div>
          <div className="relative">
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              min="0"
              max="1000" // Adjust max as needed
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              aria-label={`${t.min} price`}
            />
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
              min="0"
              max="1000" // Adjust max as needed
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              aria-label={`${t.max} price`}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full px-4 py-2 bg-gray-900 text-white rounded hover:bg-[#c6b197] transition"
        aria-label={t.reset}
      >
        {t.reset}
      </button>
    </div>
  );
}
