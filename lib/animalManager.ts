// lib/animalManager.ts - VERSIÓN MEJORADA
import { prisma } from '@/lib/prisma'
import { buscarAntidotoPorNombre, crearRelacionAnimalAntidoto } from './databaseSearch'

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

// 🔥 NUEVA FUNCIÓN: Inferir antídoto basado en el tipo de animal
export async function inferirYRegistrarAntidoto(animalData: {
  nombreComun: string
  nombreCientifico?: string
  peligrosidad: number
  categoria: number
}): Promise<number | null> {
  
  // Solo buscar antídoto si el animal es peligroso (nivel 2 o 3)
  if (animalData.peligrosidad < 2) {
    console.log('🐛 Animal no peligroso, no se requiere antídoto específico')
    return null
  }

  const nombreLower = animalData.nombreComun.toLowerCase()
  const cientificoLower = animalData.nombreCientifico?.toLowerCase() || ''

  let antidotoNombre = ''

  // Inferir antídoto basado en el tipo de animal
  if (nombreLower.includes('alacrán') || nombreLower.includes('escorpión') || 
      cientificoLower.includes('centruroides')) {
    antidotoNombre = 'Antiveneno Antialacrán'
  } else if (nombreLower.includes('cascabel') || nombreLower.includes('víbora') || 
             nombreLower.includes('serpiente') || cientificoLower.includes('crotalus')) {
    antidotoNombre = 'Antiveneno Antiviperino'
  } else if (nombreLower.includes('coralillo') || cientificoLower.includes('micrurus')) {
    antidotoNombre = 'Antiveneno Coralillo'
  } else if (nombreLower.includes('viuda negra') || nombreLower.includes('viuda café') || 
             cientificoLower.includes('latrodectus')) {
    antidotoNombre = 'Antiveneno Anti-Latrodectus'
  } else if (nombreLower.includes('violinista') || cientificoLower.includes('loxosceles')) {
    antidotoNombre = 'Antiveneno Anti-Loxosceles'
  } else if (animalData.peligrosidad >= 2) {
    // Para otros animales peligrosos sin antídoto específico
    antidotoNombre = 'Analgésico Sistémico'
  }

  if (!antidotoNombre) {
    console.log('❌ No se pudo inferir antídoto para:', animalData.nombreComun)
    return null
  }

  try {
    // Buscar si el antídoto ya existe
    let antidoto = await buscarAntidotoPorNombre(antidotoNombre)
    
    if (!antidoto) {
      // Crear nuevo antídoto si no existe
      console.log('🆕 Creando nuevo antídoto:', antidotoNombre)
      
      const descripcion = generarDescripcionAntidoto(antidotoNombre)
      
      antidoto = await prisma.antidoto.create({
        data: {
          nombre: antidotoNombre,
          descripcion: descripcion
        }
      })
      
      console.log('✅ Nuevo antídoto creado:', antidoto.id)
    }

    return antidoto.id

  } catch (error) {
    console.error('❌ Error registrando antídoto:', error)
    return null
  }
}

function generarDescripcionAntidoto(nombreAntidoto: string): string {
  const descripciones: { [key: string]: string } = {
    'Antiveneno Antialacrán': 'Faboterápico polivalente para escorpiones del género Centruroides.',
    'Antiveneno Antiviperino': 'Faboterápico polivalente para serpientes del género Crotalus.',
    'Antiveneno Coralillo': 'Suero específico para envenenamiento por Micrurus (coralillo).',
    'Antiveneno Anti-Latrodectus': 'Antídoto para mordeduras de arañas del género Latrodectus (viudas).',
    'Antiveneno Anti-Loxosceles': 'Antídoto utilizado en casos graves por Loxosceles (araña violinista).',
    'Analgésico Sistémico': 'Tratamiento sintomático para dolor local por picadura o mordedura sin antiveneno específico.'
  }

  return descripciones[nombreAntidoto] || 'Antídoto para tratamiento de envenenamiento.'
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

    // 🔥 NUEVO: 3. Inferir y registrar antídoto automáticamente
    if (data.peligrosidad >= 2) { // Solo para animales peligrosos
      try {
        const antidotoId = await inferirYRegistrarAntidoto({
          nombreComun: data.nombreComun,
          nombreCientifico: data.nombreCientifico,
          peligrosidad: data.peligrosidad,
          categoria: data.categoria
        })

        if (antidotoId) {
          await crearRelacionAnimalAntidoto(nuevoAnimal.id, antidotoId)
          console.log('💊 Relación animal-antídoto establecida')
        }
      } catch (error) {
        console.error('❌ Error en auto-registro de antídoto:', error)
        // Continuar sin antídoto, no es crítico
      }
    }

    // 4. Si hay usuario, desbloquear automáticamente
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