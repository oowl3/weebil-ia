import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'; 
import prisma from '../../../lib/prisma';
import { z } from 'zod'; 

// --- ESQUEMA PARA GET (Query Params) ---
const querySchema = z.object({
  // Para buscar por nombre: ?nombre=suero
  nombre: z.string().optional(),
});

// --- ESQUEMA PARA POST (JSON Body) ---
const antidotoCreateSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().optional(),
});


// ==================================================================
//   API Handler para OBTENER antídotos (GET)
// ==================================================================
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const validation = querySchema.safeParse(queryParams);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Parámetros de query inválidos", detalles: validation.error.issues }, 
        { status: 400 }
      );
    }

    const { nombre } = validation.data;
    const whereClause: Prisma.AntidotoWhereInput = {};

    if (nombre) {
      whereClause.nombre = {
        contains: nombre,
        mode: 'insensitive', 
      };
    }

    const antidotos = await prisma.antidoto.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(antidotos);

  } catch (error) {
    console.error('Error al obtener antídotos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener el catálogo.' },
      { status: 500 }
    );
  }
}

// ==================================================================
//   API Handler para CREAR un antídoto (POST)
// ==================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = antidotoCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Datos de entrada inválidos", detalles: validation.error.issues },
        { status: 400 }
      );
    }

    // --- Verificación de Duplicados (Buena Práctica de Ingeniería) ---
    // Tu schema dice que 'nombre' es @unique. Si no checamos esto,
    // la base de datos dará un error 500. Es mejor dar un error 409.
    const existente = await prisma.antidoto.findUnique({
      where: { nombre: validation.data.nombre }
    });
    if (existente) {
      return NextResponse.json(
        { error: "Ya existe un antídoto con este nombre" },
        { status: 409 } // 409 Conflict
      );
    }
    // --- Fin de la Verificación ---

    const nuevoAntidoto = await prisma.antidoto.create({
      data: validation.data,
    });

    return NextResponse.json(nuevoAntidoto, { status: 201 });

  } catch (error) {
    console.error('Error al crear antídoto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al crear el antídoto.' },
      { status: 500 }
    );
  }
}