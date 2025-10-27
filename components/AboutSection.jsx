'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="w-full bg-white text-gray-900 overflow-hidden">
      {/* Banner / Hero Image */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden">
        <Image
          src="/pic1.JPG"
          alt="About Mirah"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-4xl md:text-5xl text-white font-[Poppins] tracking-widest uppercase"
        >
          About Mirah
        </motion.h1>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="max-w-5xl mx-auto px-6 py-16 md:py-24"
      >
        <h2 className="font-[Poppins] text-3xl md:text-4xl tracking-wide mb-6 text-gray-900 uppercase">
          About the Brand
        </h2>

<p className="text-base md:text-lg text-gray-700 leading-relaxed mb-10">
  Born from a love of refined simplicity, <span className="font-semibold text-gray-900">Mirah</span> celebrates women who
  find beauty in understated elegance. Our collections embody a harmonious blend of modern sophistication, timeless
  silhouettes, and minimalist details that reflect effortless grace.
  <br /><br />
  Each piece is thoughtfully designed to embrace modesty while celebrating contemporary style. Guided by integrity,
  craftsmanship, and purpose, <span className="font-semibold text-gray-900">Mirah</span> is committed to creating garments
  that honor individuality and empower women to express their true selves with confidence.
  <br /><br />
  At <span className="font-semibold text-gray-900">Mirah</span>, fashion is not merely about appearance — it is an art form,
  a language of authenticity and quiet strength that redefines what it means to be truly elegant.
</p>


        {/* Image Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="overflow-hidden rounded-lg">
            <Image
              src="/pic2.JPG"
              alt="Mirah Design Detail"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>

          <div className="overflow-hidden rounded-lg">
            <Image
              src="/pic4.jpg"
              alt="Mirah Studio Look"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg transition-transform duration-700 hover:scale-105"
              priority
            />
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
        >
          <div className="space-x-4 mb-4 md:mb-0">
            <a href="/faqs" className="hover:text-gray-900 transition-colors">FAQs</a>
            <a href="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="/terms-of-service" className="hover:text-gray-900 transition-colors">Terms</a>
          </div>
          <div>
            © {new Date().getFullYear()} <span className="font-medium text-gray-800">Mirah</span> • All Rights Reserved
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
