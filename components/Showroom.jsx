'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Showroom() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.fade-up', {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.fade-up',
        start: 'top 85%',
      },
    });
  }, []);

  return (
    <section className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative text-center py-24 fade-up">
        <h1 className="text-5xl font-heading uppercase tracking-widest text-gray-900">
          The Mirah Showroom
        </h1>
        <p className="mt-6 text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
          Discover the world of Mirah — where art, design, and elegance meet.
          Visit our showroom and experience the timeless craftsmanship of our
          collections in person.
        </p>
      </div>

      {/* Map Section */}
      <div className="fade-up px-6 md:px-20 lg:px-28">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            title="Mirah Showroom Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.057631827368!2d46.70743527521003!3d24.741226877993374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03b7a4ebcbcb%3A0x96a847d3f436e7de!2sAnatomi!5e0!3m2!1sen!2s!4v1694448481023!5m2!1sen!2s"
            width="100%"
            height="500"
            className="border-0 w-full"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Address + Contact Info */}
      <div className="max-w-4xl mx-auto px-6 py-20 fade-up text-center">
        <h2 className="text-3xl font-heading uppercase tracking-wide text-gray-900 mb-6">
          Visit Us
        </h2>

        <p className="text-gray-600 leading-relaxed mb-10">
          <strong>Mirah Showroom</strong>
          <br />
          2567, Al Khalidiyah Street, Riyadh, Saudi Arabia
          <br />
          <span className="text-[#c6b197] font-medium">Open Daily:</span> 10 AM – 10 PM
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-gray-700">
          <a
            href="mailto:info@mirahfashion.com"
            className="hover:text-[#c6b197] transition"
          >
            info@mirahfashion.com
          </a>
          <a
            href="tel:+966500000000"
            className="hover:text-[#c6b197] transition"
          >
            +966 50 000 0000
          </a>
        </div>

        <div className="mt-12">
          <a
            href="/contact"
            className="inline-block px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition uppercase tracking-wider text-sm rounded-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
