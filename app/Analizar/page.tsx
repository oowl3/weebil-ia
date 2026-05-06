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
  Loader2
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

    setErrorMsg(null);
    setResult(null);

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
    if (!validTypes.includes(file.type)) {
        setErrorMsg("Formato no válido. Por favor usa JPG, PNG o WEBP.");
        return;
    }

    if (file.size > 4.5 * 1024 * 1024) {
        setErrorMsg("La imagen es muy pesada (Máx 4.5MB). Intenta recortarla un poco.");
        return;
    }

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
        throw new Error(data.error || `Error del servidor: ${response.status}`);
      }

      setResult(data as AnalysisResult);

    } catch (error: any) {
      console.error("Error:", error);
      setErrorMsg(error.message || "Ocurrió un problema al conectar con el cerebro de IA.");
      setImage(null); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh w-full max-w-md mx-auto relative bg-(--green-1) flex flex-col">
      <Header_a/>
      
      <h1 className="text-2xl text-center font-bold tracking-tight mt-4 text-(--black-1)">
        Detector De Animales
      </h1>
      
      <div className="px-5 pt-6 flex flex-col gap-5 flex-1">

        {/* CAMARA */}
        <div className="relative group">
          <label className={`
            relative w-full aspect-4/3 rounded-3xl border 
            flex flex-col items-center justify-center gap-3 cursor-pointer
            transition-all duration-300 overflow-hidden shadow-md hover:shadow-lg
            ${loading 
              ? 'bg-(--green-1) border-(--gray-1) cursor-wait' 
              : 'bg-(--white) border-(--gray-1) hover:border-(--green-4)'
            }
            ${errorMsg ? 'border-(--red-2) bg-(--red-1)' : ''}
          `}>

            {/* LOADING */}
            {image && !result && !errorMsg ? (
              <>
                <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm z-10">
                  <Loader2 className="animate-spin text-(--green-5) h-12 w-12 mb-3" />
                  <span className="text-(--black-1) font-bold text-sm animate-pulse">
                    Analizando IA...
                  </span>
                </div>
              </>
            ) : errorMsg ? (
              <>
                <div className="p-5 rounded-full bg-(--red-1) text-(--red-2) border border-(--red-2)">
                  <AlertTriangle size={44} />
                </div>
                <span className="text-lg font-bold text-(--red-2)">
                  Error al cargar imagen
                </span>
              </>
            ) : (
              <>
                <div className="p-5 rounded-full bg-(--green-1) text-(--green-5) border border-(--gray-1) group-hover:scale-110 transition">
                  <Camera size={44} />
                </div>
                <span className="text-lg font-bold text-(--black-2) group-hover:text-(--green-5)">
                  Tomar Foto
                </span>
              </>
            )}

            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
              disabled={loading}
            />
          </label>

          {/* ERROR */}
          {errorMsg && (
            <div className="mt-3 text-sm text-(--red-4) bg-(--red-1) border border-(--red-2) p-3 rounded-xl">
              {errorMsg}
            </div>
          )}
        </div>

        {/* BOTON GALERIA */}
        <label className={`
          w-full h-15 px-6 rounded-2xl shadow-md
          flex items-center justify-center gap-3 cursor-pointer
          transition active:scale-[0.98]
          ${loading
            ? 'bg-(--gray-1) text-(--black-2)'
            : 'bg-(--green-2) hover:bg-(--green-3) text-(--black-1)'
          }
        `}>
          <ImagePlus size={26} />
          <span className="font-bold">Subir desde Galería</span>

          <input type="file" className="hidden" onChange={handleImageUpload}/>
        </label>

        {/* WARNING */}
        {!errorMsg && (
          <div className="rounded-xl border border-(--yellow-2) bg-(--yellow-1) p-5">
            <h2 className="font-bold text-(--black-1) flex items-center gap-2">
              <AlertTriangle size={16} className="text-(--yellow-2)"/>
              Precaución
            </h2>
            <p className="text-(--black-2) text-sm">
              Mantén una distancia segura de al menos 1 metro.
            </p>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className="px-5 pb-8 pt-4 mt-auto">
        <div className="rounded-2xl pt-6 px-4 pb-6 shadow-md bg-(--green-1) border border-(--gray-1)">
          <h3 className="font-bold text-lg text-(--black-1) mb-3">
            ¿Te gustaría analizar más?
          </h3>

          <Link href="/Registro">
            <div className="flex h-10 items-center justify-center rounded-xl bg-(--green-4) hover:bg-(--green-5) text-white font-bold">
              Crear mi cuenta
            </div>
          </Link>
        </div>
      </div>

      {result && (
        <ResultModal result={result} onClose={closeModal} />
      )}
    </main>
  );
}