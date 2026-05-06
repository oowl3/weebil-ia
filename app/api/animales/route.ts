import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'; 
import prisma from '@/lib/prisma'; // Asegúrate que el alias @ o la ruta relativa sea correcta
import { z } from 'zod'; 

// ==================================================================
//  ESQUEMAS DE VALIDACIÓN (ZOD)
// ==================================================================

// 1. Schema para Query Params (GET)
const querySchema = z.object({
  peligrosidad: z.coerce.number().min(1).max(3).optional(),
  nombreComun: z.string().optional(),
});

// 2. Schema para Crear Animal (POST)
const animalCreateSchema = z.object({
  nombreComun: z.string().min(1, "El nombre común es requerido"),
  nombreCientifico: z.string().optional(),
  descripcion: z.string().optional(),
  habitat: z.string().optional(),
  primerosAuxilios: z.string().optional(),
  rutaImagen: z.string().optional(),
  peligrosidad: z.number().int().min(1).max(3).default(1), // 1=Verde, 2=Amarillo, 3=Rojo
  categoria: z.number().int().default(1), // 1=Araña, etc.
});

// ==================================================================
//   API Handler para OBTENER animales (GET)
// ==================================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parseo seguro de parámetros
    const validation = querySchema.safeParse(Object.fromEntries(searchParams.entries()));

    if (!validation.success) {
      return NextResponse.json(
        { error: "Parámetros de entrada inválidos", detalles: validation.error.issues }, 
        { status: 400 }
      );
    }

    const { peligrosidad, nombreComun } = validation.data;

    // CONSTRUCCIÓN DINÁMICA DEL FILTRO (Type-Safe)
    // Usamos spread operator condicional para evitar asignar 'undefined' a campos que Prisma podría no esperar así
    // si los tipos no están regenerados.
    const whereClause: Prisma.AnimalWhereInput = {
      ...(peligrosidad !== undefined && { peligrosidad }), 
      ...(nombreComun && {
        nombreComun: {
          contains: nombreComun,
          mode: 'insensitive',
        },
      }),
    };

    const animales = await prisma.animal.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(animales);

  } catch (error) {
    console.error('Excepción en controlador GET /animales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

// ==================================================================
//   API Handler para CREAR un animal (POST)
// ==================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = animalCreateSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: "Datos de entrada inválidos", detalles: validation.error.issues },
        { status: 400 }
      );
    }

    // Al usar validation.data, pasamos datos limpios y tipados
    const nuevoAnimal = await prisma.animal.create({
      data: validation.data,
    });

    return NextResponse.json(nuevoAnimal, { status: 201 });

  } catch (error) {
    console.error('Error al crear animal:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al crear el animal.' },
      { status: 500 }
    );
  }
}