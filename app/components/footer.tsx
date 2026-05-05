import React from "react";
import Link from 'next/link';
import Logo from "./logobixil";
import { Mail } from "lucide-react"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-(--green-1) border-t border-(--gray-1) mt-20">

      {/* LINEA SUPERIOR */}
      <div className="w-full h-[3px] bg-(--yellow-2)" />

      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">

          {/* LOGO + INFO */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <div className="scale-90 origin-left">
                <Logo />
              </div>
              <span className="text-xl font-bold text-(--black-1) tracking-tight">
                Bixil
              </span>
            </div>

            <p className="text-(--black-2) text-sm leading-relaxed max-w-xs">
              Explorando la naturaleza, un descubrimiento a la vez. Tu compañero inteligente para identificar fauna.
            </p>
          </div>

          {/* LINKS */}
          <div className="flex flex-col space-y-4 md:pl-10">
            <h3 className="text-sm font-bold text-(--black-1) uppercase tracking-wider">
              Explorar
            </h3>
            
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              <FooterLink href="/Faq">Preguntas Frecuentes</FooterLink>
              <FooterLink href="/Informacion">Privacidad y Condiciones</FooterLink>
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-sm font-bold text-(--black-1) uppercase tracking-wider">
              Contacto
            </h3>

            <p className="text-(--black-2) text-sm">
              ¿Tienes dudas o encontraste un bug?
            </p>

            {/* TARJETA CONTACTO */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-(--yellow-1) border border-(--yellow-2) w-fit shadow-sm">
              <Mail size={18} className="text-(--green-5)" />
              <a 
                href="mailto:gorgojos@weebil.mx" 
                className="text-sm font-medium text-(--black-1) hover:text-(--green-5) transition-colors"
              >
                gorgojos@weebil.mx
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER FINAL */}
      <div className="border-t border-(--gray-1) bg-(--green-1)">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-(--black-2) font-medium">
            © {currentYear} Bixil. By: Ranita - Pandax - Gatoloco - Bichin - 
          </p>

          <p className="text-xs text-(--black-2) flex items-center gap-1">
            Hecho con <span className="text-(--red-2)">♥</span> en La Laguna, MX
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
        className="text-(--black-2) text-sm hover:text-(--green-5) transition-colors inline-block"
      >
        {children}
      </Link>
    </li>
  );
}