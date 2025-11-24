import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'; 
import prisma from '../../../lib/prisma'; // Ajusta la ruta si es necesario
import { z } from 'zod'; 

// ==================================================================
//  ESQUEMAS DE VALIDACIÓN (ZOD)
// ==================================================================

// 1. Schema para Query Params (GET)
const querySchema = z.object({
  // coerce.number() transforma el string "2" de la URL a el número 2
  peligrosidad: z.coerce.number().min(1).max(3).optional(),
  
  // Mantenemos la búsqueda por nombre
  nombreComun: z.string().optional(),
});

// 2. Schema para Crear Animal (POST)
const animalCreateSchema = z.object({
  nombreComun: z.string().min(1, "El nombre común es requerido"),
  nombreCientifico: z.string().optional(),
  descripcion: z.string().optional(),
  habitat: z.string().optional(),
  primerosAuxilios: z.string().optional(),
  rutaImagen: z.string().optional(), // Nota: En tu schema dice 'rutaImagen', en tu Zod anterior decia 'rutaImagenCard'. Lo corregí al schema.
  
  // Nuevos campos numéricos según tu Schema
  peligrosidad: z.number().int().min(1).max(3).default(1), // 1=Verde, 2=Amarillo, 3=Rojo
  categoria: z.number().int().default(1), // 1=Araña, etc.
});

// ==================================================================
//   API Handler para OBTENER animales (GET)
// ==================================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validar parámetros
    const validation = querySchema.safeParse(queryParams);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Parámetros inválidos", detalles: validation.error.issues }, 
        { status: 400 }
      );
    }

    const { peligrosidad, nombreComun } = validation.data;

    // Construcción dinámica del filtro
    const whereClause: Prisma.AnimalWhereInput = {};

    // Filtro por Nivel de Peligrosidad (Exacto)
    // Ejemplo: ?peligrosidad=3 trae solo los de nivel rojo
    if (peligrosidad !== undefined) {
      whereClause.peligrosidad = peligrosidad;
    }

    // Filtro por Nombre (Insensitive)
    if (nombreComun) {
      whereClause.nombreComun = {
        contains: nombreComun,
        mode: 'insensitive', 
      };
    }

    const animales = await prisma.animal.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(animales);

  } catch (error) {
    console.error('Error al obtener animales:', error);
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

    // Prisma infiere los tipos automáticamente gracias a que 'validation.data' 
    // ahora coincide con el Schema real (Ints en lugar de Booleans)
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