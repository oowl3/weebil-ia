// app/api/ia/chat/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { guardarConversacionIA } from '@/lib/iaStorage'
import { construirPromptConDatosBD } from '@/lib/iaPromptBuilder'

const verificarUsoBD = (respuesta: string, animalesEncontrados: any[]) => {
  if (animalesEncontrados.length === 0) {
    console.log('⚠️  No se encontraron animales en BD - Usando IA general')
    return false
  }
  
  // Verificar si la respuesta menciona los animales de la BD
  const usaInformacionBD = animalesEncontrados.some(animal => 
    respuesta.toLowerCase().includes(animal.nombreComun.toLowerCase())
  )
  
  console.log(usaInformacionBD ? 
    '✅ IA usó información de la BD' : 
    '❌ IA NO usó información de la BD'
  )
  
  return usaInformacionBD
}

export async function POST(request: NextRequest) {
  try {
    const { mensaje, usuarioId, guestId, ubicacion } = await request.json()

    // 1. Construir prompt con datos de la BD
    const promptConContexto = await construirPromptConDatosBD(mensaje, ubicacion)
    
    console.log('🔍 Prompt con contexto BD:', promptConContexto)

    // 2. Llamar a la IA con el prompt enriquecido
    const respuestaIA = await llamarModeloIA(promptConContexto) // Tu función existente

    // 3. Guardar en la base de datos
    await guardarConversacionIA({
      mensajeUsuario: mensaje,
      respuestaIA: respuestaIA.texto,
      usuarioId: usuarioId,
      guestId: guestId,
      modeloIA: 'gemini-2.5-flash',
      tipoConsulta: 'chat_con_contexto_bd'
    })

    return NextResponse.json({ 
      success: true, 
      respuesta: respuestaIA.texto
    })

  } catch (error) {
    console.error('Error en endpoint IA con BD:', error)
    return NextResponse.json(
      { error: 'Error procesando consulta' },
      { status: 500 }
    )
  }
}

// Función de ejemplo para llamar a Gemini
async function llamarModeloIA(prompt: string) {
  console.log('📤 Prompt que se envía a la IA:')
  console.log('=' .repeat(50))
  console.log(prompt)
  console.log('=' .repeat(50))

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.1, // Muy baja para respuestas precisas
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