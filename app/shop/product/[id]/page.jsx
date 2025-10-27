
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

async function getProductById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/categories/dresses.json`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found - Mirah',
    };
  }

  return {
    title: `${product.title} - Mirah`,
    description: product.description,
    openGraph: {
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params, searchParams }) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const language = searchParams.lang === 'ar' ? 'ar' : 'en';

  return (
    <>
      <Header />
      <ProductDetail product={product} language={language} />
      <Footer />
    </>
  );
}
