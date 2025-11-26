import React from "react";
import Logo from "@/app/components/logo";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default function Header_s() {
  return (
    <header className="relative w-full z-10">
      
      {/* CONTENEDOR PRINCIPAL */}
      <div
        className="w-full bg-white shadow-sm rounded-b-[60px] sm:rounded-b-[120px] border-t-4 border-black 
        py-12 sm:py-20 flex items-center justify-center overflow-hidden"
      >
        
        {/* --- TU NUEVO BLOQUE DE SALIR --- */}
        <div className="absolute top-5 right-6 z-50 flex items-center gap-2">
           {/* Hacemos que el texto se oculte en móviles muy pequeños para no saturar */}
           <p className="text-sm font-bold text-gray-500 hidden sm:block">
             Cerrar Sesión
           </p>
           <SignOutButton />
        </div>

        {/* --- ZONA DEL LOGO --- */}
        <Link href="/Home" className="group cursor-pointer">
          <div className="flex items-center gap-2 sm:gap-4 transition-transform duration-300 ease-out group-hover:scale-[1.05] group-active:scale-95">
            <div className="scale-75 sm:scale-100">
                <Logo />
            </div>
            
            <h1 className="font-bold flex items-center select-none leading-none">
              <span className="text-(--intense-pink) text-4xl sm:text-5xl">W</span>
              <span className="text-(--black-deep) text-4xl sm:text-5xl">e</span>
              <span className="text-(--black-deep) text-4xl sm:text-5xl">e</span>
              <span className="text-(--black-deep) text-4xl sm:text-5xl">b</span>
              <span className="text-(--green-light) text-4xl sm:text-5xl">i</span>
              <span className="text-(--green-light) text-4xl sm:text-5xl">l</span>
            </h1>
          </div>
        </Link>

      </div>
    </header>
  );
}