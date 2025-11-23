import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Aquí podrías agregar lógica extra si fuera necesario, 
    // por ejemplo, redirigir basándote en roles (Admin vs User).
    // Por ahora, simplemente retornamos 'next()' para permitir el paso
    // si la validación 'authorized' (abajo) pasa.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // 1. EXCEPCIONES PÚBLICAS EXPLÍCITAS
        // Si la ruta es para el Escáner o Autenticación, permitimos el acceso siempre.
        // Esto cubre /api/scaner (si existiera) o cualquier lógica del scaner.
        if (
            path.startsWith("/api/auth") || 
            path.startsWith("/Scaner") ||
            path.startsWith("/api/analizar_g") ||
            path.startsWith("/api/ia/chat") // Asumiendo que el scanner tiene API
        ) {
          return true;
        }

        // 2. PROTECCIÓN POR DEFECTO
        // Si existe un token, el usuario está autorizado.
        // Si no, NextAuth lo redirigirá automáticamente al login.
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * MATCHER REGEX EXPLICADO:
     * 1. /Home/:path* -> Protege toda la carpeta Home y sus subrutas.
     * 2. /api/:path* -> Protege todas las APIs.
     * * NOTA: Aunque el matcher captura todas las APIs, la lógica dentro
     * de 'callbacks.authorized' arriba es la que excluye explícitamente
     * a '/api/auth' y '/Scaner' de ser bloqueados.
     */
    "/Home/:path*",
    "/api/:path*",
    // Puedes agregar "/perfil/:path*" o "/historial/:path*" aquí si existen
  ],
};