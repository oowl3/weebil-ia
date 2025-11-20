import NextAuth, { AuthOptions } from "next-auth";
//import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {

  providers: [],

  session: {
    strategy: "database",
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
