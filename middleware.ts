import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Aquí puedes inyectar headers de seguridad, logging, etc.
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // ---------------------------------------------------------
        // 1. ZONA DESMILITARIZADA (DMZ) - Rutas Públicas
        // ---------------------------------------------------------
        
        // Excepción A: Rutas de Autenticación y APIs públicas del escáner
        if (
             path.startsWith("/api/auth") || 
             path.startsWith("/api/analizar_g") ||
             path.startsWith("/api/faq") ||
             path === "/Faq" || 
             path === "/Inicio" || 
             path === "/Informacion" || 
             path === "/Registro" || 
             path === "/"      
        ) {
          return true;
        }

        // Excepción B: El Scanner (Frontend)
        if (path.startsWith("/Analizar")) {
          return true;
        }

        // ---------------------------------------------------------
        // 2. ZONA PROTEGIDA - Validación de Token
        // ---------------------------------------------------------
        return !!token;
      },
    },
    // Redirige al usuario al registro si intenta acceder a zona protegida sin token
    pages: {
      signIn: "/Inicio", 
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|avif|png|jpg|jpeg|gif|webp|txt)$).*)",
  ],
};