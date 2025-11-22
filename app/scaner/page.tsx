"use client";

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { 
  Camera, 
  AlertTriangle, 
  ShieldCheck, 
  Loader2, 
  Info, 
  ScanLine, 
  RefreshCw,
  Atom,
  Leaf
} from "lucide-react";

// Definición de la estructura de datos que devuelve la API
interface AnalysisResult {
  es_venenoso: boolean;
  nivel_confianza: number;
  primeros_auxilios: string;
  nombre_comun: string;
  nombre_cientifico: string;
  descripcion_pokedex: string;
  habitat: string;
}

export default function ScannerPage() {
  // Tipado explícito para los estados
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [guestId, setGuestId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Referencia tipada al elemento HTML div
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let storedGuestId = localStorage.getItem("guest_id");
    if (!storedGuestId) {
      storedGuestId = uuidv4();
      localStorage.setItem("guest_id", storedGuestId);
    }
    setGuestId(storedGuestId);
  }, []);

  useEffect(() => {
    if (result && resultsRef.current) {
      // Pequeño delay para permitir que el DOM se pinte antes de scrollear
      setTimeout(() => {
        // Verificación de nulidad estricta requerida por TS
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [result]);

  // Tipado del evento del input file
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setResult(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      const resultString = reader.result as string;
      setImage(resultString);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("guestId", guestId);

    try {
      const response = await fetch("/api/analizar_g", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.status}`);
      }

      setResult(data as AnalysisResult);
    } catch (error: unknown) {
      console.error("Error:", error);
      // Verificación de tipo para el error
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Error de conexión con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <main className="relative min-h-dvh w-full max-w-md mx-auto bg-[var(--sand-3)] pb-32 overflow-x-hidden">
        
        {/* --- HEADER (Glassmorphism sutil) --- */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-5 bg-[var(--sand-3)]/80 backdrop-blur-md border-b border-[var(--sand-1)]/20">
          <div className="flex items-center gap-2">
            <div className="bg-[var(--intense-pink)] p-1.5 rounded-lg text-white">
              <Atom size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-manrope)] text-xl font-extrabold tracking-tight text-[var(--blue-strong)] leading-none">
                Weebil
                <span className="text-[var(--intense-pink)]">.AI</span>
              </h1>
            </div>
          </div>

        </header>

        <div className="px-5 pt-6">
          
          {/* --- VISOR PRINCIPAL --- */}
          {/* Optimizado: aspect-4/5, rounded-4xl */}
          <div className="relative overflow-hidden rounded-4xl shadow-2xl bg-[var(--black-deep)] aspect-4/5 ring-4 ring-white/40 group transition-all duration-500">
            
            {/* Estados de Carga */}
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--blue-strong)]/90 backdrop-blur-sm text-[var(--sand-3)]">
                <div className="relative mb-6">
                  <div className="absolute inset-0 animate-ping rounded-full bg-[var(--intense-pink)] opacity-20 duration-1000"></div>
                  <Loader2 className="relative h-14 w-14 animate-spin text-[var(--intense-pink)]" />
                </div>
                <p className="font-[family-name:var(--font-manrope)] text-lg font-bold tracking-tight animate-pulse">
                  Analizando patrones...
                </p>
                <p className="font-[family-name:var(--font-instrument)] text-sm opacity-60 mt-1">
                  Consultando base de datos biológica
                </p>
              </div>
            )}

            {/* Renderizado de Imagen o Placeholder */}
            {image ? (
              <>
                <img 
                  src={image} 
                  alt="Especimen capturado" 
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                />
                {/* Gradiente: bg-linear-to-t */}
                <div className="absolute inset-0 bg-linear-to-t from-[var(--black-deep)]/60 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-[var(--sand-2)] bg-[var(--black-deep)]">
                <div className="relative">
                  <div className="absolute inset-0 border-2 border-dashed border-[var(--sand-1)]/30 rounded-2xl animate-[spin_10s_linear_infinite]" />
                  <div className="relative bg-[var(--blue-strong)] p-6 rounded-2xl shadow-inner ring-1 ring-white/10">
                    <ScanLine className="h-10 w-10 text-[var(--intense-pink)]" />
                  </div>
                </div>
                <div className="text-center max-w-[200px]">
                  <h3 className="font-[family-name:var(--font-manrope)] text-lg font-bold text-[var(--sand-3)] mb-1">
                    Cargar una Imagen
                  </h3>
                </div>
              </div>
            )}

            {/* Input Oculto */}
            {!image && !loading && (
              <label className="absolute inset-0 z-10 cursor-pointer active:bg-white/5 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* --- MENSAJES DE ERROR --- */}
          {errorMsg && (
            <div className="mt-6 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="flex w-full items-start gap-3 rounded-2xl bg-[var(--intense-red)]/10 p-4 border border-[var(--intense-red)]/20">
                <AlertTriangle className="h-5 w-5 shrink-0 text-[var(--intense-red)] mt-0.5" />
                <div>
                  <h4 className="font-bold text-[var(--intense-red)] text-sm font-[family-name:var(--font-manrope)]">Error de Análisis</h4>
                  <p className="text-sm text-[var(--brown-dark-2)] font-[family-name:var(--font-instrument)] leading-tight mt-1">{errorMsg}</p>
                </div>
              </div>
            </div>
          )}

          {/* --- RESULTADOS (Tarjeta Estilo Ficha Técnica) --- */}
          {result && (
            <div ref={resultsRef} className="mt-8 space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-100">
              
              {/* Tarjeta de Diagnóstico Principal: bg-linear-to-br, rounded-4xl */}
              <div className={`relative overflow-hidden rounded-4xl p-8 shadow-2xl transition-all transform hover:scale-[1.01] ${
                result.es_venenoso 
                  ? "bg-linear-to-br from-[var(--intense-red)] to-red-900 shadow-red-900/20 text-[var(--sand-3)]" 
                  : "bg-linear-to-br from-[var(--green-mid)] to-teal-800 shadow-green-900/20 text-[var(--sand-3)]"
              }`}>
                
                {/* Decoración de fondo */}
                <div className="absolute -right-6 -top-6 opacity-10 rotate-12 mix-blend-overlay">
                   {result.es_venenoso ? <AlertTriangle size={180} /> : <ShieldCheck size={180} />}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-black/20 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md font-[family-name:var(--font-instrument)]">
                      Reporte #{(Math.random() * 10000).toFixed(0)}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-90">
                       <div className="w-1.5 h-1.5 rounded-full bg-current" />
                       <span className="text-xs font-bold font-[family-name:var(--font-manrope)]">{Math.round(result.nivel_confianza * 100)}% Precisión</span>
                    </div>
                  </div>
                  
                  <h2 className="font-[family-name:var(--font-manrope)] text-4xl font-black uppercase tracking-tight leading-[0.9]">
                    {result.es_venenoso ? "Peligro" : "Seguro"}
                  </h2>
                  <p className="mt-3 font-[family-name:var(--font-instrument)] text-sm font-medium opacity-90 leading-relaxed border-l-2 border-white/30 pl-3">
                    {result.primeros_auxilios || "No se requieren acciones inmediatas. Mantén la distancia por precaución."}
                  </p>
                </div>
              </div>

              {/* Detalles Desplegados */}
              <div className="grid gap-4">
                {/* Ficha de Especie */}
                <div className="rounded-3xl bg-white p-6 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-[var(--sand-1)]/20">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 rounded-full bg-[var(--sand-3)] text-[var(--brown-mid-2)]">
                        <Leaf size={20} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-[family-name:var(--font-manrope)] font-bold text-[var(--blue-strong)] capitalize leading-none">
                          {result.nombre_comun}
                        </h3>
                        <p className="font-serif italic text-[var(--green-light)] text-sm mt-0.5">
                          {result.nombre_cientifico}
                        </p>
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-[var(--sand-3)] text-[var(--brown-dark-2)]">
                      <p className="text-sm leading-relaxed font-[family-name:var(--font-instrument)]">
                        {result.descripcion_pokedex}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--brown-mid-2)] px-2">
                      <Info size={14} />
                      <span>Hábitat: {result.habitat}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 text-center text-xs font-semibold text-[var(--brown-mid-1)] hover:text-[var(--intense-pink)] transition-colors opacity-60 hover:opacity-100">
                ¿Diagnóstico incorrecto? Reportar al laboratorio
              </button>
            </div>
          )}
        </div>

        {/* --- FLOATING ACTION BUTTON (FAB) --- */}
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-6">
          <label className={`
            group relative flex w-full max-w-[320px] cursor-pointer items-center justify-between
            pl-6 pr-2 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.25)]
            transition-all duration-300 active:scale-95
            ${loading 
              ? 'bg-[var(--blue-strong)] pointer-events-none cursor-wait' 
              : 'bg-[var(--black-deep)] hover:bg-[#1a1a1a]'
            }
          `}>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
              disabled={loading}
            />
            
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-[var(--sand-3)] font-[family-name:var(--font-manrope)]">
                {loading ? "Procesando..." : (image ? "Nueva Captura" : "Escanear")}
              </span>
              <span className="text-[10px] text-[var(--sand-1)] font-[family-name:var(--font-instrument)]">
                {loading ? "Espera un momento" : "Toca para activar cámara"}
              </span>
            </div>

            {/* Botón Circular Interno */}
            <div className={`
              h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500
              ${loading ? 'bg-[var(--blue-strong)]' : 'bg-[var(--intense-pink)] group-hover:scale-110 rotate-0 group-hover:rotate-90'}
            `}>
              {loading ? (
                 <Loader2 className="h-5 w-5 animate-spin text-white/50" />
              ) : (
                 image ? <RefreshCw className="h-5 w-5 text-white" /> : <Camera className="h-5 w-5 text-white" />
              )}
            </div>
          </label>
        </div>

      </main>
    </>
  );
}