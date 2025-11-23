import { useMutation } from '@tanstack/react-query'

export function useIAChat() {
  return useMutation({
    mutationFn: async ({ mensaje, usuarioId, guestId }: { 
      mensaje: string; 
      usuarioId?: string; 
      guestId?: string 
    }) => {
      const response = await fetch('/api/ia/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mensaje,
          usuarioId,
          guestId
        }),
      })
      
      if (!response.ok) {
        throw new Error('Error en la consulta')
      }
      
      const result = await response.json()
      
      // Verificar si se guardó en BD
      if (result.conversacionGuardada) {
        console.log('✅ Conversación guardada en BD con ID:', result.conversacionGuardada.id)
      }
      
      return result
    },
  })
}