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
  ChevronRight,
  RefreshCw
} from "lucide-react";

export default function ScannerPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [guestId, setGuestId] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Referencia para scrollear a resultados
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let storedGuestId = localStorage.getItem("guest_id");
    if (!storedGuestId) {
      storedGuestId = uuidv4();
      localStorage.setItem("guest_id", storedGuestId);
    }
    setGuestId(storedGuestId);
  }, []);

  // Efecto para auto-scrollear cuando llega el resultado
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setResult(null);
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
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

      setResult(data);
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMsg(error.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[100dvh] bg-neutral-50 text-slate-800 pb-32 font-sans selection:bg-desert-terracotta/30">
      
      {/* --- HEADER FLOTANTE --- */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
        <div>
          <h1 className="font-brand text-2xl font-extrabold tracking-tight text-slate-900">
            Weebil
            <span className="text-desert-terracotta">.AI</span>
          </h1>
          <p className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
            Scanner Biológico
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-600">Online</span>
        </div>
      </header>

      <div className="mx-auto max-w-md px-4 pt-6">
        
        {/* --- VISOR DE CÁMARA / PREVIEW --- */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-slate-900/5 transition-all duration-500 ease-out aspect-[4/5]">
          
          {/* Overlay de Escaneo (Animación) */}
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-desert-accent opacity-20 duration-1000"></div>
                <Loader2 className="relative h-12 w-12 animate-spin text-desert-accent drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              </div>
              <p className="mt-4 animate-pulse text-sm font-bold uppercase tracking-widest text-white">
                Analizando Especimen...
              </p>
            </div>
          )}

          {image ? (
            <>
              <img 
                src={image} 
                alt="Especimen" 
                className="h-full w-full object-cover opacity-90" 
              />
              {/* Gradiente para legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-slate-500">
              <div className="rounded-full bg-slate-800 p-6 shadow-inner">
                <ScanLine className="h-12 w-12 opacity-50" />
              </div>
              <p className="max-w-[200px] text-center text-sm font-medium opacity-60">
                Apunta tu cámara al arácnido o insecto
              </p>
            </div>
          )}

          {/* Botón Gigante Invisible (Hitbox) para UX rápida si no hay imagen */}
          {!image && (
            <label className="absolute inset-0 cursor-pointer z-10">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
                disabled={loading}
              />
            </label>
          )}
        </div>

        {/* --- ERRORES --- */}
        {errorMsg && (
          <div className="mt-6 animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="flex w-full items-center gap-3 rounded-2xl bg-red-50 p-4 text-red-900 ring-1 ring-red-200">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* --- RESULTADOS (CARD DESLIZABLE) --- */}
        {result && (
          <div ref={resultsRef} className="mt-6 space-y-4 pb-20 animate-in slide-in-from-bottom-8 fade-in duration-500">
            
            {/* Tarjeta Principal de Estatus */}
            <div className={`relative overflow-hidden rounded-[2rem] p-6 text-white shadow-xl transition-all ${
                result.es_venenoso 
                  ? "bg-gradient-to-br from-red-600 to-orange-700 shadow-red-500/30" 
                  : "bg-gradient-to-br from-emerald-600 to-teal-700 shadow-emerald-500/30"
              }`}>
              
              {/* Icono de fondo decorativo */}
              <div className="absolute -right-4 -top-4 opacity-20 rotate-12">
                 {result.es_venenoso ? <AlertTriangle size={140} /> : <ShieldCheck size={140} />}
              </div>

              <div className="relative z-10">
                <div className="mb-1 flex items-center gap-2 opacity-90">
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-white"></span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {Math.round(result.nivel_confianza * 100)}% Certeza
                  </span>
                </div>
                
                <h2 className="font-brand text-4xl font-black uppercase italic tracking-tighter drop-shadow-sm">
                  {result.es_venenoso ? "PELIGROSO" : "SEGURO"}
                </h2>
                <p className="mt-2 text-sm font-medium leading-relaxed opacity-95 mix-blend-plus-lighter">
                  {result.primeros_auxilios}
                </p>
              </div>
            </div>

            {/* Detalles Técnicos */}
            <div className="grid gap-3">
              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-3 mb-3">
                  <span className="text-xs font-bold uppercase text-slate-400">Especie</span>
                  <Info className="h-4 w-4 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 capitalize">
                  {result.nombre_comun}
                </h3>
                <p className="font-serif text-slate-500 italic">
                  {result.nombre_cientifico}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5">
                <div className="flex items-baseline justify-between border-b border-slate-100 pb-3 mb-3">
                  <span className="text-xs font-bold uppercase text-slate-400">Datos Weebil</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600">
                  {result.descripcion_pokedex}
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                  <ScanLine className="h-3 w-3" />
                  <span>Hábitat: <strong>{result.habitat}</strong></span>
                </div>
              </div>
            </div>

            <div className="py-4 text-center">
              <button className="text-xs font-semibold text-slate-400 hover:text-desert-terracotta transition-colors">
                ¿Error en la identificación? Reportar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- BOTÓN FLOTANTE FIJO (FAB) --- */}
      {/* Siempre visible al fondo para escanear rápido */}
      <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
        <label className={`
            group flex w-full max-w-xs cursor-pointer items-center justify-center gap-3 rounded-full 
            p-4 shadow-2xl transition-all active:scale-95
            ${loading ? 'bg-slate-800 pointer-events-none' : 'bg-slate-900 hover:bg-slate-800'}
          `}>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
            disabled={loading}
          />
          
          {loading ? (
             <Loader2 className="h-6 w-6 animate-spin text-white/50" />
          ) : (
             <>
               {image ? <RefreshCw className="h-5 w-5 text-white" /> : <Camera className="h-6 w-6 text-white" />}
               <span className="text-base font-bold text-white">
                 {image ? "Escanear Otro" : "Identificar Ahora"}
               </span>
               {!image && <ChevronRight className="h-4 w-4 text-white/50 group-hover:translate-x-1 transition-transform" />}
             </>
          )}
        </label>
      </div>

    </main>
  );
}