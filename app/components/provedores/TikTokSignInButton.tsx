"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react"; 

export default function TikTokSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const loginWithTikTok = async () => {
    try {
      setIsLoading(true);
      // OJO: Cambiamos "google" por "tiktok"
      await signIn("tiktok", { callbackUrl: "/analizar" }); 
    } catch (error) {
      console.error("Error en login con TikTok:", error);
    } finally {
      // No reseteamos isLoading a false inmediatamente si redirige,
      // para evitar que el usuario haga clic de nuevo.
    }
  };

  return (
    <button
      onClick={loginWithTikTok}
      disabled={isLoading}
      className={`
        flex w-full items-center justify-center gap-3 px-6 py-3 
        bg-black text-white  /* TikTok usa fondo negro y texto blanco */
        border border-transparent rounded-lg shadow-sm 
        hover:bg-gray-800 hover:shadow-md transition-all duration-200
        font-medium text-sm sm:text-base
        disabled:opacity-70 disabled:cursor-not-allowed
      `}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin text-white" />
      ) : (
        // Icono SVG de TikTok (Blanco)
        <svg 
          className="w-5 h-5 fill-current" 
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
        </svg>
      )}
      
      {isLoading ? "Conectando..." : "Continuar con TikTok"}
    </button>
  );
}