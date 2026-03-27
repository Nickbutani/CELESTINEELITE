import React from "react";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen">
    
      <Image
        src="/images/watch.jpg"
        alt="Luxury Ring"
        className="absolute inset-0 w-200 h-200 object-cover"
        fill
        priority
      />

      <div className="absolute inset-0 bg-black/70"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 max-w-6xl">
        <h1 className="text-white text-4xl md:text-6xl font-light leading-tight mb-6">
          Timeless Elegance <br />
          <span className="font-semibold">Crafted to Shine</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-8">
          Discover exquisite jewelry designed to capture moments that last forever.
        </p>

        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition">
            Explore Collection
          </button>

          <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition">
            View Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;