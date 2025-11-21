import Link from "next/link";
import { BotOff } from 'lucide-react';

export default function NotFound() {
      return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-desert-sand p-4 text-center text-desert-night overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-4 bg-(--intense-pink) z-20"></div>
            <h1 className="font-brand text-[10rem] font-bold text-desert-night opacity-10 leading-none select-none absolute z-0">404</h1>
            {/* Contenido Principal */}
            <div className="relative z-10 mt-8">
                  <BotOff />
                  <h2 className="text-3xl font-bold text-desert-night">Te has perdido en el desierto</h2>
                  <p className="mt-3 text-lg text-desert-night/70 max-w-md mx-auto">
                  Esta ruta no existe o fue cubierta por la arena. No te preocupes, es territorio seguro.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                              href="/Inicio"
                              className="inline-flex items-center justify-center rounded-xl bg-desert-night px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                              Regresar al Inicio
                        </Link>
                        
                        {/* Botón secundario por si quieren ir directo a escanear */}
                        <Link
                              href="/Scaner"
                              className="inline-flex items-center justify-center rounded-xl border-2 border-desert-night px-8 py-3 font-bold text-desert-night transition-colors hover:bg-desert-night hover:text-white"
                        >
                              Ir al Escáner
                        </Link>
                  </div>
            </div>
      <div className="absolute bottom-0 left-0 w-full h-4 bg-(--intense-pink) z-20"></div>
      </main>
      );
}