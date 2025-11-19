import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client'; 
import prisma from '../../../lib/prisma';
import { z } from 'zod'; 

// --- ESQUEMA PARA GET (Query Params) ---
// Hacemos que los IDs sean opcionales para filtrar
const querySchema = z.object({
  hospitalId: z.coerce.number().int().positive().optional(),
  antidotoId: z.coerce.number().int().positive().optional(),
});

// --- ESQUEMA PARA POST (JSON Body) ---
// Para actualizar el stock, necesitamos los 3 campos
const stockUpdateSchema = z.object({
  hospitalId: z.number().int().positive("ID de hospital inválido"),
  antidotoId: z.number().int().positive("ID de antídoto inválido"),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
});


// ==================================================================
//   API Handler para OBTENER el stock
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

    const { hospitalId, antidotoId } = validation.data;
    const whereClause: Prisma.HospitalAntidotoWhereInput = {};

    if (hospitalId) {
      whereClause.hospitalId = hospitalId; // Filtra por hospital
    }
    if (antidotoId) {
      whereClause.antidotoId = antidotoId; // Filtra por antídoto
    }

    const stock = await prisma.hospitalAntidoto.findMany({
      where: whereClause,
      include: {
        hospital: true, // Trae info del hospital
        antidoto: true, // Trae info del antídoto
      },
    });

    return NextResponse.json(stock);

  } catch (error) {
    console.error('Error al obtener stock:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

// ==================================================================
//   API Handler para ACTUALIZAR el stock (POST)
// ==================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = stockUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Datos de entrada inválidos", detalles: validation.error.issues },
        { status: 400 }
      );
    }
    
    // --- Lógica de Ingeniería (Idempotencia) ---
    // Usamos "upsert" otra vez. Es la mejor forma de manejar el stock.
    // Si el hospital ya tenía ese antídoto, actualiza el stock.
    // Si era la primera vez que lo registraba, crea la relación.
    
    const { hospitalId, antidotoId, stock } = validation.data;

    const stockActualizado = await prisma.hospitalAntidoto.upsert({
      where: {
        // La clave primaria @@id([hospitalId, antidotoId])
        hospitalId_antidotoId: {
          hospitalId: hospitalId,
          antidotoId: antidotoId,
        }
      },
      // Datos a actualizar si ya existe:
      update: {
        stock: stock,
      },
      // Datos a crear si no existe:
      create: {
        hospitalId: hospitalId,
        antidotoId: antidotoId,
        stock: stock,
      }
    });

    return NextResponse.json(stockActualizado, { status: 200 }); // 200 OK (o 201)

  } catch (error) {
    console.error('Error al actualizar stock:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}