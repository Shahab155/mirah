'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Blogs() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    gsap.from('.hero-title', {
      y: 80,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.4,
    });

    gsap.from('.hero-subtitle', {
      y: 40,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.8,
    });

    // Scroll animations
    gsap.utils.toArray('.fade-up').forEach((el) => {
      gsap.from(el, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
    });
  }, []);

  return (
    <section className="min-h-screen bg-white text-gray-900 overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-[85vh] flex  items-center justify-center overflow-hidden">
        <img
          src="/pic1.JPG"
          alt="Mirah Blogs Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />
        <div className="relative text-center px-6">
          <h1 className="hero-title text-6xl md:text-7xl font-heading uppercase tracking-[0.25em] text-white">
            Blogs
          </h1>
          <p className="hero-subtitle text-lg md:text-xl mt-6 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Celebrating moments where <span className="text-[#c6b197]">Mirah</span> meets the world — through stories of art, elegance, and vision.
          </p>
        </div>
      </div>

      {/* ================= Blogs FEATURES ================= */}
      <div className="max-w-6xl mx-auto px-6 md:px-16 py-24">
        <h2 className="fade-up text-center text-3xl font-semibold text-gray-900 uppercase tracking-wide mb-16">
          Featured In
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Blogs CARD 1 */}
          <div className="fade-up group relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/pic1.JPG"
              alt="Vogue Arabia Feature"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-lg font-semibold">Vogue Arabia</h3>
                <p className="text-sm text-gray-200 mt-1">
                  “Mirah — redefining the essence of modest luxury.”
                </p>
              </div>
            </div>
          </div>

          {/* Blogs CARD 2 */}
          <div className="fade-up group relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/pic2.JPG"
              alt="Harper’s Bazaar"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-lg font-semibold">Harper’s Bazaar</h3>
                <p className="text-sm text-gray-200 mt-1">
                  “A poetic narrative woven into every silhouette.”
                </p>
              </div>
            </div>
          </div>

          {/* Blogs CARD 3 */}
          <div className="fade-up group relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/pic4.JPG"
              alt="Elle Middle East"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-lg font-semibold">Elle Middle East</h3>
                <p className="text-sm text-gray-200 mt-1">
                  “Mirah’s designs reflect a harmony of grace and power.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= QUOTE SECTION ================= */}
      <div className="fade-up text-center py-24 bg-[#faf7f2]">
        <p className="text-xl italic text-gray-700 max-w-3xl mx-auto leading-relaxed">
          “Every feature is a testament to Mirah’s journey — where design becomes an experience, not just a garment.”
        </p>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="text-center py-24 fade-up">
        <a
          href="/contact"
          className="inline-block px-10 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition uppercase tracking-wider text-sm rounded-sm"
        >
          For Media Inquiries
        </a>
      </div>
    </section>
  );
}
