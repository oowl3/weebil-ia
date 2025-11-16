import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcrypt'; // Importamos bcrypt para hashear

// 1. Esquema de validación para el registro
const registerSchema = z.object({
  correo: z.string().email({ message: "El correo no es válido" }),
  contrasena: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  nombre: z.string().optional(),
});

/**
 * API Handler para CREAR un nuevo usuario (Registro)
 * Ruta: /api/usuarios
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 2. Validar los datos de entrada
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Datos de entrada inválidos", detalles: validation.error.errors }, { status: 400 });
    }
    const { correo, contrasena, nombre } = validation.data;

    // 3. Verificar si el usuario ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { correo: correo },
    });

    if (usuarioExistente) {
      // 409 Conflict: El recurso ya existe
      return NextResponse.json({ error: "El correo electrónico ya está en uso" }, { status: 409 });
    }

    // 4. ¡El paso de seguridad! Hashear la contraseña
    // "10" es el "cost factor" o "salt rounds", un valor estándar
    const contrasenaHash = await bcrypt.hash(contrasena, 10);

    // 5. Crear el nuevo usuario en la base de datos
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        correo: correo,
        nombre: nombre,
        contrasenaHash: contrasenaHash, // Guardamos el hash, no la contraseña
      },
      // 6. NUNCA retornar la contraseña, ni siquiera el hash.
      select: {
        id: true,
        correo: true,
        nombre: true,
        creadoEn: true,
      }
    });

    // 201 Created: El recurso se creó exitosamente
    return NextResponse.json(nuevoUsuario, { status: 201 });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}