import './globals.css';

export const metadata = {
  title: 'Mirah | Luxury Modest Fashion',
  description: 'Mirah is a luxury ready to wear brand by Doaa Alghouti featuring elegant modest fashion with unique embellishment details and modern silhouettes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>{children}</body>
    </html>
  );
}