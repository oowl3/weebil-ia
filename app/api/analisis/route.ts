import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

// 1. Esquema de validación con Zod
const bodySchema = z.object({
  rutaImagen: z.string(),             // obligatorio
  latitudUsuario: z.number().optional(),
  longitudUsuario: z.number().optional(),

  // CORRECCIÓN AQUÍ: El ID de usuario en Prisma es String (CUID)
  usuarioId: z.string(),              // obligatorio

  animalDetectadoId: z.number().optional(),
  esVenenosoDetectado: z.boolean().optional(),
  descripcionIA: z.string().optional(),
  primerosAuxiliosIA: z.string().optional(),
  confianzaIA: z.number().optional(),

  antidotoSugeridoId: z.number().optional(),
  hospitalRecomendadoId: z.number().optional(),
});

// 2. Método POST: crear análisis
export async function POST(request: Request) {
  try {
    // Leer body del request
    const json = await request.json();

    // Validarlo con Zod
    const validation = bodySchema.safeParse(json);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Datos inválidos', detalles: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;

    // 3. Crear análisis en BD
    const nuevoAnalisis = await prisma.analisis.create({
      data: {
        rutaImagen: data.rutaImagen,
        latitudUsuario: data.latitudUsuario,
        longitudUsuario: data.longitudUsuario,
        usuarioId: data.usuarioId, // Ahora sí es un String compatible

        animalDetectadoId: data.animalDetectadoId,
        esVenenosoDetectado: data.esVenenosoDetectado,
        descripcionIA: data.descripcionIA,
        primerosAuxiliosIA: data.primerosAuxiliosIA,
        confianzaIA: data.confianzaIA,

        antidotoSugeridoId: data.antidotoSugeridoId,
        hospitalRecomendadoId: data.hospitalRecomendadoId,
      },
    });

    // 4. Responder JSON
    return NextResponse.json(nuevoAnalisis, { status: 201 });

  } catch (error) {
    console.error('Error al crear análisis:', error);
    return NextResponse.json(
      { error: 'Error interno al crear análisis.' },
      { status: 500 }
    );
  }
}