'use client';
import Sidebar from '../../components/Dashboard/Sidebar';
import Header from '../../components/Dashboard/Header';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-br from-[#faf8f6] via-white to-[#f3f0ec] flex overflow-hidden"
    >
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-white/80 backdrop-blur-sm rounded-tl-3xl shadow-inner">
          {children}
        </main>
      </div>
    </motion.div>
  );
}
