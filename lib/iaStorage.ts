import { prisma } from '@/lib/prisma'

interface GuardarConversacionParams {
  mensajeUsuario: string
  respuestaIA: string
  usuarioId?: string
  guestId?: string
  modeloIA?: string
  tokensUtilizados?: number
  tipoConsulta?: string
  animalReferenciadoId?: number
}

export async function guardarConversacionIA(params: GuardarConversacionParams) {
  console.log('🔍 [1] guardarConversacionIA llamado con:', {
    mensajeUsuario: params.mensajeUsuario.substring(0, 50),
    usuarioId: params.usuarioId,
    guestId: params.guestId,
    tipoConsulta: params.tipoConsulta
  })

  try {
    console.log('🔍 [2] Intentando crear registro en BD...')
    
    // Si hay usuarioId, verificar que existe primero
    if (params.usuarioId) {
      const usuarioExiste = await prisma.user.findUnique({
        where: { id: params.usuarioId }
      })
      
      if (!usuarioExiste) {
        console.log('⚠️ Usuario no existe, guardando sin usuarioId')
        params.usuarioId = undefined
      }
    }
    
    const conversacion = await prisma.conversacionIA.create({
      data: {
        mensajeUsuario: params.mensajeUsuario,
        respuestaIA: params.respuestaIA,
        usuarioId: params.usuarioId, // Puede ser undefined
        guestId: params.guestId,
        modeloIA: params.modeloIA,
        tokensUtilizados: params.tokensUtilizados,
        tipoConsulta: params.tipoConsulta,
        animalReferenciadoId: params.animalReferenciadoId
      }
    })

    console.log('✅ [3] Conversación GUARDADA exitosamente:', {
      id: conversacion.id,
      creadoEn: conversacion.creadoEn
    })
    
    return conversacion
    
  } catch (error) {
    console.error('❌ [ERROR] Error guardando conversación:', error)
    
    // Si es error de clave foránea, intentar sin usuarioId
    if (error.code === 'P2003') {
      console.log('🔄 Reintentando sin usuarioId...')
      try {
        const conversacion = await prisma.conversacionIA.create({
          data: {
            mensajeUsuario: params.mensajeUsuario,
            respuestaIA: params.respuestaIA,
            usuarioId: undefined, // Forzar a null
            guestId: params.guestId,
            modeloIA: params.modeloIA,
            tokensUtilizados: params.tokensUtilizados,
            tipoConsulta: params.tipoConsulta,
            animalReferenciadoId: params.animalReferenciadoId
          }
        })
        console.log('✅ Conversación guardada sin usuarioId')
        return conversacion
      } catch (retryError) {
        console.error('❌ Error en reintento:', retryError)
      }
    }
    
    return null
  }
}