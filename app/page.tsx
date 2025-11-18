"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  
  // Refs para la primera tarjeta
  const card1Ref = useRef(null);
  const title1Ref = useRef(null);
  const line1Ref = useRef(null);
  const text1Ref = useRef(null);
  const background1Ref = useRef(null);
  const midground1Ref = useRef(null);
  const foreground1Ref = useRef(null);
  
  // Refs para la segunda tarjeta
  const card2Ref = useRef(null);
  const title2Ref = useRef(null);
  const line2Ref = useRef(null);
  const text2Ref = useRef(null);
  const background2Ref = useRef(null);
  const midground2Ref = useRef(null);
  const foreground2Ref = useRef(null);
  
  // Refs para la tercera tarjeta
  const card3Ref = useRef(null);
  const title3Ref = useRef(null);
  const line3Ref = useRef(null);
  const text3Ref = useRef(null);
  const background3Ref = useRef(null);
  const midground3Ref = useRef(null);
  const foreground3Ref = useRef(null);

  useEffect(() => {
    // Animación para la tarjeta 1 - Con fotografías reales
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: card1Ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      }
    });
    
    tl1.fromTo(background1Ref.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(midground1Ref.current,
      { y: 50, scale: 1.05, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=1.0"
    )
    .fromTo(foreground1Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(card1Ref.current, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(title1Ref.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(line1Ref.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(text1Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );

    // Animación para la tarjeta 2 - Con fotografías reales
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: card2Ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      }
    });
    
    tl2.fromTo(background2Ref.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(midground2Ref.current,
      { y: 50, scale: 1.05, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=1.0"
    )
    .fromTo(foreground2Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(card2Ref.current, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(title2Ref.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(line2Ref.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(text2Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );

    // Animación para la tarjeta 3 - Con fotografías reales
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: card3Ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      }
    });
    
    tl3.fromTo(background3Ref.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
    )
    .fromTo(midground3Ref.current,
      { y: 50, scale: 1.05, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      "-=1.0"
    )
    .fromTo(foreground3Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(card3Ref.current, 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(title3Ref.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(line3Ref.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(text3Ref.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-sand-3" ref={containerRef}>
      
      {/* --- SECCIÓN 1: PORTADA --- */}
      <section className='relative min-h-screen overflow-hidden'>
        
        {/* --- video --- */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            src="/alacran_arena.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </div>

        {/* --- Contenido de la Pagina Principal --- */}
        <div className="relative z-20 flex flex-col min-h-screen text-white text-center px-4">
          
          {/* MARGEN PARA TÍTULO */}
          <div className="flex-grow-[1]"></div>

          {/* --- BLOQUE DEL TÍTULO --- */}
          <div className="flex flex-col items-center">
            
            {/* Fondo transparente */}
            <div className="bg-[var(--sand-3)]/20 backdrop-blur-sm rounded-2xl p-10 max-w-md mx-auto">
              
              {/* Título */}
              <h1 
                className="text-8xl font-bold mb-8 flex items-center justify-center"
                role="heading"
              >
                <span className="text-[var(--intense-pink)] text-[120px] leading-none">W</span>
                <span className="text-[var(--black-deep)] text-[120px] leading-none">e</span>
                <span className="text-[var(--black-deep)] text-[120px] leading-none">e</span>
                <span className="text-[var(--black-deep)] text-[120px] leading-none">b</span>
                <span className="text-[var(--green-light)] text-[120px] leading-none">i</span>
                <span className="text-[var(--green-light)] text-[120px] leading-none">l</span>
              </h1>

              {/* Línea divisoria */}
              <div className="h-1 w-full bg-[var(--intense-pink)] mb-8 mx-auto"></div>

              {/* Descripción */}
              <p className="text-lg font-medium leading-relaxed text-center text-[var(--black-deep)]">
                Detecta especies peligrosas y<br />
                actúa con confianza.
              </p>
            </div>
          </div>

          {/* SEPARA TÍTULO DEL BOTÓN */}
          <div className="flex-grow-[7]"></div>

          {/* --- BOTÓN (rosa) --- */}
          <div className="flex flex-col items-center">
            <div className="flex justify-center">
              <a
                href="/Inicio"
                className="font-bold text-white 
                          py-5 px-24
                          bg-[var(--intense-pink)] 
                          rounded-xl
                          text-2xl
                          active:scale-95 
                          transition-all duration-150
                          select-none touch-manipulation
                          flex items-center justify-center
                          min-w-[185px]
                          min-h-[50px]"
                          
              >
                Continuar
              </a>
            </div>
          </div>
          
          {/* MARGEN PARA BOTÓN */}
          <div className="flex-grow-[1]"></div>

        </div>
      </section>

      {/* --- SECCIÓN 2: TARJETAS CON INFORMACION DE LA APP --- */}
      
      {/* TARJETA 1 - PUENTE DE DURANGO */}
      <section className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
        {/* FONDO - EFECTO PARALLAX */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          
          {/* CAPA 1 */}
          <img 
            ref={background1Ref}
            src="/images/tarjeta1/cielo_background.png"
            alt="Puente de Durango - fondo"
            className="absolute inset-0 w-full h-full object-cover scale-125"
          />
          
          {/* CAPA 2 */}
          <img 
            ref={midground1Ref}
            src="/images/tarjeta1/mont_v.png"
            alt="Puente de Durango - medio"
            className="absolute top-1/4 w-full h-full object-cover object-center"
          />
          
          {/* CAPA 3 */}
          <img 
            ref={foreground1Ref}
            src="/images/tarjeta1/puente_durango.png"
            alt="Puente de Durango - primer plano"
            className="absolute bottom-0 w-full h-2/3 object-cover object-bottom"
          />
          
        
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* TARJETA 1 */}
        <div 
          ref={card1Ref}
          className="w-full max-w-sm min-h-[600px] mx-4 bg-[var(--green-dark)]/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-pink-500/60 flex flex-col justify-start pt-16"
        >
          {/* brillo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[var(--intense-pink)] to-transparent"></div>
            <div className="flex-grow-[0.15]"></div>
          
          <div className="relative z-10 text-center space-y-8 px-4">
            {/* TÍTULO  */}
            <div className="relative">
              <h2 
                ref={title1Ref} 
                className="text-7xl font-black text-white mb-4 text-center leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
              >
                <span className="text-[35px]">¿Qué es Weebil?</span>
              </h2>
            </div>
          </div>


          <div className="flex-grow-[0.06]"></div>
           {/* LÍNEA  */}
            <div ref={line1Ref} className="relative">
              <div className="h-1.5 w-full bg-gradient-to-r bg-[var(--intense-pink)] mx-auto rounded-full shadow-lg"></div>
              <div className="absolute inset-0 h-1.5 w-40 bg-white/30 blur-sm mx-auto rounded-full"></div>
            </div>


          <div className="flex-grow-[0.15]"></div>
          {/* TEXTO  */}
            <div ref={text1Ref} className="space-y-6 mt-auto pb-4">
              <p className="text-xl text-white/95 leading-relaxed text-center font-medium tracking-wide">
                <span className="text-[25px]">Weebil es tu compañero inteligente 
                para identificarespecies peligrosas en tiempo real usando
                tecnología de vanguardia.</span>
              </p>
            </div>
        </div>
      </section>

      {/* TARJETA 2 - DESIERTO DE DURANGO */}
      <section className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
        
        {/* FONDO - EFECTO PARALLAX */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          
          {/* CAPA 1 */}
          <img 
            ref={background2Ref}
            src="/images/tarjeta2/cielo_bg2.png"
            alt="Desierto de Durango - fondo"
            className="absolute inset-0 w-full h-full object-cover scale-125"
          />
          
          {/* CAPA 2 */}
          <img 
            ref={midground2Ref}
            src="/images/tarjeta2/mont_md2.png"
            alt="Desierto de Durango - medio"
            className="absolute top-80 w-full h-full object-cover object-center"
          />
          
          {/* CAPA 3 */}
          <img 
            ref={foreground2Ref}
            src="/images/tarjeta2/desierto.png"
            alt="Desierto de Durango - primer plano"
            className="absolute bottom-0 w-full h-2/3 object-cover object-bottom"
          />
          
          
          <div className="absolute inset-0 bg-black/15"></div>
        </div>

        {/* TARJETA 2 */}
        <div 
          ref={card2Ref}
          className="w-full max-w-sm min-h-[600px] mx-auto bg-[var(--green-mid)]/25 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-pink-500/60 flex flex-col justify-start pt-16"
        >
          {/* brillo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[var(--intense-pink)] to-transparent"></div>
          <div className="flex-grow-[0.15]"></div>
          
          <div className="relative z-10 text-center space-y-8 px-4">
            {/* TÍTULO */}
            <div className="relative">
              <h2 
                ref={title2Ref} 
                className="text-7xl font-black text-white mb-4 text-center leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
              >
                <span className="text-[35px]">¿Qué hace?</span>
              </h2>
            </div>
          </div>

          <div className="flex-grow-[0.06]"></div>
           {/* LÍNEA */}
            <div ref={line2Ref} className="relative">
              <div className="h-1.5 w-full bg-gradient-to-r bg-[var(--intense-pink)] mx-auto rounded-full shadow-lg"></div>
              <div className="absolute inset-0 h-1.5 w-40 bg-white/30 blur-sm mx-auto rounded-full"></div>
            </div>

            <div className="flex-grow-[0.15]"></div>
            {/* TEXTO */}
            <div ref={text2Ref} className="space-y-6 mt-12">
              <p className="text-xl text-white/95 leading-relaxed text-center font-medium tracking-wide">
                <span className="text-[25px]">Simplemente apunta tu cámara hacia cualquier
                  especie y nuestra IA analizará instantáneamente
                  para darte información precisa.
                </span>
              </p>
            </div>
        </div>
      </section>

      {/* TARJETA 3 - PAISAJE DE DURANGO */}
      <section className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
        
        {/* FONDO - EFECTO PARALLAX */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          
          {/* CAPA 1 */}
          <img 
            ref={background3Ref}
            src="/images/tarjeta3/cielo_3.png"
            alt="Paisaje de Durango - fondo"
            className="absolute inset-0 w-full h-full object-cover scale-125"
          />
          
          {/* CAPA 2 */}
          <img 
            ref={midground3Ref}
            src="/images/tarjeta3/arena_md.png"
            alt="Paisaje de Durango - medio"
            className="absolute top-80 w-full h-full object-cover object-center"
          />
          
          {/* CAPA 3 */}
          <img 
            ref={foreground3Ref}
            src="/images/tarjeta3/arboles.png"
            alt="Paisaje de Durango - primer plano"
            className="absolute bottom-0 w-full h-2/3 object-cover object-bottom"
          />
          
          
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* TARJETA 3*/}
        <div 
          ref={card3Ref}
          className="w-full max-w-sm min-h-[600px] mx-auto bg-[var(--green-light)]/25 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-pink-500/60 flex flex-col justify-start pt-16"
        >
          {/* brillo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[var(--intense-pink)] to-transparent"></div>
          <div className="flex-grow-[0.15]"></div>
          
          <div className="relative z-10 text-center space-y-8 px-4">
            {/* TÍTULO */}
            <div className="relative">
              <h2 
                ref={title3Ref} 
                className="text-7xl font-black text-white mb-4 text-center leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]"
              >
                <span className="text-[35px]">¿Qué resuelve?</span>
              </h2>
            </div>
          </div>

          <div className="flex-grow-[0.06]"></div>
           {/* LÍNEA */}
            <div ref={line3Ref} className="relative">
              <div className="h-1.5 w-full bg-gradient-to-r bg-[var(--intense-pink)] mx-auto rounded-full shadow-lg"></div>
              <div className="absolute inset-0 h-1.5 w-40 bg-white/30 blur-sm mx-auto rounded-full"></div>
            </div>

            <div className="flex-grow-[0.15]"></div>
          {/* TEXTO */}
            <div ref={text3Ref} className="space-y-6 mt-12">
              <p className="text-xl text-white/95 leading-relaxed text-center font-medium tracking-wide">
                <span className="text-[25px]">Recibe alertas inmediatas, información de
                primeros auxilios y recomendaciones de acción
                cuando detectamos una especie peligrosa.</span>
              </p>
            </div>
        </div>
      </section>

    </main>
  );
}