import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Usamos 'export const' para permitir import { prisma } from ...
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Opcional: exportar por defecto también para compatibilidad con tus archivos viejos
export default prisma;