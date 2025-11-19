import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'; 
import prisma from '../../../lib/prisma';
import { z } from 'zod'; 

// --- ESQUEMA PARA GET (Query Params) ---
// Opcional: o buscamos por animal, o por antídoto
const querySchema = z.object({
  animalId: z.coerce.number().int().positive().optional(),
  antidotoId: z.coerce.number().int().positive().optional(),
});

// --- ESQUEMA PARA POST (JSON Body) ---
// Para crear la relación, ambos son obligatorios
const createSchema = z.object({
  animalId: z.number().int().positive("ID de animal inválido"),
  antidotoId: z.number().int().positive("ID de antídoto inválido"),
});


// ==================================================================
//   API Handler para OBTENER las relaciones
// ==================================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // 1. Validar los filtros opcionales
    const validation = querySchema.safeParse(queryParams);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Parámetros de query inválidos", detalles: validation.error.issues }, 
        { status: 400 }
      );
    }

    // 2. Construir la cláusula 'where'
    const { animalId, antidotoId } = validation.data;
    const whereClause: Prisma.AnimalAntidotoWhereInput = {};

    if (animalId) {
      whereClause.animalId = animalId; // Filtra por animal
    }
    if (antidotoId) {
      whereClause.antidotoId = antidotoId; // Filtra por antídoto
    }

    // 3. Buscar las relaciones
    const relaciones = await prisma.animalAntidoto.findMany({
      where: whereClause,
      include: {
        animal: true, // Trae info del animal
        antidoto: true, // Trae info del antídoto
      },
    });

    return NextResponse.json(relaciones);

  } catch (error) {
    console.error('Error al obtener relación AnimalAntidoto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

// ==================================================================
//   API Handler para CREAR una relación Animal-Antídoto (POST)
// ==================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validar el body con Zod
    const validation = createSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Datos de entrada inválidos", detalles: validation.error.issues },
        { status: 400 }
      );
    }
    
    // --- Lógica de Ingeniería (Idempotencia) ---
    // Usamos "upsert" una vez más. Si la relación ya existe, no hace nada.
    // Si no existe, la crea. Perfecto.
    const { animalId, antidotoId } = validation.data;

    const nuevaRelacion = await prisma.animalAntidoto.upsert({
      where: {
        // La clave primaria @@id([animalId, antidotoId])
        animalId_antidotoId: {
          animalId: animalId,
          antidotoId: antidotoId,
        }
      },
      // Datos a actualizar si ya existe: (nada)
      update: {},
      // Datos a crear si no existe:
      create: {
        animalId: animalId,
        antidotoId: antidotoId,
      }
    });

    return NextResponse.json(nuevaRelacion, { status: 201 }); 

  } catch (error) {
    console.error('Error al crear relación AnimalAntidoto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
