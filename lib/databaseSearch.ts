// lib/databaseSearch.ts
import { prisma } from '@/lib/prisma'

// lib/databaseSearch.ts - Versión mejorada
export async function buscarAnimalesPorNombre(nombre: string) {
  // Primero intentar coincidencia exacta
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
          antidoto: true
        }
      }
    }
  })

  // Si no hay coincidencia exacta, buscar parcial
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
            antidoto: true
          }
        }
      }
    })
  }

  return animales
}

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

export async function buscarHospitalesCercanos(latitud: number, longitud: number, radioKm: number = 50) {
  // Fórmula haversine aproximada para distancia
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