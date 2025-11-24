// lib/animalManager.ts
import { prisma } from '@/lib/prisma'

interface NuevoAnimalData {
  nombreComun: string
  nombreCientifico?: string
  descripcion?: string
  habitat?: string
  primerosAuxilios?: string
  peligrosidad: number
  categoria: number
  usuarioId?: string
}

export async function crearAnimalYDesbloquear(data: NuevoAnimalData) {
  try {
    console.log('🆕 Intentando crear nuevo animal:', data.nombreComun)

    // 1. Verificar si el animal ya existe
    const animalExistente = await prisma.animal.findFirst({
      where: {
        OR: [
          { nombreComun: { equals: data.nombreComun, mode: 'insensitive' } },
          { nombreCientifico: { equals: data.nombreCientifico, mode: 'insensitive' } }
        ]
      }
    })

    if (animalExistente) {
      console.log('⚠️ Animal ya existe en la BD:', animalExistente.nombreComun)
      
      // Si hay usuario, desbloquear el animal existente
      if (data.usuarioId) {
        await desbloquearAnimalParaUsuario(animalExistente.id, data.usuarioId)
      }
      
      return animalExistente
    }

    // 2. Crear el nuevo animal
    const nuevoAnimal = await prisma.animal.create({
      data: {
        nombreComun: data.nombreComun,
        nombreCientifico: data.nombreCientifico,
        descripcion: data.descripcion,
        habitat: data.habitat,
        primerosAuxilios: data.primerosAuxilios,
        peligrosidad: data.peligrosidad,
        categoria: data.categoria
      }
    })

    console.log('✅ Nuevo animal creado:', nuevoAnimal.id)

    // 3. Si hay usuario, desbloquear automáticamente
    if (data.usuarioId) {
      await desbloquearAnimalParaUsuario(nuevoAnimal.id, data.usuarioId)
    }

    return nuevoAnimal

  } catch (error) {
    console.error('❌ Error creando animal:', error)
    throw error
  }
}

async function desbloquearAnimalParaUsuario(animalId: number, usuarioId: string) {
  try {
    await prisma.animalDesbloqueado.create({
      data: {
        animalId,
        usuarioId
      }
    })
    console.log('🔓 Animal desbloqueado para usuario:', { animalId, usuarioId })
  } catch (error) {
    // Ignorar error si ya está desbloqueado (violación de clave única)
    if (error.code !== 'P2002') {
      console.error('Error desbloqueando animal:', error)
    }
  }
}

export function mapearPeligrosidad(nivelTexto: string): number {
  const mapa: { [key: string]: number } = {
    'ALTO': 3,
    'MODERADO': 2, 
    'MEDIO': 2,
    'BAJO': 1
  }
  
  return mapa[nivelTexto.toUpperCase()] || 1
}

export function inferirCategoria(nombreComun: string): number {
  const nombreLower = nombreComun.toLowerCase()
  
  if (nombreLower.includes('alacrán') || nombreLower.includes('escorpión')) {
    return 3 // Alacranes
  } else if (nombreLower.includes('cascabel') || nombreLower.includes('víbora') || nombreLower.includes('serpiente') || nombreLower.includes('coralillo')) {
    return 2 // Reptiles
  } else if (nombreLower.includes('araña')) {
    return 1 // Arañas
  } else {
    return 4 // Varios
  }
}