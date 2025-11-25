"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header_a from "../components/Header_a";
import ResultModal from "../components/ResultModal"; 
import { v4 as uuidv4 } from "uuid";
import { 
  Camera, 
  ImagePlus, 
  AlertTriangle, 
  Loader2,
  UserPlus 
} from "lucide-react";

interface AnalysisResult {
  identificado: boolean;
  nivel_peligrosidad: "BAJO" | "MODERADO" | "ALTO"; 
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let storedGuestId = localStorage.getItem("guest_id");
      if (!storedGuestId) {
        storedGuestId = uuidv4();
        localStorage.setItem("guest_id", storedGuestId);
      }
      setGuestId(storedGuestId);
    }
  }, []);

  const closeModal = () => {
    setResult(null);
    setImage(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // --- 🛡️ VALIDACIÓN FRONTEND (FAIL FAST) ---
    setErrorMsg(null);
    setResult(null);

    // 1. Validación de Tipo (Debe coincidir con el backend)
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    if (!validTypes.includes(file.type)) {
        setErrorMsg("Formato no válido. Por favor usa JPG, PNG o WEBP.");
        return; // Detenemos ejecución aquí
    }

    // 2. Validación de Tamaño (4.5MB Límite estricto)
    // 4.5 * 1024 * 1024 = 4,718,592 bytes
    if (file.size > 4.5 * 1024 * 1024) {
        setErrorMsg("La imagen es muy pesada (Máx 4.5MB). Intenta recortarla un poco.");
        return; // Detenemos ejecución aquí
    }
    // ---------------------------------------------

    setLoading(true);

    // Preview de imagen
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
        // Ahora capturamos el mensaje específico que envía tu nuevo backend (413 o 415)
        throw new Error(data.error || `Error del servidor: ${response.status}`);
      }

      setResult(data as AnalysisResult);

    } catch (error: any) {
      console.error("Error:", error);
      setErrorMsg(error.message || "Ocurrió un problema al conectar con el cerebro de IA.");
      // Si falla, quitamos la preview para no confundir
      setImage(null); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh w-full max-w-md mx-auto relative bg-gray-50/50 flex flex-col">
        <Header_a/>
        
        <h1 className="text-2xl text-center font-bold tracking-tight mt-4 text-gray-900">
          Detector De Animales
        </h1>
        
        <div className="px-5 pt-6 flex flex-col gap-5 flex-1">

             {/* --- INPUT CÁMARA --- */}
             <div className="relative group">
                 <label className={`
                     relative w-full aspect-4/3 rounded-3xl border-2 
                     flex flex-col items-center justify-center gap-3 cursor-pointer
                     transition-all duration-300 overflow-hidden shadow-xl shadow-rose-100 hover:shadow-2xl hover:shadow-rose-200
                     ${loading 
                       ? 'bg-gray-50 border-gray-200 cursor-wait' 
                       : 'bg-white border-rose-400/30 hover:border-rose-500'
                     }
                     ${errorMsg ? 'border-red-300 bg-red-50' : ''}
                 `}>
                     {image && !result && !errorMsg ? (
                         <>
                             <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                             <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm z-10">
                                 <Loader2 className="animate-spin text-rose-600 h-12 w-12 mb-3" />
                                 <span className="text-rose-900 font-bold text-sm animate-pulse tracking-wide">Analizando IA...</span>
                             </div>
                         </>
                     ) : (
                         <>
                             <div className="p-5 rounded-full bg-rose-50 text-rose-500 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-rose-100">
                                 <Camera size={44} strokeWidth={1.5} />
                             </div>
                             <span className="text-lg font-bold text-gray-700 group-hover:text-rose-600 transition-colors">Tomar Foto</span>
                         </>
                     )}

                     <input
                         type="file"
                         accept="image/jpeg, image/png, image/webp" // Sugerencia para el OS móvil
                         capture="environment"
                         onChange={handleImageUpload}
                         className="hidden"
                         disabled={loading}
                     />
                 </label>
             </div>

             {/* --- INPUT GALERÍA --- */}
             <div className="relative">
                 <label
                     className={`
                         w-full h-15 px-6 rounded-2xl shadow-lg shadow-rose-500/20
                         flex items-center justify-center gap-3 cursor-pointer
                         transform transition-all duration-200
                         active:scale-[0.98]
                         ${loading
                           ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                           : 'text-black'
                         }
                     `}
                     style={!loading ? { backgroundColor: 'var(--intense-pink-cl)' } : {}}
                 >
                     <ImagePlus size={26} className="text-(--intense-pink)" strokeWidth={2} />
                     <span className="text-base font-bold tracking-wide">Subir desde Galería</span>

                     <input 
                        type="file" 
                        accept="image/jpeg, image/png, image/webp" 
                        onChange={handleImageUpload} 
                        className="hidden" 
                        disabled={loading}
                    />
                 </label>
             </div>

             {/* --- ERROR MESSAGE --- */}
             {errorMsg && (
                <div className="p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 flex items-start gap-3 animate-in slide-in-from-bottom-2 shadow-sm">
                    <AlertTriangle size={20} className="shrink-0 text-red-500 mt-0.5" />
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-red-900">No se pudo procesar</p>
                        <p className="text-sm">{errorMsg}</p>
                    </div>
                </div>
             )}

             {/* --- WARNING CARD --- */}
             {!errorMsg && (
                 <div className="rounded-xl border border-amber-200/60 bg-linear-to-br from-amber-50 to-orange-50 p-5 relative overflow-hidden">
                     <div className="absolute -right-2 -bottom-4 text-amber-500/10 rotate-12">
                         <AlertTriangle size={80} />
                     </div>
                     <h2 className=" font-bold text-amber-900 mb-1 flex items-center gap-2">
                         <AlertTriangle size={16} className="text-amber-600"/>
                         Precaución
                     </h2>
                     <p className="text-amber-900 text-sm leading-relaxed max-w-[90%]">
                         Mantén una distancia segura de al menos 1 metro. Tu seguridad es primero.
                     </p>
                 </div>
             )}

        </div> 

        {/* --- FOOTER --- */}
        <div className="px-5 pb-8 pt-4 mt-auto">
            <div className="relative overflow-hidden rounded-2xl pt-6 px-4 pb-6 text-white shadow-xl bg-[#D92B4B]">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl pointer-events-none pt-1" />

                <div className="relative z-10 flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-1 h-10">
                        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
                            <UserPlus size={20} className="text-white" />
                        </div>
                        <h3 className="font-bold text-lg leading-tight">
                            ¿Te gustaría analizar más?
                        </h3>
                    </div>
                    
                    <p className="text-white/90 text-sm leading-relaxed">
                        Crea una cuenta gratis para guardar tu historial de animales encontrados y subir de nivel como explorador.
                    </p>

                    <Link 
                        href="/Registro"
                        className="mt-2 w-full block group relative h-10"
                    >
                        <div className="flex h-8 items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#1e293b] transition-all hover:bg-gray-100 active:scale-95 shadow-sm">
                            Crear mi cuenta
                        </div>
                    </Link>
                </div>
            </div>
        </div>

        {/* --- MODAL --- */}
        {result && (
            <ResultModal result={result} onClose={closeModal} />
        )}
    </main>
  );
} 