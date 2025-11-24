import { NextRequest, NextResponse } from "next/server";
import { 
  GoogleGenerativeAI, 
  SchemaType, 
  HarmCategory, 
  HarmBlockThreshold,
  Schema 
} from "@google/generative-ai";
import { crearAnimalYDesbloquear, mapearPeligrosidad, inferirCategoria } from '@/lib/animalManager';
import { buscarAnimalesPorNombre } from '@/lib/databaseSearch';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY!);

// Schema expandido para mejor detección
const schema: Schema = {
  description: "Análisis de fauna con información completa para registro",
  type: SchemaType.OBJECT,
  properties: {
    identificado: { type: SchemaType.BOOLEAN, description: "Si es un animal identificable", nullable: false },
    nombre_comun: { type: SchemaType.STRING, description: "Nombre común del animal", nullable: false },
    nombre_cientifico: { type: SchemaType.STRING, description: "Nombre científico", nullable: false },
    nivel_peligrosidad: { type: SchemaType.STRING, description: "ALTO, MODERADO o BAJO", nullable: false },
    descripcion_pokedex: { type: SchemaType.STRING, description: "Descripción detallada", nullable: false },
    habitat: { type: SchemaType.STRING, description: "Dónde vive", nullable: false },
    primeros_auxilios: { type: SchemaType.STRING, description: "Qué hacer en caso de incidente", nullable: false },
    nivel_confianza: { type: SchemaType.NUMBER, description: "0 al 1", nullable: false },
    tipo_animal: { type: SchemaType.STRING, description: "araña, alacrán, reptil, insecto, etc.", nullable: false },
  },
  required: ["identificado", "nombre_comun", "nombre_cientifico", "nivel_peligrosidad", "descripcion_pokedex", "habitat", "primeros_auxilios", "nivel_confianza", "tipo_animal"],
};

// 🔥 NUEVA FUNCIÓN: Manejar usuarios de debug
async function obtenerOcrearUsuarioDebug(usuarioId: string) {
  const { prisma } = await import('@/lib/prisma');
  
  // Si el ID empieza con "guest-", es un usuario invitado
  if (usuarioId.startsWith('guest-')) {
    try {
      // Verificar si ya existe
      const usuarioExistente = await prisma.user.findUnique({
        where: { id: usuarioId }
      })

      if (usuarioExistente) {
        return usuarioExistente
      }

      // Crear usuario invitado
      const usuarioGuest = await prisma.user.create({
        data: {
          id: usuarioId,
          name: 'Usuario Invitado',
          email: `${usuarioId}@guest.com`
        }
      })

      console.log('👤 Usuario guest creado:', usuarioGuest.id)
      return usuarioGuest

    } catch (error) {
      console.error('❌ Error creando usuario guest:', error)
      return null
    }
  }
  
  return null
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const usuarioId = formData.get("usuarioId") as string;
    const guestId = formData.get("guestId") as string;

    if (!file) {
      return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 });
    }

    // Validación de tamaño
    if (file.size > 4.5 * 1024 * 1024) {
      return NextResponse.json({ error: "La imagen es demasiado grande" }, { status: 413 });
    }

    console.log('🖼️ Procesando imagen...', {
      fileName: file.name,
      fileSize: file.size,
      usuarioId: usuarioId || 'No proporcionado',
      guestId: guestId || 'No proporcionado'
    });

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.3,
      },
    });

    const prompt = `
      Analiza esta imagen de fauna y proporciona información completa para registro en base de datos.
      
      INSTRUCCIONES ESPECÍFICAS:
      - Identifica el animal con precisión
      - Clasifica peligrosidad: "ALTO" (veneno médico), "MODERADO" (doloroso), "BAJO" (inofensivo)
      - Proporciona nombre común y científico
      - Describe hábitat y comportamiento
      - Incluye primeros auxilios específicos
      - Especifica tipo: "araña", "alacrán", "reptil", "insecto", etc.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: file.type || "image/jpeg",
          data: base64Image,
        },
      },
    ]);

    const responseText = result.response.text();
    const data = JSON.parse(responseText);

    console.log('🔍 Resultado IA:', {
      identificado: data.identificado,
      nombre: data.nombre_comun,
      peligrosidad: data.nivel_peligrosidad,
      confianza: data.nivel_confianza,
      tipo: data.tipo_animal
    });

    // 🔥 NUEVO: AUTO-REGISTRO EN BASE DE DATOS
    let animalRegistrado = null;
    let usuarioValido = usuarioId;
    
    // Manejar usuarios de debug
    if (usuarioId && usuarioId.startsWith('debug-user-')) {
      const usuarioDebug = await obtenerOcrearUsuarioDebug(usuarioId);
      if (!usuarioDebug) {
        console.log('⚠️ No se pudo crear usuario debug, continuando sin desbloqueo');
        usuarioValido = undefined;
      }
    }
    
    if (data.identificado && data.nivel_confianza > 0.7) {
      // 1. Primero verificar si ya existe en BD
      const animalesExistentes = await buscarAnimalesPorNombre(data.nombre_comun);
      
      if (animalesExistentes.length === 0) {
        // 2. No existe → Crear nuevo animal
        console.log('🆕 Animal no encontrado en BD, creando nuevo registro...');
        
        try {
          animalRegistrado = await crearAnimalYDesbloquear({
            nombreComun: data.nombre_comun,
            nombreCientifico: data.nombre_cientifico,
            descripcion: data.descripcion_pokedex,
            habitat: data.habitat,
            primerosAuxilios: data.primeros_auxilios,
            peligrosidad: mapearPeligrosidad(data.nivel_peligrosidad),
            categoria: inferirCategoria(data.tipo_animal || data.nombre_comun),
            usuarioId: usuarioValido
          });

          console.log('✅ Nuevo animal registrado:', animalRegistrado.nombreComun);
        } catch (error) {
          console.error('❌ Error registrando animal:', error);
          // Continuar sin registro pero devolver respuesta de IA
        }
      } else {
        // 3. Ya existe → Desbloquear para usuario si aplica
        animalRegistrado = animalesExistentes[0];
        if (usuarioValido) {
          try {
            await crearAnimalYDesbloquear({
              ...animalRegistrado,
              usuarioId: usuarioValido
            });
            console.log('🔓 Animal existente desbloqueado:', animalRegistrado.nombreComun);
          } catch (error) {
            console.log('⚠️ Animal ya estaba desbloqueado o error en desbloqueo');
          }
        }
        console.log('✅ Animal ya existente en BD:', animalRegistrado.nombreComun);
      }
    }

    // Guardar en historial de conversaciones
    try {
      await guardarConversacionIA({
        mensajeUsuario: `Análisis de imagen: ${file.name}`,
        respuestaIA: `Animal detectado: ${data.nombre_comun}. Peligrosidad: ${data.nivel_peligrosidad}. ${data.descripcion_pokedex}`,
        usuarioId: usuarioValido || undefined,
        guestId: guestId || undefined,
        modeloIA: 'gemini-2.5-flash',
        tipoConsulta: 'analisis_imagen',
        animalReferenciadoId: animalRegistrado?.id
      });
    } catch (error) {
      console.error('❌ Error guardando conversación:', error);
    }

    // Respuesta enriquecida con info de registro
    return NextResponse.json({
      ...data,
      metadata: {
        registradoEnBD: !!animalRegistrado,
        animalId: animalRegistrado?.id,
        desbloqueado: !!usuarioValido
      }
    });

  } catch (error: any) {
    console.error("🔥 Error en análisis IA:", error);
    
    return NextResponse.json(
      { error: "Error interno del modelo IA", details: error.message },
      { status: 500 }
    );
  }
}