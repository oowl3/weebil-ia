import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Importamos la configuración que acabamos de crear

// Inicializamos NextAuth con nuestra configuración
const handler = NextAuth(authOptions);

// Exportamos los métodos HTTP que Next.js necesita para manejar las peticiones
export { handler as GET, handler as POST };