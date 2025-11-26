import Link from "next/link";
import { BotOff } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-desert-sand px-6 py-10 text-center text-desert-night relative overflow-hidden">

      {/* Barra superior rosa */}
      <div className="absolute top-0 left-0 w-full h-4 bg-(--intense-pink) z-20"></div>

      {/* Contenido */}
      <div className="relative z-10 mt-6 flex flex-col items-center max-w-xs">
        <BotOff className="w-14 h-14 text-desert-night/80 mb-4" />
        <h2 className="text-2xl font-extrabold text-desert-night">
          #404
        </h2>
        <h2 className="text-2xl font-bold text-desert-night">
          Te has perdido en el desierto.
        </h2>

        <p className="mt-3 text-base text-desert-night/70">
          Esta ruta no existe o fue cubierta por la arena.
        </p>

        <div className="mt-8 flex flex-col gap-3 w-full">
          {/* Botón principal */}
          <Link
            href="/Inicio"
            className="
              w-full inline-flex items-center justify-center rounded-xl
              py-3 font-semibold 
              border-2 border-(--brown-mid-2)
              text-(--brown-mid-1)
              bg-transparent
              transition-all
              hover:bg-(--sand-2)/40 
              active:scale-95
            "
          >
            Regresar al Inicio
          </Link>

          {/* Botón secundario */}
          <Link
            href="/Analizar"
            className="
              w-full inline-flex items-center justify-center rounded-xl
              py-3 font-semibold 
              border-2 border-(--brown-mid-2)
              text-(--brown-mid-1)
              bg-transparent
              transition-all
              hover:bg-(--sand-2)/40 
              active:scale-95
            "
          >
            Ir al Escáner
          </Link>
        </div>
      </div>

      {/* Barra inferior rosa */}
      <div className="absolute bottom-0 left-0 w-full h-4 bg-(--intense-pink) z-20"></div>
    </main>
  );
}