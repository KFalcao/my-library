"use client";

import Lottie from "lottie-react";
import bookPages from "@/components/animations/page-flip.json";



export default function Hero() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center px-8 pb-4 flex-grow">
      {/* Animação de fundo */}
      <Lottie
        animationData={bookPages}
        loop
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      
      {/* Top Text */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-58 mb-4 text-center">
        <h2 className="text-muted-foreground text-xl md:text-2xl font-raleway font-medium">
          Organize your reads
        </h2>
        <h2 className="text-muted-foreground text-xl md:text-2xl font-raleway font-medium">
          Share your discoveries
        </h2>
      </div>

      {/* Main Logo */}
      <div className="text-center mb-16">
        <h1 className="text-foreground text-6xl md:text-8xl lg:text-9xl font-raleway font-bold tracking-[0.07em] mb-8 leading-none">
          <span className="tracking-[-0.1em]">D</span>
          <span className="tracking-wider">.</span>LIBRARY
        </h1>

        {/* Bottom Text */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-24 lg:gap-38 text-accent-foreground justify-center">
          <span className="text-lg md:text-xl font-raleway font-semibold tracking-widest">
            DIGITAL
          </span>
          <span className="text-lg md:text-xl font-raleway font-semibold tracking-widest">
            DISCOVERY
          </span>
          <span className="text-lg md:text-xl font-raleway font-semibold tracking-widest">
            DEVELOPMENT
          </span>
        </div>
      </div>
    </main>
  );
}
