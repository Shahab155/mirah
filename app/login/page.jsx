'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setCookie } from 'nookies';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (email === 'admin@mirah.com' && password === 'mirah123') {
      setCookie(null, 'mirah_token', 'fake-jwt-token', {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/pic1.JPG"
          alt="Fashion Background"
          className="w-full h-full object-cover opacity-60 blur-sm"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col lg:flex-row w-full max-w-6xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden p-4 sm:p-8 md:p-10"
      >
        {/* Left Side Image */}
        <div className="hidden lg:block lg:w-1/2 rounded-2xl overflow-hidden">
          <img
            src="/pic2.JPG"
            alt="Fashion Side"
            className="w-full h-full object-cover transform hover:scale-105 transition duration-700"
          />
        </div>

        {/* Right Side Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex w-full lg:w-1/2 justify-center items-center py-10 sm:py-12 px-4 sm:px-8"
        >
          <div className="w-full max-w-md space-y-6 sm:space-y-8">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl font-bold text-[#c6b197] text-center"
            >
              Mirah Dashboard
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 text-center text-sm sm:text-base"
            >
              Sign in to manage your collections
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Email */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mirah.com"
                  required
                  className="w-full px-4 sm:px-5 py-3 border border-gray-300 rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-[#c6b197] focus:outline-none transition"
                />
              </motion.div>

              {/* Password */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="mirah123"
                  required
                  className="w-full px-4 sm:px-5 py-3 border border-gray-300 rounded-2xl text-sm sm:text-base focus:ring-2 focus:ring-[#c6b197] focus:outline-none transition"
                />
              </motion.div>

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#c6b197] to-[#b79d82] text-white font-medium rounded-2xl hover:from-[#b79d82] hover:to-[#c6b197] transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </motion.button>
            </form>

            {/* Forgot Password */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-sm text-gray-600 mt-6"
            >
              <Link href="/forgot-password" className="text-[#c6b197] hover:underline">
                Forgot Password?
              </Link>
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
