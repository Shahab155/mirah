import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Collections from '@/components/Collections';
import CollectionSection from '@/components/CollectionSection';
import Footer from '@/components/Footer';
// import AboutSection from '@/components/AboutSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="announcement bg-black text-white text-center py-2 text-sm">
        Free shipping on orders over AED 500
      </div>
      <Header />
      <Hero />
      <Collections />
      {/* <AboutSection />  */}
      <CollectionSection />
      <Footer />
    </div>
  );
}