"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

// 1. Definimos una interfaz para las Props
interface SignOutButtonProps {
  className?: string; // El signo '?' lo hace opcional
}

// 2. Aplicamos la interfaz al componente
export default function SignOutButton({ className }: SignOutButtonProps) {
  
  // 3. Tipamos el evento como un evento de ratón sobre un botón HTML
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    // IMPORTANTE: stopPropagation evita que el click active el Link de fondo si se superponen
    e.preventDefault(); 
    e.stopPropagation();
    signOut({ callbackUrl: "/Registro" });
  };

  return (
    <button
      onClick={handleLogout}
      // Combinamos tus clases con la prop className para posicionamiento externo
      className={`group flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 
      text-sm font-medium text-red-500 bg-white/80 backdrop-blur-sm 
      border border-transparent hover:border-red-200 rounded-full 
      hover:bg-red-50 hover:shadow-md transition-all duration-300 ${className || ""}`}
      title="Cerrar sesión"
    >
      <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      {/* El texto 'Salir' se oculta en móviles muy pequeños para limpieza visual */}
      <span className="hidden xs:inline">Salir</span>
    </button>
  );
}