import ParallaxCard from "@/app/components/ParallaxCard"; 

export default function Home() {
  // Optimización 1: Actualización de sintaxis de variables en el objeto de configuración
  const cardsData = [
    { id: 1,
      title: "¿Qué es Weebil?",
      description: "Weebil es tu compañero inteligente para identificar especies peligrosas en tiempo real usando tecnología de vanguardia.",
      imgBack: "/images/tarjeta1/cielo_background.avif",
      imgMid: "/images/tarjeta1/mont_v.avif",
      imgFore: "/images/tarjeta1/puente_durango.avif",
      bgColorClass: "bg-(--green-dark)/20" 
    },
    { id: 2,
      title: "¿Qué hace?",
      description: "Simplemente apunta tu cámara hacia cualquier especie y nuestra IA analizará instantáneamente para darte información precisa.",
      imgBack: "/images/tarjeta2/cielo_bg2.avif",
      imgMid: "/images/tarjeta2/mont_md2.avif",
      imgFore: "/images/tarjeta2/desierto.avif",
      bgColorClass: "bg-(--green-mid)/25" 
    },
    { id: 3,
      title: "¿Qué resuelve?",
      description: "Recibe alertas inmediatas, información de primeros auxilios y recomendaciones de acción cuando detectamos una especie peligrosa.",
      imgBack: "/images/tarjeta3/cielo_3.avif",
      imgMid: "/images/tarjeta3/arena_md.avif",
      imgFore: "/images/tarjeta3/arboles.avif",
      bgColorClass: "bg-(--green-light)/25"}
  ];

  return (
    <main className="bg-sand-3">
      
      {/* --- SECCIÓN HERO (Portada) --- */}
      <section className='relative min-h-screen overflow-hidden'>
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/alacran.sgv" 
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          >
            <source 
              src="https://res.cloudinary.com/dje7eryo3/video/upload/ac_none,f_auto,q_auto/alacran_arena_original_qdmuta" 
            />
          </video>
          
          {/* Capa oscura opcional para que el texto blanco resalte mejor */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-20 flex flex-col min-h-screen text-white text-center px-4">
          {/* Optimización 2: 'flex-grow-[1]' se simplifica a 'grow' */}
          <div className="grow"></div>

          <div className="flex flex-col items-center">
            {/* Optimización 3: Variables CSS directas con paréntesis 'bg-(--var)' */}
            <div className="bg-(--sand-3)/20 backdrop-blur-sm rounded-2xl p-10 max-w-md mx-auto transition-all duration-500 hover:bg-(--sand-3)/30">
              <h1 className="text-8xl font-bold mb-8 flex items-center justify-center" role="heading">
                {/* Letras separadas con sintaxis limpia */}
                <span className="text-(--intense-pink) text-[120px] leading-none">W</span>
                <span className="text-(--black-deep) text-[120px] leading-none">e</span>
                <span className="text-(--black-deep) text-[120px] leading-none">e</span>
                <span className="text-(--black-deep) text-[120px] leading-none">b</span>
                <span className="text-(--green-light) text-[120px] leading-none">i</span>
                <span className="text-(--green-light) text-[120px] leading-none">l</span>
              </h1>
              <div className="h-1 w-full bg-(--intense-pink) mb-8 mx-auto"></div>
              <p className="text-lg font-medium leading-relaxed text-center text-(--black-deep)">
                Detecta especies peligrosas y<br />actúa con confianza.
              </p>
            </div>
          </div>

          {/* Optimización 4: Arbitrary Value para grow específico */}
          <div className="grow-7"></div>

          <div className="flex flex-col items-center pb-10">
             <a href="/Inicio" className="font-bold text-white py-5 px-24 bg-(--intense-pink) rounded-xl text-2xl active:scale-95 transition-all duration-150 select-none touch-manipulation shadow-lg hover:shadow-pink-500/50">
               Continuar
             </a>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DE TARJETAS (Renderizado Dinámico) --- */}
      {cardsData.map((card) => (
        <ParallaxCard 
          key={card.id} 
          {...card} 
        />
      ))}

    </main>
  );
}