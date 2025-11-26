import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Asegúrate de importar tu instancia global

export const authOptions: NextAuthOptions = {
  // 1. Adapter: Sigue guardando usuarios en tu DB (Postgres)
  adapter: PrismaAdapter(prisma),

  // 2. Estrategia: VOLVEMOS A JWT.
  // Esto hace que el middleware funcione rápido y sin consultar la DB en cada request.
  session: {
    strategy: "jwt",
  },

  // 3. Proveedores
  providers: [
    // --- GOOGLE ---
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

// --- TIKTOK CORREGIDO ---
    {
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      clientId: process.env.TIKTOK_CLIENT_KEY!, 
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
      
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize/",
        params: {
          scope: "user.info.basic",
          response_type: "code",
          // --- EL CAMBIO CLAVE ---
          // Forzamos el nombre del parámetro que TikTok exige.
          client_key: process.env.TIKTOK_CLIENT_KEY, 
        },
      },
      
      token: {
        url: "https://open.tiktokapis.com/v2/oauth/token/",
        params: {
          grant_type: "authorization_code",
          // También aseguramos el key para el intercambio del token
          client_key: process.env.TIKTOK_CLIENT_KEY, 
        },
      },
      
      userinfo: "https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name",
      
      profile(profile) {
        const userData = profile.data?.user || {};
        return {
          id: userData.open_id || userData.union_id,
          name: userData.display_name || "TikTok User",
          email: null, 
          image: userData.avatar_url,
        };
      },
      checks: ["state", "pkce"], 
    },
  ],

  // 4. Callbacks para JWT
  callbacks: {
    // Paso 1: Cuando el usuario se loguea, el token JWT se crea.
    // Aquí persistimos el ID del usuario (que viene de la DB) dentro del token encriptado.
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Paso 2: Cuando el cliente pide la sesión, sacamos el ID del token
    // y se lo damos al cliente.
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    
    // Paso 3: Redirección forzada e inteligente
    async redirect({ url, baseUrl }) {
      // Si la url es login o raíz, mandar a Home
      if (url === "/" || url === "/Registro" || url === "/Inicio") {
        return `${baseUrl}/Home`;
      }
      // Si es una URL relativa, respetar
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Si es el mismo origen, respetar
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },

  // 5. Páginas
  pages: {
    signIn: '/Registro',
    error: '/Registro', 
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };