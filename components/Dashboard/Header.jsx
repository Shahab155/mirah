'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search, LogOut } from 'lucide-react';
import { destroyCookie } from 'nookies';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    destroyCookie(null, 'mirah_token');
    window.location.href = '/';
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-white/90 shadow-md border-b border-gray-100 px-8 py-5 backdrop-blur-lg"
    >
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search collections or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b197] focus:border-transparent w-80 transition-all duration-200"
            />
            <Search className="absolute right-4 top-3.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Profile / Logout Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-6"
        >
          <span className="text-sm font-medium text-gray-700">Welcome, Admin</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-[#c6b197] transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>
      </div>
    </motion.header>
  );
}
