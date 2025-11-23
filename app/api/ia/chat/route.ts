import { NextRequest, NextResponse } from 'next/server'
import { guardarConversacionIA } from '@/lib/iaStorage'
import { prisma } from '@/lib/prisma' // Asegúrate de tener este archivo

export async function POST(request: NextRequest) {
  console.log('🎯 ENDPOINT LLAMADO - HEADERS:', Object.fromEntries(request.headers))
  
  try {
    let body;
    try {
      body = await request.json()
      console.log('📦 Body JSON:', body)
    } catch (jsonError) {
      console.log('❌ Error parseando JSON:', jsonError)
      const text = await request.text()
      console.log('📦 Body como texto:', text)
      body = {}
    }

    // Respuesta de prueba mínima
    const respuestaIA = "Esta es una respuesta de prueba"
    
    console.log('🔍 Llamando a guardarConversacionIA...')
    
    // Obtener un usuario real o usar null
    let usuarioIdParaGuardar = body.usuarioId
    if (usuarioIdParaGuardar) {
      const usuarioExiste = await prisma.user.findUnique({
        where: { id: usuarioIdParaGuardar }
      })
      if (!usuarioExiste) {
        console.log('⚠️ Usuario no existe, usando null')
        usuarioIdParaGuardar = undefined
      }
    }
    
    const guardarResult = await guardarConversacionIA({
      mensajeUsuario: body.mensaje || 'Mensaje por defecto',
      respuestaIA: respuestaIA,
      usuarioId: usuarioIdParaGuardar,
      guestId: body.guestId,
      modeloIA: 'gpt-4',
      tipoConsulta: 'prueba_endpoint'
    })
    
    console.log('🔍 Resultado de guardar:', guardarResult)
    
    return NextResponse.json({ 
      success: true, 
      respuesta: respuestaIA,
      guardadoEnBD: !!guardarResult,
      idConversacion: guardarResult?.id
    })
    
  } catch (error) {
    console.error('💥 ERROR en endpoint:', error)
    return NextResponse.json({ 
      error: error.message,
      success: false 
    }, { status: 500 })
  }
}