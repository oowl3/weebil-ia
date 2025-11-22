"use client";
import Header_a from "../components/Header_a"; 
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { 
  Camera, 
  ImagePlus, 
  AlertTriangle, 
  ShieldCheck, 
  Loader2, 
  Info, 
  HelpCircle, 
  ChevronRight,
  Leaf,
  Dna
} from "lucide-react";

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
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [guestId, setGuestId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
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
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [result]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setResult(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
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
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Error de conexión.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh w-full max-w-md mx-auto bg-[#FDFCF8] text-[var(--brown-dark-2)] pb-10 font-[family-name:var(--font-manrope)]">
         <Header_a/>
         <h1 className="text-2xl font-bold text-gray-900 tracking-tight px-2">
            Detector De Animales
         </h1>

      <div className="px-5 flex flex-col gap-6 mt-4">
        
        {/* --- SECCIÓN 1: CÁMARA (Box Principal) --- */}
        <div className="relative group">
            {/* Etiqueta superior izquierda según imagen */}
            <span className="absolute -top-3 left-1 text-xs font-semibold text-gray-500 bg-[#FDFCF8] px-2 z-10">
                Tomar Fotografía
            </span>

            {/* Botón de Ayuda Flotante (Corner) */}
            <button className="absolute -top-3 -right-2 z-20 bg-white text-rose-500 hover:bg-rose-50 rounded-full p-1 shadow-sm border border-rose-100 transition-transform active:scale-95">
                <HelpCircle size={24} strokeWidth={1.5} />
            </button>

            {/* Label que actúa como botón */}
            <label className={`
                relative w-full aspect-[4/3] rounded-2xl border-2 
                flex flex-col items-center justify-center gap-3 cursor-pointer
                transition-all duration-300 overflow-hidden shadow-sm
                ${loading 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-white border-rose-400 hover:border-rose-500 hover:shadow-rose-100 shadow-sm'
                }
            `}>
                {image && !result ? (
                    // Previsualización si ya se tomó la foto
                    <>
                        <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10">
                            <Loader2 className="animate-spin text-rose-500 h-10 w-10 mb-2" />
                            <span className="text-rose-700 font-bold text-sm animate-pulse">Analizando espécimen...</span>
                        </div>
                    </>
                ) : (
                    // Estado Inicial
                    <>
                        <div className="p-4 rounded-full bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform duration-300">
                            <Camera size={40} strokeWidth={1.5} />
                        </div>
                        <span className="text-lg font-bold text-gray-800">Activar Cámara</span>
                    </>
                )}

                {/* Input específico para cámara */}
                <input
                    type="file"
                    accept="image/*"
                    capture="environment" // Fuerza la cámara trasera en móviles
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={loading}
                />
            </label>
        </div>

        {/* --- SECCIÓN 2: SUBIR IMAGEN (Box Secundaria) --- */}
        <div className="relative">
            <span className="absolute -top-3 left-1 text-xs font-semibold text-gray-500 bg-[#FDFCF8] px-2 z-10">
                Subir Imagen
            </span>

            <label className={`
                w-full py-8 rounded-xl border-2 border-dashed
                flex flex-col items-center justify-center gap-2 cursor-pointer
                transition-all duration-200
                ${loading ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-rose-300 bg-rose-50/30 hover:bg-rose-50 hover:border-rose-400 active:scale-[0.98]'}
            `}>
                <div className="text-rose-400">
                    <ImagePlus size={32} strokeWidth={1.5} />
                </div>
                <span className="text-base font-semibold text-gray-700">Subir desde Galería</span>

                {/* Input sin capture para abrir galería */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={loading}
                />
            </label>
        </div>

        {/* --- SECCIÓN 3: IMPORTANTE (Warning Box) --- */}
        <div className="mt-2 rounded-[2rem] border border-rose-100 bg-white p-6 shadow-[0_10px_40px_-10px_rgba(255,225,225,0.7)] relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-4 -bottom-4 opacity-5 text-rose-500 rotate-12">
                <AlertTriangle size={120} />
            </div>

            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Importante
                </h3>
                <p className="text-gray-600 font-[family-name:var(--font-instrument)] leading-relaxed text-sm">
                    Siempre ten precaución al acercarte al animal. Mantén una distancia segura de al menos 2 metros antes de intentar fotografiarlo.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-rose-500 uppercase tracking-wide">
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    Protocolo de Seguridad Activo
                </div>
            </div>
        </div>

        {/* --- RESULTADOS (Aparecen dinámicamente abajo) --- */}
        {errorMsg && (
            <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-bottom-2">
                <AlertTriangle size={20} />
                <p className="text-sm font-medium">{errorMsg}</p>
            </div>
        )}

        {result && (
            <div ref={resultsRef} className="animate-in slide-in-from-bottom-10 fade-in duration-700 pt-4">
                 <div className={`relative overflow-hidden rounded-[2rem] p-6 shadow-2xl text-white mb-6 ${
                    result.es_venenoso 
                      ? "bg-gradient-to-br from-rose-600 to-red-900 shadow-rose-900/30" 
                      : "bg-gradient-to-br from-emerald-500 to-teal-800 shadow-emerald-900/30"
                  }`}>
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="flex items-center gap-2 opacity-90 mb-1">
                                {result.es_venenoso ? <AlertTriangle size={16}/> : <ShieldCheck size={16}/>}
                                <span className="text-xs font-bold tracking-widest uppercase">Resultado del Análisis</span>
                            </div>
                            <h2 className="text-3xl font-black uppercase leading-none">
                                {result.es_venenoso ? "Peligroso" : "Seguro"}
                            </h2>
                        </div>
                        <div className="text-right">
                            <span className="block text-3xl font-bold">{Math.round(result.nivel_confianza * 100)}%</span>
                            <span className="text-[10px] opacity-80 uppercase">Probabilidad</span>
                        </div>
                    </div>

                    <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <h3 className="font-bold text-lg capitalize mb-1">{result.nombre_comun}</h3>
                        <p className="text-xs italic opacity-80 mb-3">{result.nombre_cientifico}</p>
                        <p className="text-sm leading-snug opacity-95">{result.descripcion_pokedex}</p>
                    </div>
                 </div>
            </div>
        )}

      </div>
    </main>
  );
}