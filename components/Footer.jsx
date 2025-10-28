"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-[#f9f9f9] text-[#1c1c1c] pt-16 pb-10 px-6 border-t border-gray-200">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c6b197] via-[#f0e6d2] to-[#c6b197]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand / Logo Section */}
        <div>
          <h2 className="font-serif text-2xl tracking-wide text-[#c6b197] mb-3">
            Mirah
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Elevate your style with timeless elegance and craftsmanship. Discover
            the essence of Mirah — where fashion meets sophistication.
          </p>

          {/* Social Icons */}
         <div className="flex space-x-4 mt-4">
  {[
    {
      Icon: FaInstagram,
      href: "https://www.instagram.com/themirah.ae",
      color: "#E4405F", // Instagram pink
    },
    {
      Icon: FaFacebookF,
      href: "https://www.facebook.com/share/1BR8dT1tXK",
      color: "#1877F2", // Facebook blue
    },
    {
      Icon: FaTwitter,
      href: "https://x.com/",
      color: "#1DA1F2", // Twitter blue
    },
    {
      Icon: FaYoutube,
      href: "https://youtube.com/",
      color: "#FF0000", // YouTube red
    },
  ].map(({ Icon, href, color }, i) => (
    <motion.a
      whileHover={{ scale: 1.1 }}
      key={i}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full border border-gray-300 transition-colors duration-300"
      style={{
        borderColor: "#d1d5db",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = color;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#1c1c1c";
        e.currentTarget.style.borderColor = "#d1d5db";
      }}
    >
      <Icon size={18} />
    </motion.a>
  ))}
</div>

        </div>

        {/* About Section */}
        <div>
          <h4 className="text-lg font-semibold text-[#c6b197] mb-4">
            About Mirah
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { name: "The Brand", href: "/about/thebrand" },
              { name: "Blog", href: "/about/blog" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-[#c6b197] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care Section */}
        <div>
          <h4 className="text-lg font-semibold text-[#c6b197] mb-4">
            Customer Care
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Contact Us", href: "/contact" },
              { name: "FAQS", href: "/faqs" },
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms & Conditions", href: "/terms-and-conditions" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-[#c6b197] transition"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Section (Responsive Fix Applied) */}
        <div>
          <h4 className="text-lg font-semibold text-[#c6b197] mb-4">
            Stay Updated
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to receive exclusive updates, offers, and style inspiration.
          </p>

          <form className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#c6b197] w-full"
            />
            <button
              type="submit"
              className="bg-[#c6b197] text-white text-sm px-4 py-2 rounded-md hover:bg-[#b59a82] transition w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-12 text-center text-xs text-gray-500 border-t border-gray-200 pt-6">
        © {new Date().getFullYear()} Mirah. All rights reserved.
      </div>
    </footer>
  );
}
