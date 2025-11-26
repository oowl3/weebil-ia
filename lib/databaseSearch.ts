// lib/databaseSearch.ts - VERSIÓN MEJORADA
import { prisma } from '@/lib/prisma'

export async function buscarAnimalesPorNombre(nombre: string) {
  let animales = await prisma.animal.findMany({
    where: {
      OR: [
        { nombreComun: { equals: nombre, mode: 'insensitive' } },
        { nombreCientifico: { equals: nombre, mode: 'insensitive' } }
      ]
    },
    include: {
      animalAntidoto: {
        include: {
          antidoto: {
            include: {
              hospitalAntidoto: {
                include: {
                  hospital: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (animales.length === 0) {
    animales = await prisma.animal.findMany({
      where: {
        OR: [
          { nombreComun: { contains: nombre, mode: 'insensitive' } },
          { nombreCientifico: { contains: nombre, mode: 'insensitive' } }
        ]
      },
      include: {
        animalAntidoto: {
          include: {
            antidoto: {
              include: {
                hospitalAntidoto: {
                  include: {
                    hospital: true
                  }
                }
              }
            }
          }
        }
      }
    })
  }

  return animales
}

// 🔥 NUEVA FUNCIÓN: Buscar antídotos por animal
export async function buscarAntidotosPorAnimal(animalId: number) {
  return await prisma.animalAntidoto.findMany({
    where: { animalId },
    include: {
      antidoto: {
        include: {
          hospitalAntidoto: {
            include: {
              hospital: true
            }
          }
        }
      }
    }
  })
}

// 🔥 NUEVA FUNCIÓN: Buscar hospitales con un antídoto específico
export async function buscarHospitalesConAntidoto(antidotoId: number) {
  return await prisma.hospitalAntidoto.findMany({
    where: { antidotoId },
    include: {
      hospital: true,
      antidoto: true
    },
    orderBy: {
      stock: 'desc' // Ordenar por stock disponible
    }
  })
}

// 🔥 NUEVA FUNCIÓN: Buscar antídoto por nombre
export async function buscarAntidotoPorNombre(nombre: string) {
  return await prisma.antidoto.findFirst({
    where: {
      nombre: { contains: nombre, mode: 'insensitive' }
    }
  })
}

// 🔥 NUEVA FUNCIÓN: Crear relación animal-antídoto
export async function crearRelacionAnimalAntidoto(animalId: number, antidotoId: number) {
  try {
    await prisma.animalAntidoto.create({
      data: {
        animalId,
        antidotoId
      }
    })
    console.log('✅ Relación animal-antídoto creada:', { animalId, antidotoId })
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️ Relación animal-antídoto ya existe')
    } else {
      throw error
    }
  }
}

export async function buscarHospitalesCercanos(latitud: number, longitud: number, radioKm: number = 50) {
  return await prisma.$queryRaw`
    SELECT 
      id, nombre, direccion, telefono, latitud, longitud,
      (6371 * acos(cos(radians(${latitud})) * cos(radians(latitud)) * 
      cos(radians(longitud) - radians(${longitud})) + 
      sin(radians(${latitud})) * sin(radians(latitud)))) AS distancia_km
    FROM hospitales 
    WHERE (6371 * acos(cos(radians(${latitud})) * cos(radians(latitud)) * 
    cos(radians(longitud) - radians(${longitud})) + 
    sin(radians(${latitud})) * sin(radians(latitud)))) <= ${radioKm}
    ORDER BY distancia_km ASC
    LIMIT 10
  `
}