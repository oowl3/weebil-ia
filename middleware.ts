export { default } from "next-auth/middleware";

// Aquí definimos QUÉ rutas deben ser protegidas obligatoriamente.
export const config = {
  matcher: [
    // 1. Protegemos el historial completo (solo para usuarios registrados)
    "/historial/:path*",
    
    // 2. Protegemos el perfil o configuración de cuenta
    "/perfil/:path*",
    
    // 3. OJO TÁCTICO:
    // NO incluimos "/analizar" aquí.
    // ¿Por qué? Porque queremos que los usuarios "Invitados" (sin cuenta)
    // puedan entrar a esa página para escanear en caso de emergencia.
    // La página /analizar se encargará de verificar si hay sesión o no.
  ],
};