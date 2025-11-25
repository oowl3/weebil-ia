import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Asegúrate de usar este paquete, no @auth/prisma-adapter
import { PrismaClient } from "@prisma/client";

// Instancia de Prisma (puedes importarla de tu singleton si ya tienes uno en lib/prisma.ts)
// Si ya tienes un archivo lib/prisma.ts, impórtalo: import { prisma } from "@/lib/prisma";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // 1. Conectamos el Adapter (Esto guarda los usuarios en PostgreSQL automáticamente)
  adapter: PrismaAdapter(prisma),

  // 2. Estrategia de Sesión
  // Usamos "jwt" por eficiencia. El usuario se guarda en DB al registrarse,
  // pero la sesión activa viaja en una cookie encriptada.
  session: {
    strategy: "jwt",
  },

  // 3. Proveedores
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // 4. Callbacks (Inyección de ID)
  callbacks: {
    async jwt({ token, user }) {
      // user solo existe en el primer login ("sign in")
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        // Inyectamos el ID del usuario (CUID de Prisma) en la sesión del frontend
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  // 5. Páginas personalizadas (Opcional)
  pages: {
    signIn: '/Registro',
    error: '/Registro',
  },
};