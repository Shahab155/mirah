'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TheBrand() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Text animations on scroll
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

      {/* ================= HERO IMAGE ONLY ================= */}
      <div className="relative w-full h-[85vh] overflow-hidden fade-up">
        <img
          src="/pic1.JPG"
          alt="Mirah Brand Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
        />
      </div>

      {/* ================= TITLE & SUBTITLE ================= */}
      <div className="text-center mt-20 px-6 fade-up">
        <h1 className="text-6xl md:text-7xl font-heading uppercase tracking-[0.25em] text-gray-900">
          The Brand
        </h1>
        <p className="text-lg md:text-xl mt-6 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Designing for the moving eye — where elegance meets emotion, and
          every detail is a work of art.
        </p>
      </div>

      {/* ================= BRAND STORY SECTION ================= */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-24 text-center space-y-12">
        <p className="fade-up text-gray-700 leading-relaxed text-lg">
          <span className="text-[#c6b197] font-medium">Mirah</span> is devoted to
          creating a wardrobe of haute and timeless pieces that leave a lasting impression. 
          Each design is envisioned as a visual poem — balancing modern femininity with
          quiet sophistication.
        </p>

        <p className="fade-up text-gray-700 leading-relaxed text-lg">
          Inspired by the rhythm of nature and its perfect imperfections,
          <span className="text-[#c6b197] font-medium"> Mirah</span> finds beauty in the unseen.
          Every thread and silhouette tells a story — one of strength, grace, and individuality.
        </p>

        <p className="fade-up text-gray-700 leading-relaxed text-lg">
          <span className="text-[#c6b197] font-medium">Mirah’s</span> aesthetic transcends fashion —
          redefining modest luxury through artful design and refined craftsmanship.
        </p>
      </div>

      {/* ================= QUOTE SECTION ================= */}
      <div className="fade-up text-center py-24 bg-[#faf7f2]">
        <p className="text-xl italic text-gray-700 max-w-3xl mx-auto leading-relaxed">
          “At Mirah, every creation is more than attire — it’s an expression of emotion,
          art, and timeless femininity.”
        </p>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="text-center py-24 fade-up">
        <a
          href="/showroom"
          className="inline-block px-10 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition uppercase tracking-wider text-sm rounded-sm"
        >
          Visit Our Showroom
        </a>
      </div>
    </section>
  );
}
