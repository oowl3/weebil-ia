import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

// --- ESQUEMA PARA GET (Query Params) ---
const querySchema = z.object({
  id: z.coerce.number().int().positive().optional(),
});

// ==================================================================
//   API Handler para OBTENER FAQs
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

    const { id } = validation.data;

    const whereClause: any = {};

    if (id) {
      whereClause.id = id; // Filtrar FAQ específico
    }

    const faqs = await prisma.faq.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
    });

    return NextResponse.json(faqs);

  } catch (error) {
    console.error('Error al obtener FAQs:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
