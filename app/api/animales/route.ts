import { NextResponse } from 'next/server';

import { Prisma } from '@prisma/client'; 
import prisma from '../../../lib/prisma';
import { z } from 'zod'; 


const querySchema = z.object({
  // z.coerce.boolean() convierte "true" a true, "false" a false
  esVenenoso: z.coerce.boolean().optional(),
  
  // z.string().optional() permite que la búsqueda sea opcional
  nombreComun: z.string().optional(),
});


// Valida el JSON que envías para crear un nuevo animal
const animalCreateSchema = z.object({
  nombreComun: z.string().min(1, "El nombre común es requerido"),
  nombreCientifico: z.string().optional(),
  esVenenoso: z.boolean().optional(),
  descripcion: z.string().optional(),
  habitat: z.string().optional(),
  primerosAuxilios: z.string().optional(),
  rutaImagenCard: z.string().optional(),
});


// ==================================================================
//   API Handler para OBTENER animales (GET)
// ==================================================================
export async function GET(request: Request) {
  try {
    // 1. Obtener y validar los query parameters de la URL
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // 2. Validar con Zod
    const validation = querySchema.safeParse(queryParams);

    // Si la validación falla, retorna un error 400 (Bad Request)
    if (!validation.success) {
      return NextResponse.json(
        { error: "Parámetros de query inválidos", detalles: validation.error.issues }, 
        { status: 400 }
      );
    }

    // 3. Extraer los datos validados
    const { esVenenoso, nombreComun } = validation.data;

    // 4. Construir la cláusula 'where' de Prisma dinámicamente
    const whereClause: Prisma.AnimalWhereInput = {};

    // 5. Añadir filtros a la cláusula SOLO si fueron proporcionados
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

    // 6. Llamar a Prisma con los filtros dinámicos
    const animales = await prisma.animal.findMany({
      where: whereClause, // ¡Aquí aplicamos los filtros!
      orderBy: { id: 'asc' }, // Ordenados por ID (1, 2, 3...)
    });

    // 7. Retorna la respuesta en JSON
    return NextResponse.json(animales);

  } catch (error) {
    // 8. Manejo de errores
    console.error('Error al obtener animales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener el catálogo.' },
      { status: 500 }
    );
  }
}

// ==================================================================
//   API Handler para CREAR un animal (POST)
// ==================================================================
export async function POST(request: Request) {
  try {
    // 1. Obtener el body (el JSON de la Viuda Negra)
    const body = await request.json();

    // 2. Validar el body con el nuevo esquema de Zod
    const validation = animalCreateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Datos de entrada inválidos", detalles: validation.error.issues },
        { status: 400 } // 400 Bad Request
      );
    }

    // 3. ¡Validación exitosa! Crear el animal en la BD
    const nuevoAnimal = await prisma.animal.create({
      data: validation.data, // validation.data son los datos limpios
    });

    // 4. Retornar el animal recién creado
    // 201 Created: El recurso se creó con éxito
    return NextResponse.json(nuevoAnimal, { status: 201 });

  } catch (error) {
    // 5. Manejo de errores (ej: la BD falla)
    console.error('Error al crear animal:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al crear el animal.' },
      { status: 500 }
    );
  }
}