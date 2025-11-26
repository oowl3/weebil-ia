"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react"; 
// Asegúrate de importar los iconos necesarios (si no tienes react-icons, usa SVGs inline como abajo)
// import { FaTiktok, FaGoogle } from "react-icons/fa"; 

export default function SocialLoginButtons() {
  // Estado para saber qué botón está cargando específicamente
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleLogin = async (provider: string) => {
    try {
      setLoadingProvider(provider);
      // La callbackUrl es la misma para ambos, redirige al escáner
      await signIn(provider, { callbackUrl: "/analizar" }); 
    } catch (error) {
      console.error(`Error en login con ${provider}:`, error);
      setLoadingProvider(null);
    }
    // Nota: No reseteamos setLoadingProvider a null en 'finally' si la redirección es exitosa
    // para evitar que el usuario haga clic mientras navega.
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* BOTÓN DE GOOGLE */}
      <button
        onClick={() => handleLogin("google")}
        disabled={loadingProvider !== null}
        className={`
          flex w-full items-center justify-center gap-3 px-6 py-3 
          bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm 
          hover:bg-gray-50 hover:shadow-md transition-all duration-200
          font-medium text-sm sm:text-base
          disabled:opacity-70 disabled:cursor-not-allowed
        `}
      >
        {loadingProvider === "google" ? (
          <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
        ) : (
          // Icono Google
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        )}
        <span>Continuar con Google</span>
      </button>

      {/* BOTÓN DE TIKTOK */}
      <button
        onClick={() => handleLogin("tiktok")}
        disabled={loadingProvider !== null}
        className={`
          flex w-full items-center justify-center gap-3 px-6 py-3 
          bg-black text-white border border-transparent rounded-lg shadow-sm 
          hover:bg-gray-800 hover:shadow-md transition-all duration-200
          font-medium text-sm sm:text-base
          disabled:opacity-70 disabled:cursor-not-allowed
        `}
      >
        {loadingProvider === "tiktok" ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : (
          // Icono TikTok
          <svg 
            className="w-5 h-5 fill-current" 
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
          </svg>
        )}
        <span>Continuar con TikTok</span>
      </button>
    </div>
  );
}