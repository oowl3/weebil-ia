import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
// Importamos desde tu nuevo archivo en la raíz 'lib'
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  // 1. Conectamos el Adapter
  adapter: PrismaAdapter(prisma),

  // 2. Proveedores (Google)
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

  // 3. Sesión en Base de Datos
  session: {
    strategy: "database",
  },

  // 4. Callbacks (Inyectar ID)
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  // 5. Páginas personalizadas
  pages: {
    signIn: '/login',
    error: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };