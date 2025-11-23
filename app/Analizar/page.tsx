"use client";
import React, { useState, useEffect, useRef } from "react";
import Header_a from "../components/Header_a";
import { v4 as uuidv4 } from "uuid";
import { 
  Camera, 
  ImagePlus, 
  AlertTriangle, 
  Loader2, 
  X,
  ThermometerSun,
  MapPin,
  Activity
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
  
  // Referencia para manejar el foco si es necesario
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificación de cliente para localStorage
    if (typeof window !== 'undefined') {
      let storedGuestId = localStorage.getItem("guest_id");
      if (!storedGuestId) {
        storedGuestId = uuidv4();
        localStorage.setItem("guest_id", storedGuestId);
      }
      setGuestId(storedGuestId);
    }
  }, []);

  // Función para cerrar el modal y resetear estado visual
  const closeModal = () => {
    setResult(null);
    // Opcional: Si quieres limpiar la imagen al cerrar
    // setImage(null); 
  };

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
    <main className="min-h-dvh w-full max-w-md mx-auto pb-10 relative">
        <Header_a/>
        <h1 className="text-2xl text-center font-bold tracking-tight">
          Detector De Animales
        </h1>
        <br />
        <span className="absolute left-1 text-xs px-2 z-10">
          Subir Imagen
        </span>
        <div className="px-5 pt-2">
            <div className="flex flex-col gap-6">

              <div className="relative group">
                  <label className={`
                      relative w-full aspect-4/3 rounded-2xl border-2 
                      flex flex-col items-center justify-center gap-3 cursor-pointer
                      transition-all duration-300 overflow-hidden shadow-sm
                      ${loading 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-white border-rose-400 hover:shadow-rose-100 shadow-sm'
                      }
                  `}>
                      {image && !result ? (
                          <>
                              <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm z-10">
                                  <Loader2 className="animate-spin text-rose-500 h-10 w-10 mb-2" />
                                  <span className="text-rose-700 font-bold text-sm animate-pulse">Analizando espécimen...</span>
                              </div>
                          </>
                      ) : (
                          <>
                              <div className="p-4 rounded-full bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform duration-300">
                                  <Camera size={40} strokeWidth={1.5} />
                              </div>
                              <span className="text-lg font-bold">Activar Cámara</span>
                          </>
                      )}

                      <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={loading}
                      />
                  </label>
              </div>

              {/* --- SECCIÓN 2: SUBIR IMAGEN --- */}
              <div className="relative">
                  <span className="absolute -top-3 left-1 text-xs px-2 z-10">
                      Subir Imagen
                  </span>

                  <label className={` 
                      w-full py-6 rounded-xl border-2 border-dashed
                      flex flex-col items-center justify-center gap-2 cursor-pointer
                      transition-all duration-200
                      ${loading ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-rose-300 bg-rose-50/30 hover:bg-rose-50 hover:border-rose-400 active:scale-[0.98]'}
                  `}>
                      <div className="text-rose-400">
                          <ImagePlus size={28} strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-semibold">Galería de fotos</span>

                      <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={loading}
                      />
                  </label>
              </div>

              {/* --- SECCIÓN 3: WARNING --- */}
              <div className="mt-2 rounded-lg border border-rose-100 bg-white p-5 shadow-[0_10px_30px_-10px_rgba(255,225,225,0.7)] relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-5 text-rose-500 rotate-12">
                      <AlertTriangle size={100} />
                  </div>
                  <div className="relative z-10">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                          Precaución
                      </h3>
                      <p className="text-gray-950 text-xs leading-relaxed">
                          Mantén una distancia segura de al menos 2 metros antes de intentar fotografiar cualquier animal desconocido.
                      </p>
                  </div>
              </div>
            </div>
         </div>

         {/* --- MENSAJES DE ERROR --- */}
         {errorMsg && (
            <div className="mx-5 mt-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-bottom-2">
                <AlertTriangle size={20} />
                <p className="text-sm font-medium">{errorMsg}</p>
            </div>
         )}

         {/* --- MODAL DE RESULTADOS --- */}
         {result && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop oscuro con blur */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={closeModal}
              />
              
              {/* Contenido del Modal */}
              <div 
                ref={modalRef}
                className={`
                  relative w-full max-w-sm rounded-[.2rem] overflow-hidden shadow-2xl text-white
                  animate-in zoom-in-95 slide-in-from-bottom-4 duration-300
                  ${result.es_venenoso 
                      ? "bg-linear-to-br from-rose-900 to-red-950" 
                      : "bg-linear-to-br from-(--green-mid) to-(--green-dark)"
                  }
                `}
              >
                  {/* Botón Cerrar */}
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 z-20 p-2 bg-white rounded-full transition-colors backdrop-blur-md"
                  >
                    <X size={20} className="text-white" />
                  </button>

                  <div className="p-6 relative z-10">
                      {/* Header del resultado */}
                      <div className="flex items-start justify-between mb-6">
                          <div>
                              <h2 className="text-3xl font-black uppercase leading-none tracking-tight">
                                  {result.es_venenoso ? "Venenoso" : "Inofensivo"}
                              </h2>
                          </div>
                          <div className="text-right">
                              <span className="block text-4xl font-bold tracking-tighter">{Math.round(result.nivel_confianza * 100)}%</span>
                              <span className="text-[10px] opacity-80 uppercase font-medium">Certeza</span>
                          </div>
                      </div>

                      {/* Tarjeta de Información */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-inner">
                          <h3 className="font-bold text-xl capitalize mb-1">{result.nombre_comun}</h3>
                          <p className="text-sm italic opacity-75 mb-4 font-mono">{result.nombre_cientifico}</p>
                          
                          <div className="space-y-3">
                            <div className="flex gap-3">
                                <Activity size={18} className="shrink-0 opacity-70 mt-1"/>
                                <p className="text-sm leading-snug opacity-95">{result.descripcion_pokedex}</p>
                            </div>
                            
                            <div className="h-px bg-white/20 my-2" />

                            <div className="flex gap-3">
                                <MapPin size={18} className="shrink-0 opacity-70 mt-1"/>
                                <div>
                                  <span className="text-xs uppercase opacity-70 font-bold block mb-1">Hábitat</span>
                                  <p className="text-sm leading-snug">{result.habitat}</p>
                                </div>
                            </div>

                            {result.es_venenoso && (
                              <div className="mt-4 p-3 bg-red-950/40 rounded-xl border border-red-500/30">
                                <div className="flex gap-2 mb-1 text-red-200">
                                  <ThermometerSun size={16} />
                                  <span className="text-xs font-bold uppercase">Primeros Auxilios</span>
                                </div>
                                <p className="text-xs text-red-100/90 leading-relaxed">
                                  {result.primeros_auxilios}
                                </p>
                              </div>
                            )}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
         )}
    </main>
  );
}