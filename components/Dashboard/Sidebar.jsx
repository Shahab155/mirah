'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Overview', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4 4h8" /></svg> },
    { href: '/dashboard/collections', label: 'Collections', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-9 6h9" /></svg> },
    { href: '/dashboard/products', label: 'Products', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" /></svg> },
    { href: '/dashboard/categories', label: 'Categoires', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
</svg>
 },
    { href: '/dashboard/orders', label: 'Orders', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18m-9 5h9" /></svg> },
    { href: '/dashboard/analytics', label: 'Analytics', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" /></svg> },
    { href: '/dashboard/settings', label: 'Settings', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v22m11-11H1" /></svg> },
  ];

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-b from-white/95 to-[#f7f5f3] border-r border-gray-200 shadow-xl transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col min-h-screen`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.JPG"
            alt="Mirah Logo"
            className={`w-10 h-10 rounded-md shadow-md transition-all duration-300 ${!isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
          />
          <h2 className={`font-heading text-2xl tracking-wider text-[#c6b197] transition-opacity ${!isOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            
          </h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-[#c6b197]/10 transition">
          <svg className={`w-6 h-6 text-[#c6b197] ${!isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 space-y-1 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-[#c6b197]/20 rounded-r-lg transition-all duration-200 ${
              pathname === item.href ? 'bg-[#c6b197]/30 text-[#c6b197] font-semibold' : ''
            }`}
          >
            <span className="text-xl mr-4 text-[#c6b197]">{item.icon}</span>
            <span className={`text-sm transition-opacity ${!isOpen ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 mt-4">
        <Link
          href="/"
          className="flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition shadow-md"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
          {isOpen && <span>Logout</span>}
        </Link>
      </div>
    </motion.div>
  );
}
