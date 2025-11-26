import React from "react";
import Link from 'next/link';
import Logo from "./logo";
import { Mail } from "lucide-react"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FCF4EE] border-t border-stone-200 mt-20">
      <div className="w-full h-px bg-(--intense-pink)" />
      {/* Contenedor Principal */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">

          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="scale-90 origin-left">
                <Logo />
              </div>
              <span className="text-xl font-bold text-stone-800 tracking-tight">Weebil</span>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed max-w-xs">
              Explorando la naturaleza, un descubrimiento a la vez. Tu compañero inteligente para identificar fauna.
            </p>
          </div>

          <div className="flex flex-col space-y-4 md:pl-10">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Explorar</h3>
            
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              <FooterLink href="/Informacion">Preguntas Frecuentes</FooterLink>
              <FooterLink href="/Informacion">Privacidad y Condiciones</FooterLink>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Contacto</h3>
            <p className="text-stone-600 text-sm">
              ¿Tienes dudas o encontraste un bug?
            </p>
            <div className="flex items-center gap-3 p-3  w-fit">
               <Mail size={18} className="text-rose-500" />
               <a href="mailto:gorgojos@weebil.mx" className="text-sm font-medium text-stone-700 hover:text-rose-600 transition-colors">
                 gorgojos@weebil.mx
               </a>
            </div>
          </div>

        </div>
      </div>

      {/* Barra Inferior (Copyright) */}
      <div className="border-t border-stone-200/60 bg-[#F5EBE5]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500 font-medium">
            © {currentYear} Weebil. By:Ranita-Pandax-Londrix-Bichin-Morenazo
          </p>
          <p className="text-xs text-stone-400 flex items-center gap-1">
             Hecho con <span className="text-rose-500">♥</span> en La Laguna, MX
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-stone-600 text-sm hover:text-rose-600 transition-colors inline-block"
      >
        {children}
      </Link>
    </li>
  );
}