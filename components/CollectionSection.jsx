import Image from 'next/image';

export default function CollectionSection() {
  const items = [
    { title: 'Spring Collection', image: '/images/1/2J3A0408.jpg' },
    { title: 'Fall & Winter', image: '/images/12/2J3A0754.jpg' },
    { title: 'Bridal & Evening', image: '/images/14/2J3A0821.jpg' },
  ];

  return (
    <section className="bg-gray-50 py-20 px-6 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl tracking-wider mb-3">New Arrivals</h2>
        <p className="text-base text-gray-600 mb-12">
          Discover our latest designs where sophistication meets timeless elegance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={600}
                className="w-full h-[500px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold uppercase tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
