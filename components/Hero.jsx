"use client";
import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef(null);

  // Optimize video playback for performance
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.8; // Slightly slower playback to reduce CPU usage
      video.setAttribute('aria-hidden', 'true'); // Hide video from screen readers
    }
  }, []);

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white"
      role="banner"
      aria-label="Hero section for luxury modest fashion"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-3xl px-6 text-center flex flex-col items-center justify-center">
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-wider mb-4 leading-tight drop-shadow-lg">
          Luxury Modest Fashion
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-white/90 drop-shadow-md">
          Where modern silhouettes meet timeless elegance.
        </p>
        <a
          href="/shop"
          className="bg-[#c6b197] hover:bg-[#b79d82] text-white px-10 py-3 rounded-full text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl focus:outline-none  focus:ring-offset-2"
          aria-label="Shop now for luxury modest fashion"
        >
          Shop Now
        </a>
      </div>

      {/* Gradient for text contrast */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
    </section>
  );
}