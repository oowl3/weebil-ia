// app/api/ia/chat/route.ts (VERSIÓN COMPLETA CON AUTO-REGISTRO)
import { NextRequest, NextResponse } from 'next/server'
import { guardarConversacionIA } from '@/lib/iaStorage'
import { construirPromptConDatosBD, extraerNombresAnimales } from '@/lib/iaPromptBuilder'
import { buscarAnimalesPorNombre } from '@/lib/databaseSearch'
import { crearAnimalYDesbloquear, mapearPeligrosidad, inferirCategoria } from '@/lib/animalManager'

const verificarUsoBD = (respuesta: string, animalesEncontrados: any[]) => {
  if (animalesEncontrados.length === 0) {
    console.log('⚠️  No se encontraron animales en BD - Usando IA general')
    return false
  }
  
  const usaInformacionBD = animalesEncontrados.some(animal => 
    respuesta.toLowerCase().includes(animal.nombreComun.toLowerCase())
  )
  
  console.log(usaInformacionBD ? 
    '✅ IA usó información de la BD' : 
    '❌ IA NO usó información de la BD'
  )
  
  return usaInformacionBD
}

// 🔥 NUEVA FUNCIÓN: Auto-registro de animales desde conversaciones de texto
async function manejarAutoRegistroAnimal(mensaje: string, usuarioId?: string) {
  console.log('🔍 Buscando animales para auto-registro en mensaje:', mensaje)
  
  const animalesRegistrados = []
  const posiblesNombres = extraerNombresAnimales(mensaje)
  
  for (const nombre of posiblesNombres) {
    // 1. Verificar si ya existe en BD
    const animalesExistentes = await buscarAnimalesPorNombre(nombre)
    
    if (animalesExistentes.length === 0) {
      console.log(`🆕 Animal "${nombre}" no encontrado en BD, solicitando información a IA...`)
      
      try {
        // 2. Pedir información detallada a la IA para crear el registro
        const infoAnimal = await obtenerInformacionAnimalDeIA(nombre)
        
        if (infoAnimal) {
          // 3. Crear nuevo animal en BD
          const animalRegistrado = await crearAnimalYDesbloquear({
            nombreComun: infoAnimal.nombreComun,
            nombreCientifico: infoAnimal.nombreCientifico,
            descripcion: infoAnimal.descripcion,
            habitat: infoAnimal.habitat,
            primerosAuxilios: infoAnimal.primerosAuxilios,
            peligrosidad: infoAnimal.peligrosidad,
            categoria: infoAnimal.categoria,
            usuarioId: usuarioId
          })
          
          animalesRegistrados.push(animalRegistrado)
          console.log(`✅ Animal auto-registrado: ${animalRegistrado.nombreComun}`)
        }
      } catch (error) {
        console.error(`❌ Error auto-registrando animal "${nombre}":`, error)
      }
    } else {
      // 4. Si ya existe, desbloquear para usuario si aplica
      if (usuarioId) {
        await crearAnimalYDesbloquear({
          ...animalesExistentes[0],
          usuarioId
        })
        console.log(`🔓 Animal existente desbloqueado: ${animalesExistentes[0].nombreComun}`)
      }
      animalesRegistrados.push(animalesExistentes[0])
    }
  }
  
  return animalesRegistrados
}

// 🔥 FUNCIÓN AUXILIAR: Obtener información estructurada de la IA para nuevos animales
async function obtenerInformacionAnimalDeIA(nombreAnimal: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  })

  const prompt = `
    Proporciona información completa y precisa sobre el animal: "${nombreAnimal}"
    
    Responde en formato JSON con la siguiente estructura:
    {
      "nombreComun": "nombre común más aceptado",
      "nombreCientifico": "nombre científico si está disponible",
      "descripcion": "descripción física y características principales (máximo 200 caracteres)",
      "habitat": "dónde suele vivir (máximo 100 caracteres)", 
      "primerosAuxilios": "primeros auxilios básicos en caso de incidente (máximo 250 caracteres)",
      "nivelPeligrosidad": "ALTO, MODERADO o BAJO",
      "tipoAnimal": "araña, alacrán, reptil, insecto, etc."
    }
    
    INSTRUCCIONES:
    - Sé conciso pero informativo
    - Usa información verificada y científica
    - Para nivelPeligrosidad: ALTO=veneno médico significativo, MODERADO=doloroso pero no letal, BAJO=inofensivo
    - Si no tienes información confiable, devuelve null
  `

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()
    
    // Limpiar la respuesta (a veces Gemini agrega markdown)
    const cleanResponse = responseText.replace(/```json\n?|\n?```/g, '').trim()
    const data = JSON.parse(cleanResponse)
    
    if (!data.nombreComun) {
      console.log('❌ IA no pudo proporcionar información válida para:', nombreAnimal)
      return null
    }
    
    return {
      nombreComun: data.nombreComun,
      nombreCientifico: data.nombreCientifico || '',
      descripcion: data.descripcion || `Información sobre ${data.nombreComun}`,
      habitat: data.habitat || 'Hábitat no especificado',
      primerosAuxilios: data.primerosAuxilios || 'Buscar atención médica si hay síntomas graves',
      peligrosidad: mapearPeligrosidad(data.nivelPeligrosidad || 'BAJO'),
      categoria: inferirCategoria(data.tipoAnimal || nombreAnimal)
    }
    
  } catch (error) {
    console.error('❌ Error obteniendo información de IA para animal:', error)
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { mensaje, usuarioId, guestId, ubicacion } = await request.json()

    console.log('💬 Mensaje recibido:', mensaje)
    console.log('👤 Usuario:', usuarioId || 'Invitado')

    // 🔥 NUEVO: 1. Auto-registro de animales mencionados
    const animalesRegistrados = await manejarAutoRegistroAnimal(mensaje, usuarioId)
    
    // 2. Construir prompt con datos de la BD (ahora incluye posibles nuevos animales)
    const promptConContexto = await construirPromptConDatosBD(mensaje, ubicacion)
    
    console.log('🔍 Prompt con contexto BD:', promptConContexto.substring(0, 500) + '...')

    // 3. Llamar a la IA con el prompt enriquecido
    const respuestaIA = await llamarModeloIA(promptConContexto)

    // 4. Verificar uso de BD
    const animalesEnBD = await buscarAnimalesPorNombre(mensaje)
    const usoBD = verificarUsoBD(respuestaIA.texto, animalesEnBD)
    
    console.log('📊 Métricas RAG:', {
      animalesRegistrados: animalesRegistrados.length,
      animalesEnBD: animalesEnBD.length,
      usoInformacionBD: usoBD,
      nombresRegistrados: animalesRegistrados.map(a => a.nombreComun)
    })

    // 5. Guardar en la base de datos
    await guardarConversacionIA({
      mensajeUsuario: mensaje,
      respuestaIA: respuestaIA.texto,
      usuarioId: usuarioId,
      guestId: guestId,
      modeloIA: 'gemini-2.5-flash',
      tipoConsulta: usoBD ? 'chat_con_bd' : 'chat_general',
      animalReferenciadoId: animalesRegistrados[0]?.id || animalesEnBD[0]?.id
    })

    return NextResponse.json({ 
      success: true, 
      respuesta: respuestaIA.texto,
      metadata: {
        usoBaseDatos: usoBD,
        animalesRegistrados: animalesRegistrados.length,
        animalesEncontrados: animalesEnBD.length,
        nuevosAnimales: animalesRegistrados.map(a => ({
          id: a.id,
          nombre: a.nombreComun,
          desbloqueado: !!usuarioId
        }))
      }
    })

  } catch (error) {
    console.error('Error en endpoint IA con BD:', error)
    return NextResponse.json(
      { error: 'Error procesando consulta' },
      { status: 500 }
    )
  }
}

// Función para llamar a Gemini (existente)
async function llamarModeloIA(prompt: string) {
  console.log('📤 Prompt que se envía a la IA:')
  console.log('=' .repeat(50))
  console.log(prompt.substring(0, 500) + '...')
  console.log('=' .repeat(50))

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.1,
      topK: 40,
      topP: 0.8,
    }
  })

  try {
    const result = await model.generateContent(prompt)
    const respuesta = result.response.text()
    
    console.log('📥 Respuesta de la IA:')
    console.log(respuesta.substring(0, 200) + '...')
    
    return {
      texto: respuesta,
      tokens: result.response.usageMetadata?.totalTokenCount
    }
  } catch (error) {
    console.error('❌ Error llamando a Gemini:', error)
    throw error
  }
}