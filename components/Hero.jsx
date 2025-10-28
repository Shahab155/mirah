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

   

   
    </section>
  );
}