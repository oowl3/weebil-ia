// lib/iaPromptBuilder.ts
import { buscarAnimalesPorNombre, buscarAntidotosPorAnimal, buscarHospitalesCercanos } from './databaseSearch'

// lib/iaPromptBuilder.ts - Versión con fallback
export async function construirPromptConDatosBD(mensajeUsuario: string, ubicacionUsuario?: { latitud: number, longitud: number }) {
  let contextoBD = ''
  let animalesEncontrados = []
  
  // Extraer posibles nombres de animales del mensaje
  const posiblesNombres = extraerNombresAnimales(mensajeUsuario)
  
  for (const nombre of posiblesNombres) {
    const animales = await buscarAnimalesPorNombre(nombre)
    if (animales.length > 0) {
      animalesEncontrados.push(...animales)
    }
  }

  if (animalesEncontrados.length > 0) {
    contextoBD = construirContextoAnimales(animalesEncontrados, ubicacionUsuario)
  }

  const instrucciones = animalesEncontrados.length > 0 
    ? `INSTRUCCIONES PARA LA IA:
- Responde basándote EXCLUSIVAMENTE en la información de la base de datos proporcionada
- NO inventes información que no esté en la base de datos
- Si el usuario pregunta algo que no está en la información proporcionada, di "No tengo esa información en mi base de datos"
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

function extraerNombresAnimales(mensaje: string): string[] {
  const nombresComunes = [
    'alacrán', 'escorpión', 'araña', 'cascabel', 'víbora', 'serpiente',
    'lagarto', 'abeja', 'avispa', 'ciempiés', 'coralillo'
  ]
  
  const encontrados = nombresComunes.filter(nombre => 
    mensaje.toLowerCase().includes(nombre.toLowerCase())
  )
  
  return encontrados
}

function construirContextoAnimales(animales: any[], ubicacion?: { latitud: number, longitud: number }) {
  let contexto = 'INFORMACIÓN DE LA BASE DE DATOS (ÚSALA PARA RESPONDER):\n\n'
  
  for (const animal of animales) {
    contexto += `=== ${animal.nombreComun.toUpperCase()} ===\n`
    contexto += `Nombre científico: ${animal.nombreCientifico || 'No disponible'}\n`
    contexto += `Descripción: ${animal.descripcion || 'No disponible'}\n`
    contexto += `Hábitat: ${animal.habitat || 'No disponible'}\n`
    contexto += `Primeros auxilios: ${animal.primerosAuxilios || 'No disponible'}\n`
    contexto += `Nivel de peligrosidad: ${animal.peligrosidad === 3 ? 'ALTO' : animal.peligrosidad === 2 ? 'MEDIO' : 'BAJO'}\n`
    
    if (animal.animalAntidoto && animal.animalAntidoto.length > 0) {
      contexto += `Antídotos: ${animal.animalAntidoto.map((aa: any) => aa.antidoto.nombre).join(', ')}\n`
    }
    
    contexto += '\n'
  }

  return contexto
}