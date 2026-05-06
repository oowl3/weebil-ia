"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxCard({ 
  title, 
  description, 
  imgBack, 
  imgMid, 
  imgFore, 
  bgColorClass,
  id 
}) {
  const containerRef = useRef(null);

  // useGSAP maneja la limpieza automática y es seguro para React 18/19
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // El trigger es el contenedor principal
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
      },
    });

    // Selectores por clase dentro del scope (containerRef)
    tl.fromTo(".layer-bg", 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(".layer-mid",
      { y: 50, scale: 1.05, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, "-=1.0"
    )
    .fromTo(".layer-fore",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8"
    )
    .fromTo(".card-content", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5"
    )
    .fromTo(".anim-title",
      { x: (id % 2 === 0 ? 50 : -50), opacity: 0 }, // Alterna dirección según ID
      { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4"
    )
    .fromTo(".anim-line",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.3"
    )
    .fromTo(".anim-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.4"
    );

  }, { scope: containerRef }); // IMPORTANTE: Scope limita los selectores a este componente

  return (
    <section ref={containerRef} className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Background - Es el más grande, necesita calidad decente */}
        <div className="layer-bg absolute inset-0 w-full h-full">
          <Image 
            src={imgBack} 
            alt="Fondo" 
            fill 
            sizes="(max-width: 768px) 100vw, 100vw"
            quality={75}
            className="object-cover scale-100" 
          />
        </div>
        
        {/* Midground - Usualmente cubre menos área o detalle */}
        {imgMid && (
          <div className="layer-mid absolute top-1/4 w-full h-full">
            <Image 
              src={imgMid} 
              alt="Plano medio" 
              fill 
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover object-center" 
            />
          </div>
        )}
        
        {/* Foreground - Primer plano, requiere detalle */}
        <div className={`layer-fore absolute bottom-0 w-full ${id === 3 ? 'h-full' : 'h-2/3'}`}>
            <Image 
              src={imgFore} 
              alt="Primer plano" 
              fill 
              // Este elemento solo ocupa 2/3 de altura, pero el ancho es full
              sizes="(max-width: 768px) 100vw, 100vw"
              quality={80} 
              className="object-cover object-bottom" 
            />
        </div>
        
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* --- TARJETA CONTENIDO --- */}
      <div className={`card-content w-full max-w-sm min-h-[600px] mx-4 ${bgColorClass} backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-pink-500/60 flex flex-col justify-start pt-16 relative`}>
        
        {/* Decoración visual */}
        {/* CORRECCIÓN 1: bg-gradient-to-br -> bg-linear-to-br */}
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
        
        {/* CORRECCIÓN 2 y 3: Sintaxis de gradiente y variable simplificada */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-linear-to-r from-transparent via-(--intense-pink) to-transparent"></div>
        
        {/* CORRECCIÓN 4: flex-grow -> grow */}
        <div className="grow-[0.15]"></div>
        
        <div className="relative z-10 text-center space-y-8 px-4">
          <div className="relative overflow-hidden"> {/* Overflow hidden para mejor efecto de entrada */}
            <h2 className="anim-title text-7xl font-black text-white mb-4 text-center leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
              <span className="text-[35px]">{title}</span>
            </h2>
          </div>
        </div>

        {/* CORRECCIÓN 5: flex-grow -> grow */}
        <div className="grow-[0.06]"></div>
        
        <div className="anim-line relative">
          {/* CORRECCIÓN 6 y 7: Gradiente lineal y variable directa */}
          <div className="anim-line flex justify-center w-full">
            <div className="h-1.5 w-2/3 bg-linear-to-r bg-(--green-5) drop-shadow-[0_2px_2px_rgba(0,0,0,1)] mx-auto rounded-full shadow-lg"></div>
          </div>
          <div className="absolute inset-0 h-1.5 w-40 bg-white/30 blur-sm mx-auto rounded-full"></div>
        </div>

        {/* CORRECCIÓN 8: flex-grow -> grow */}
        <div className="grow-[0.15]"></div>
        
        <div className="anim-text flex justify-center w-full">
          <p className="text-xl text-white/95 leading-relaxed text-center font-medium tracking-wide max-w-[90%] mx-auto">
            <span className="text-[25px]">{description}</span>
          </p>
        </div>
      </div>
    </section>
  );
}