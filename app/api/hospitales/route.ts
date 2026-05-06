import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; 
import { z } from 'zod';
import { Prisma } from '@prisma/client';

// Esquemas Zod

// Esquema para POST (crear hospital)
const hospitalBodySchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  direccion: z.string().min(1, "La dirección es obligatoria"),
  telefono: z.string().optional().nullable(),
  latitud: z.coerce.number(),   // acepta "23.45" o 23.45
  longitud: z.coerce.number(),
  ultimaVerificacion: z.coerce.date().optional().nullable(), // acepta ISO string o Date. Opcional.
});

// Esquema para query params del GET
const querySchema = z.object({
  nombre: z.string().optional(),
  antidotoId: z.coerce.number().optional(), // buscar hospitales que tengan stock del antídoto 
});


/* =========================
   GET /api/hospitales
   - Query params opcionales:
     ?nombre=Centro
     ?antidotoId=5
   ========================= */
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

    const { nombre, antidotoId } = validation.data;

    // Construir where dinámico con tipo Prisma.HospitalWhereInput
    const where: Prisma.HospitalWhereInput = {};

    if (nombre) {
      where.nombre = {
        contains: nombre,
        mode: 'insensitive',
      };
    }

    if (antidotoId !== undefined) {
      // Filtrar hospitales que tengan relación HospitalAntidoto con antidotoId
      where.hospitalAntidoto = {
        some: {
          antidotoId: antidotoId,
          // opcional: podrías agregar stock: { gt: 0 } si quieres solo con stock > 0
        },
      };
    }

    const hospitales = await prisma.hospital.findMany({
      where,
      orderBy: { id: 'asc' },
      include: {
        // incluir antidotos y stock para facilitar uso en frontend
        hospitalAntidoto: {
          include: { antidoto: true },
        },
      },
    });

    return NextResponse.json(hospitales);
  } catch (error) {
    console.error('Error al obtener hospitales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener hospitales.' },
      { status: 500 }
    );
  }
}


/* =========================
   POST /api/hospitales
   - Crea un hospital
   ========================= */
export async function POST(request: Request) {
  try {
    const json = await request.json();

    // Validación
    const validation = hospitalBodySchema.safeParse(json);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', detalles: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;

    const nuevoHospital = await prisma.hospital.create({
      data: {
        nombre: data.nombre,
        direccion: data.direccion,
        telefono: data.telefono ?? null,
        latitud: data.latitud,
        longitud: data.longitud,
        ultimaVerificacion: data.ultimaVerificacion ?? null,
      },
    });

    return NextResponse.json(nuevoHospital, { status: 201 });
  } catch (error) {
    console.error('Error al crear hospital:', error);
    return NextResponse.json(
      { error: 'Error interno al crear hospital.' },
      { status: 500 }
    );
  }
}
