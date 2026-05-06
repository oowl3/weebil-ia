"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header_a from '../components/Header_a';



// Definición de tipos
interface Faq {
  id: number;
  pregunta: string;
  respuesta: string;
}

const FaqPage = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  // Simulación de fetch (Reemplaza con tu lógica real)
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faq');
        if (!res.ok) throw new Error('Error al cargar FAQs');
        const data = await res.json();
        setFaqs(data);
        setFilteredFaqs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // Buscador
  useEffect(() => {
    const results = faqs.filter(faq =>
      faq.pregunta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.respuesta.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(results);
  }, [searchTerm, faqs]);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className='min-h-screen bg-(--sand-3) font-(--font-manrope) selection:bg-(--intense-pink) selection:text-white'>
      
      {/* Header fijo o estático según tu componente */}
      <Header_a />

      <main className="px-5 py-12 pb-24 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* --- SECCIÓN TÍTULO (Centrado perfecto) --- */}
        <div className='flex flex-col items-center text-center mb-10 w-full'>
            <h1 className='text-[32px] md:text-[40px] font-bold text-(--black-deep) tracking-tight leading-tight mb-3'>
              Preguntas Frecuentes
            </h1>
            
            {/* Línea decorativa - Centrada con Flexbox del padre */}
            <div className="h-1.5 w-24 bg-(--intense-pink) rounded-full mb-6"></div>
            
            <p className="text-[16px] text-(--black-deep) opacity-60 max-w-md leading-relaxed">
                Todo lo que necesitas saber sobre Weebil, identificación de especies y seguridad.
            </p>
        </div>

        {/* --- BUSCADOR FLOTANTE --- */}
        <div className="w-full max-w-xl mb-12 relative group">
          <div className="absolute inset-y-0 right-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-(--brown-mid-2) group-focus-within:text-(--intense-pink) transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-6 py-4 
                       bg-white rounded-full shadow-sm border border-transparent
                       text-[16px] text-(--black-deep) placeholder-(--brown-mid-2)/60
                       focus:outline-none focus:ring-4 focus:ring-(--intense-pink)/10 focus:border-(--intense-pink)/20
                       transition-all duration-300 ease-out"
            placeholder="Buscar duda (ej. picadura, cuenta, GPS)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <br/>
        {/* --- LISTA DE PREGUNTAS (Tarjetas separadas) --- */}
        {loading ? (
          <div className="w-full max-w-2xl space-y-6">
             {/* Skeleton minimalista */}
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-(--sand-2)/30 rounded-2xl animate-pulse w-full"></div>
            ))}
          </div>
        ) : (
          <div className='w-full max-w-2xl flex flex-col gap-5'> {/* gap-5 da el espacio que pediste */}
            
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className={`
                    bg-white rounded-2xl transition-all duration-300 overflow-hidden
                    ${openId === faq.id 
                        ? 'shadow-lg ring-1 ring-(--intense-pink)/20 translate-y-[-2px]' 
                        : 'shadow-sm hover:shadow-md hover:translate-y-[-1px]'}
                  `}
                >
                  {/* Cabecera de la pregunta */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 text-left flex justify-between items-start gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className={`text-[17px] font-bold leading-snug transition-colors duration-200 
                        ${openId === faq.id ? 'text-(--intense-red)' : 'text-(--black-deep)'}`}>
                      {faq.pregunta}
                    </span>
                    
                    {/* Icono Chevron */}
                    <span className={`
                        flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300
                        ${openId === faq.id ? 'bg-(--intense-pink)/10 rotate-180 text-(--intense-pink)' : 'text-(--brown-mid-2)'}
                    `}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                  </button>

                  {/* Contenido de la respuesta */}
                  <div 
                    className={`
                      transition-all duration-300 ease-in-out overflow-hidden
                      ${openId === faq.id ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="h-px w-full bg-(--sand-2)/40 mb-4"></div>
                      <p className="text-[15px] leading-relaxed text-(--black-deep) opacity-80 text-justify">
                        {faq.respuesta}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-4">
                <div className="inline-block p-4 rounded-full bg-white mb-4 shadow-sm">
                    <svg className="w-8 h-8 text-(--brown-mid-2)" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-(--brown-mid-1)">No encontramos resultados</h3>
                <p className="text-(--brown-mid-2) text-sm mt-1">Intenta buscar con otras palabras.</p>
              </div>
            )}

          </div>
        )}

        {/* --- BOTÓN VOLVER --- */}
        <div className="mt-16 w-full flex justify-center">
            <Link href="/Inicio" className="group relative inline-flex items-center justify-center">
                <span className="absolute inset-0 w-full h-full bg-(--intense-pink) rounded-full opacity-20 group-hover:scale-110 transition-transform duration-300 blur-md"></span>
                <span className="relative bg-(--intense-pink) text-white font-bold py-3.5 px-10 rounded-full text-lg shadow-lg shadow-(--intense-pink)/30 transition-all duration-200 group-hover:translate-y-[-2px] group-active:translate-y-[1px]">
                  Volver al Inicio
                </span>
            </Link>
        </div>

        {/* Pie de página sutil */}
        <div className="mt-8 text-center">
            <p className="text-xs text-(--brown-mid-2) opacity-70">
                ¿Necesitas ayuda urgente? <span className="font-bold text-(--intense-red)">Llama al 911</span>
            </p>
        </div>

      </main>
    </div>
  );
};

export default FaqPage;