import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'; 
import prisma from '../../../lib/prisma';
import { z } from 'zod'; 

// --- ESQUEMA PARA GET (Query Params) ---
const querySchema = z.object({
  // CORRECCIÓN: El ID de usuario es String, no Number
  usuarioId: z.string().min(1, "El ID de usuario es requerido"),
});

// --- ESQUEMA PARA POST (JSON Body) ---
const pokedexCreateSchema = z.object({
  // CORRECCIÓN: El usuario es String, el animal SÍ es Number (Int)
  usuarioId: z.string().min(1, "ID de usuario inválido"),
  animalId: z.number().int().positive("ID de animal inválido"),
});


// ==================================================================
//   API Handler para OBTENER la Pokedex de un usuario (GET)
// ==================================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validamos que nos hayan pasado el ?usuarioId=X
    const validation = querySchema.safeParse(queryParams);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Parámetros de query inválidos", detalles: validation.error.issues }, 
        { status: 400 }
      );
    }

    const { usuarioId } = validation.data;

    // Buscamos las entradas de la pokedex y "traemos" la info del animal
    const pokedex = await prisma.animalDesbloqueado.findMany({
      where: { usuarioId: usuarioId }, // Ahora usuarioId es String y Prisma es feliz
      include: {
        // ¡Incluye los datos del animal (nombre, foto, etc.)!
        animal: true, 
      },
      orderBy: { animalId: 'asc' }
    });

    return NextResponse.json(pokedex);

  } catch (error) {
    console.error('Error al obtener Pokedex:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

// ==================================================================
//   API Handler para DESBLOQUEAR un animal (POST)
// ==================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = pokedexCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Datos de entrada inválidos", detalles: validation.error.issues },
        { status: 400 }
      );
    }
    
    // --- Lógica de Ingeniería (Idempotencia) ---
    const desbloqueo = await prisma.animalDesbloqueado.upsert({
      where: {
        // La clave primaria compuesta
        usuarioId_animalId: {
          usuarioId: validation.data.usuarioId, // String
          animalId: validation.data.animalId    // Int
        }
      },
      // Datos a crear si no existe:
      create: {
        usuarioId: validation.data.usuarioId,
        animalId: validation.data.animalId,
      },
      // Datos a actualizar si ya existe (nada):
      update: {}
    });

    return NextResponse.json(desbloqueo, { status: 201 });

  } catch (error) {
    console.error('Error al desbloquear animal:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}