import { NextResponse } from 'next/server';
// Importamos 'Prisma' para poder tipar nuestra cláusula 'where'
import { Prisma } from '@prisma/client'; 
import prisma from '../../../lib/prisma';
import { z } from 'zod'; // ¡Importamos Zod!

// 1. Esquema de validación para los *query parameters* (parámetros de URL)

const querySchema = z.object({
  
  // z.coerce.boolean() convierte "true" a true, "false" a false
  esVenenoso: z.coerce.boolean().optional(),
  
  // z.string().optional() permite que la búsqueda sea opcional
  nombreComun: z.string().optional(),
});


/**

 * Ruta: GET /api/animals
 * * Acepta filtros de query:
 * ?esVenenoso=true
 * ?nombreComun=Alacran
 */
export async function GET(request: Request) {
  try {
    // 2. Obtener y validar los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // 3. Validar con Zod
    const validation = querySchema.safeParse(queryParams);

    // Si la validación falla, retorna un error 400 (Bad Request)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Parámetros de query inválidos", detalles: validation.error.issues }, 
        { status: 400 }
      );
    }

    // 4. Extraer los datos validados
    const { esVenenoso, nombreComun } = validation.data;

    // 5. Construir la cláusula 'where' de Prisma dinámicamente
    //    Usamos el tipo 'Prisma.AnimalWhereInput' para que TypeScript nos ayude
    const whereClause: Prisma.AnimalWhereInput = {};

    // 6. Añadir filtros a la cláusula SOLO si fueron proporcionados
    if (esVenenoso !== undefined) {
      whereClause.esVenenoso = esVenenoso;
    }

    if (nombreComun) {
      whereClause.nombreComun = {
        // "contains" para búsqueda de texto (LIKE '%nombre%')
        // "mode: 'insensitive'" para ignorar mayúsculas/minúsculas (A a Z)
        contains: nombreComun,
        mode: 'insensitive', 
      };
    }

    // 7. Llamar a Prisma con los filtros dinámicos
    const animales = await prisma.animal.findMany({
      where: whereClause, 
      orderBy: {
        id: 'asc', 
      },
    });

    // 8. Retorna la respuesta en JSON
    return NextResponse.json(animales);

  } catch (error) {
    // 9. Manejo de errores
    console.error('Error al obtener animales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener el catálogo de animales.' },
      { status: 500 }
    );
  }
}