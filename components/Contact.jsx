"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // 🔹 Fade-Up Animation for Text and Form
    gsap.fromTo(
      section.querySelectorAll(".fade-up"),
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 🔹 Optional Parallax Animation for Hero Image
    gsap.to(heroRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white text-gray-900 overflow-hidden">
      {/* 🖼️ Hero Section with Parallax */}
      <div className="relative w-full h-[450px] md:h-[500px] overflow-hidden">
        <div ref={heroRef} className="absolute inset-0">
          <Image
            src="/pic4.JPG" // Replace with your banner image from public folder
            alt="Contact Mirah"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl text-white font-[Poppins] tracking-wide fade-up">
          CONTACT MIRAH
        </h1>
      </div>

      {/* 📩 Contact Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-[Poppins] tracking-wide mb-6 text-gray-900 fade-up">
          Get in Touch
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12 fade-up">
          We’d love to hear from you. Whether you have a question about our collections,
          orders, or upcoming launches — our team is here to help. Fill out the form below,
          and we’ll get back to you shortly.
        </p>

        {/* ✉️ Contact Form */}
        <form className="space-y-6 fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black w-full"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black w-full"
              required
            />
          </div>
          <textarea
            placeholder="Your Message"
            rows="6"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black w-full"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-lg uppercase tracking-wide text-sm hover:bg-gray-800 transition-all duration-300 fade-up"
          >
            Send Message
          </button>
        </form>

        {/* 🕰️ Contact Details Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center fade-up">
          <div>
            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-700">support@mirah.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-700">+971 58 822 0855</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-700">Mirah, Dubai, UAE</p>
          </div>
        </div>

        {/* ⚖️ Footer Section */}
        <div className="mt-20 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 fade-up">
          <div className="space-x-4 mb-4 md:mb-0">
            <a href="/faqs" className="hover:text-gray-900">
              FAQs
            </a>
            <a href="/privacy-policy" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="/terms-of-service" className="hover:text-gray-900">
              Terms
            </a>
          </div>
          <div>© {new Date().getFullYear()} Mirah • Crafted with Elegance</div>
        </div>
      </div>
    </section>
  );
}
