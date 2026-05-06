import ParallaxCard from "@/app/components/ParallaxCard"; 
import Link from 'next/link';

export default function Home() {
  const cardsData = [
    { id: 1,
      title: "¿Qué es BIXIL?",
      description: "BIXIL es tu guardián inteligente: Una herramienta que identifica especies peligrosas al instante y te ayuda a mantenerte seguro en cualquier entorno.",
      imgBack: "/images/tarjeta1/cielo_background.avif",
      imgMid: "/images/tarjeta1/mont_v.avif",
      imgFore: "/images/tarjeta1/puente_durango.avif",
      bgColorClass: "bg-(--green-dark)/20" 
    },
    { id: 2,
      title: "¿Qué hace?",
      description: "Solo apunta la cámara y deja que nuestra IA analice lo que ves. En segundos sabrás qué especie es y qué tan peligrosa puede ser",
      imgBack: "/images/tarjeta2/cielo_bg2.avif",
      imgMid: "/images/tarjeta2/mont_md2.avif",
      imgFore: "/images/tarjeta2/desierto.avif",
      bgColorClass: "bg-(--green-mid)/25" 
    },
    { id: 3,
      title: "¿Qué resuelve?",
      description: "Te avisamos al momento si estás frente a una especie de riesgo y te guiamos con pasos claros para protegerte y actuar sin pánico",
      imgBack: "/images/tarjeta3/cielo2.png",
      imgMid: "",
      imgFore: "/images/tarjeta3/rocas.png",
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
            <div className="bg-(--white)/20 backdrop-blur-sm rounded-2xl p-10 w-[90%] md:w-[600px] mx-auto transition-all duration-500 hover:bg-(--white)/30">
              <h1 className="text-8xl font-bold mb-8 flex items-center justify-center" role="heading">
                <span className="text-(--white) drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-[145px] leading-none">B</span>
                <span className="text-(--white) drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-[145px] leading-none">I</span>
                <span className="text-(--green-5) drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-[145px] leading-none">X</span>
                <span className="text-(--white) drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-[145px] leading-none">I</span>
                <span className="text-(--white) drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-[145px] leading-none">L</span>
              </h1>
              <div className="h-1 w-full bg-(--green-4) drop-shadow-[0_2px_2px_rgba(0,0,0,1)] mb-8 mx-auto"></div><br/>
              <p className="text-[24px] font-bold leading-relaxed text-center text-(--black-1) drop-shadow-[0_2px_2px_rgba(255,255,255,1)]">
                Detecta especies peligrosas y<br />actúa con confianza.
              </p>
              <br/>
            </div>
          </div>

          {/* Optimización 4: Arbitrary Value para grow específico */}
          <div className="flex flex-col items-center pb-4">
            <div className="h-100"></div> 
              <div className="text-black text-[35px] font-semi-bold py-5 px-36 rounded-xl bg-(--green-5) text-center block text-lg drop-shadow-[0_2px_2px_rgba(0,0,0,1)] active:scale-95">
                <Link href="/Inicio" className="block w-50 max-w-xs mx-auto">
                  Continuar
                </Link>
              </div>
            </div>
          <div className="grow-3"></div>
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