'use client';
import { useState, useRef, useEffect } from 'react';

export default function ProductZoom({ images = [], caption = "Elegant Dress — Fine Silk Material" }) {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);

  // 🧭 Handle zoom wheel
  const handleWheel = (e) => {
    e.preventDefault();
    setZoom((prev) => Math.max(1, Math.min(prev + e.deltaY * -0.001, 4)));
  };

  // 🖱️ Handle dragging for panning image
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    setOffset({ x: e.clientX - start.x, y: e.clientY - start.y });
  };

  const handleMouseUp = () => setDragging(false);

  // 🧩 Disable body scroll when modal open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      document.body.style.overflow = 'auto';
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isModalOpen]);

  if (!selectedImage) return null;

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* 🖼️ Main Image */}
      <div
        className="relative overflow-hidden cursor-zoom-in rounded-xl shadow-md bg-white aspect-square flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          ref={imgRef}
          src={selectedImage}
          alt="Product"
          className="w-full h-auto object-contain transition-transform duration-300"
        />
      </div>

      {/* 🧩 Thumbnails */}
      <div className="flex justify-center gap-3 mt-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Thumbnail ${i + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-16 h-16 object-cover rounded-md border-2 cursor-pointer transition ${
              selectedImage === img
                ? 'border-gray-900'
                : 'border-transparent hover:border-gray-400'
            }`}
          />
        ))}
      </div>

      {/* 🔍 Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-6"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
        >
          {/* ✖ Close Button */}
          <button
            onClick={() => {
              setIsModalOpen(false);
              setZoom(1);
              setOffset({ x: 0, y: 0 });
            }}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-gray-300"
          >
            &times;
          </button>

          {/* 🖋️ Caption Section (MagicZoomPlus Style) */}
          <div className="text-center text-white mb-4 max-w-3xl px-4">
            <h2 className="text-2xl font-semibold mb-2 tracking-wide">
              Product Preview
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">{caption}</p>
          </div>

          {/* 🖼️ Zoomed Image */}
          <div className="relative w-full max-w-5xl h-[80vh] overflow-hidden flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Zoomed"
              style={{
                transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                transition: dragging ? 'none' : 'transform 0.2s ease',
                cursor: dragging ? 'grabbing' : 'grab',
              }}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* ➕ Zoom Controls */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
              className="text-white border border-white rounded-full px-3 py-1 hover:bg-white hover:text-black"
            >
              −
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(4, z + 0.2))}
              className="text-white border border-white rounded-full px-3 py-1 hover:bg-white hover:text-black"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
