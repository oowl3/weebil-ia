// lib/iaPromptBuilder.ts - VERSIÓN MEJORADA
import { buscarAnimalesPorNombre, buscarAntidotosPorAnimal, buscarHospitalesConAntidoto } from './databaseSearch'

export async function construirPromptConDatosBD(mensajeUsuario: string, ubicacionUsuario?: { latitud: number, longitud: number }) {
  let contextoBD = ''
  let animalesEncontrados = []
  
  const posiblesNombres = extraerNombresAnimales(mensajeUsuario)
  
  for (const nombre of posiblesNombres) {
    const animales = await buscarAnimalesPorNombre(nombre)
    if (animales.length > 0) {
      animalesEncontrados.push(...animales)
    }
  }

  if (animalesEncontrados.length > 0) {
    contextoBD = await construirContextoCompleto(animalesEncontrados, ubicacionUsuario)
  }

  const instrucciones = animalesEncontrados.length > 0 
    ? `INSTRUCCIONES PARA LA IA:
- Responde basándote EXCLUSIVAMENTE en la información de la base de datos proporcionada
- MENCIONA los ANTÍDOTOS disponibles y los HOSPITALES donde se encuentran
- Si hay múltiples hospitales, menciona los 3 más relevantes
- NO inventes información que no esté en la base de datos
- Sé preciso con los primeros auxilios y niveles de peligrosidad`
    : `INSTRUCCIONES PARA LA IA:
- No tengo información específica en mi base de datos para esta consulta
- Responde basándote en tu conocimiento general
- Sé claro que esta información no proviene de la base de datos local`

  return `
${contextoBD}

${instrucciones}

PREGUNTA DEL USUARIO: ${mensajeUsuario}
`
}

// 🔥 NUEVA FUNCIÓN: Construir contexto completo con antídotos y hospitales
async function construirContextoCompleto(animales: any[], ubicacion?: { latitud: number, longitud: number }) {
  let contexto = 'INFORMACIÓN COMPLETA DE LA BASE DE DATOS:\n\n'
  
  for (const animal of animales) {
    contexto += `=== ${animal.nombreComun.toUpperCase()} ===\n`
    contexto += `Nombre científico: ${animal.nombreCientifico || 'No disponible'}\n`
    contexto += `Descripción: ${animal.descripcion || 'No disponible'}\n`
    contexto += `Hábitat: ${animal.habitat || 'No disponible'}\n`
    contexto += `Primeros auxilios: ${animal.primerosAuxilios || 'No disponible'}\n`
    contexto += `Nivel de peligrosidad: ${animal.peligrosidad === 3 ? 'ALTO' : animal.peligrosidad === 2 ? 'MEDIO' : 'BAJO'}\n`
    
    // 🔥 NUEVO: Información de antídotos
    const antidotos = await buscarAntidotosPorAnimal(animal.id)
    if (antidotos.length > 0) {
      contexto += `\n💊 ANTÍDOTOS DISPONIBLES:\n`
      
      for (const relacion of antidotos) {
        const antidoto = relacion.antidoto
        contexto += `• ${antidoto.nombre}: ${antidoto.descripcion || 'Sin descripción'}\n`
        
        // 🔥 NUEVO: Información de hospitales con este antídoto
        const hospitalesConAntidoto = await buscarHospitalesConAntidoto(antidoto.id)
        if (hospitalesConAntidoto.length > 0) {
          contexto += `  🏥 HOSPITALES CON ESTE ANTÍDOTO:\n`
          
          // Mostrar máximo 5 hospitales
          const hospitalesMostrar = hospitalesConAntidoto.slice(0, 5)
          hospitalesMostrar.forEach((ha, index) => {
            const telefono = ha.hospital.telefono || 'No disponible'
            contexto += `    ${index + 1}. ${ha.hospital.nombre} - Tel: ${telefono}\n`
          })
          
          if (hospitalesConAntidoto.length > 5) {
            contexto += `    ... y ${hospitalesConAntidoto.length - 5} hospitales más\n`
          }
        } else {
          contexto += `  🏥 No hay hospitales registrados con este antídoto\n`
        }
        contexto += '\n'
      }
    } else if (animal.peligrosidad >= 2) {
      contexto += `\n💊 No se requiere antídoto específico o no está registrado\n`
    }
    
    contexto += '─'.repeat(50) + '\n'
  }

  return contexto
}

function extraerNombresAnimales(mensaje: string): string[] {
  const nombresComunes = [
    'alacrán', 'escorpión', 'araña', 'cascabel', 'víbora', 'serpiente',
    'lagarto', 'abeja', 'avispa', 'ciempiés', 'coralillo', 'viuda negra', 'violinista'
  ]
  
  const encontrados = nombresComunes.filter(nombre => 
    mensaje.toLowerCase().includes(nombre.toLowerCase())
  )
  
  return encontrados
}