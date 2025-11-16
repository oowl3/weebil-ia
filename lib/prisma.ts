import { PrismaClient } from '@prisma/client';

// Esto evita que se creen múltiples conexiones a la base de datos
// durante el desarrollo (es una "mejor práctica" estándar).

declare global {
  // Permite que 'prisma' exista en el objeto 'global' de Node.js
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = client;
}

// Exporta el cliente único para que lo uses en tu app
export default client;