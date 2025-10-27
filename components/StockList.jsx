'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function StockList() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
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

    // Fade-up for all other sections
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
      <div className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="/pic4.JPG"
          alt="Mirah Stockists Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />
        <div className="relative text-center px-6">
          <h1 className="hero-title text-6xl md:text-7xl font-heading uppercase tracking-[0.25em] text-white">
            Stockists
          </h1>
          <p className="hero-subtitle text-lg md:text-xl mt-6 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover <span className="text-[#c6b197]">Mirah</span> pieces near you — available at select luxury boutiques worldwide.
          </p>
        </div>
      </div>

      {/* ================= STOCKLIST SECTION ================= */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-24 space-y-12">
        <h2 className="fade-up text-center text-3xl font-semibold text-gray-900 uppercase tracking-wide mb-10">
          Global Stockists
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="fade-up">
            <h3 className="text-xl font-medium text-gray-800">Harvey Nichols</h3>
            <p className="text-gray-600 mt-2">Dubai, UAE</p>
          </div>

          <div className="fade-up">
            <h3 className="text-xl font-medium text-gray-800">Galeries Lafayette</h3>
            <p className="text-gray-600 mt-2">Doha, Qatar</p>
          </div>

          <div className="fade-up">
            <h3 className="text-xl font-medium text-gray-800">Bloomingdale’s</h3>
            <p className="text-gray-600 mt-2">Kuwait City, Kuwait</p>
          </div>

          <div className="fade-up">
            <h3 className="text-xl font-medium text-gray-800">Ounass</h3>
            <p className="text-gray-600 mt-2">Online – UAE</p>
          </div>

          <div className="fade-up">
            <h3 className="text-xl font-medium text-gray-800">Harrods</h3>
            <p className="text-gray-600 mt-2">London, UK</p>
          </div>

          <div className="fade-up">
            <h3 className="text-xl font-medium text-gray-800">The Modist</h3>
            <p className="text-gray-600 mt-2">Online – Global</p>
          </div>
        </div>
      </div>

      {/* ================= MAP SECTION ================= */}
      <div className="fade-up bg-[#faf7f2] py-16 px-6 text-center">
        <h2 className="text-2xl font-medium text-gray-900 mb-6">
          Find a Store Near You
        </h2>
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.113254728398!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f041111111111%3A0x111111111111111!2sMirah%20Showroom!5e0!3m2!1sen!2s!4v0000000000000"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      </div>

      {/* ================= CTA SECTION ================= */}
      <div className="text-center py-24 fade-up">
        <a
          href="/contact"
          className="inline-block px-10 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition uppercase tracking-wider text-sm rounded-sm"
        >
          Become a Stockist
        </a>
      </div>
    </section>
  );
}
