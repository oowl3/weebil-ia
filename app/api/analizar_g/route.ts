import { NextRequest, NextResponse } from "next/server";
import { 
  GoogleGenerativeAI, 
  SchemaType, 
  HarmCategory, 
  HarmBlockThreshold,
  Schema
} from "@google/generative-ai";
import { guardarConversacionIA } from '@/lib/iaStorage';
import { prisma } from '@/lib/prisma';

// Carga las llaves
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY!);

const schema: Schema = {
  description: "Análisis de fauna",
  type: SchemaType.OBJECT,
  properties: {
    identificado: { type: SchemaType.BOOLEAN, description: "Si es un animal identificable", nullable: false },
    nombre_comun: { type: SchemaType.STRING, description: "Nombre común del animal", nullable: false },
    nombre_cientifico: { type: SchemaType.STRING, description: "Nombre científico", nullable: false },
    es_venenoso: { type: SchemaType.BOOLEAN, description: "Si representa peligro médico", nullable: false },
    descripcion_pokedex: { type: SchemaType.STRING, description: "Dato curioso corto", nullable: false },
    habitat: { type: SchemaType.STRING, description: "Dónde vive suele vivir", nullable: false },
    primeros_auxilios: { type: SchemaType.STRING, description: "Qué hacer si te pica", nullable: false },
    nivel_confianza: { type: SchemaType.NUMBER, description: "Del 0 al 1", nullable: false },
  },
  required: ["identificado", "nombre_comun", "nombre_cientifico", "es_venenoso", "descripcion_pokedex", "primeros_auxilios", "nivel_confianza"],
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const usuarioId = formData.get("usuarioId") as string; // ← NUEVO: obtener usuarioId
    const guestId = formData.get("guestId") as string;     // ← NUEVO: obtener guestId

    if (!file) {
      return NextResponse.json({ error: "No imagen recibida" }, { status: 400 });
    }

    console.log('🖼️ Procesando imagen para análisis...', {
      fileName: file.name,
      fileSize: file.size,
      usuarioId,
      guestId
    });

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const prompt = "Analiza esta imagen. Identifica qué tipo de escorpión o araña es, qué tan peligroso es y dame datos curiosos. Responde estrictamente usando el esquema JSON provisto.";

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

    // 🔥 NUEVO: Guardar la conversación en la base de datos
    console.log('💾 Guardando análisis de imagen en BD...');
    
    // Crear mensaje descriptivo para el usuario
    const mensajeUsuario = `Análisis de imagen: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
    
    // Crear respuesta resumida de la IA
    const respuestaIA = `Animal identificado: ${data.nombre_comun} (${data.nombre_cientifico}). ${data.es_venenoso ? 'ES VENENOSO' : 'No es venenoso'}. ${data.descripcion_pokedex}. Confianza: ${(data.nivel_confianza * 100).toFixed(1)}%`;

    // Buscar el animal en la base de datos para obtener su ID
    let animalReferenciadoId: number | undefined;
    if (data.identificado && data.nombre_comun) {
      const animal = await prisma.animal.findFirst({
        where: {
          nombreComun: {
            contains: data.nombre_comun,
            mode: 'insensitive'
          }
        }
      });
      animalReferenciadoId = animal?.id;
    }

    // Guardar en la base de datos
    await guardarConversacionIA({
      mensajeUsuario: mensajeUsuario,
      respuestaIA: respuestaIA,
      usuarioId: usuarioId || undefined,
      guestId: guestId || undefined,
      modeloIA: 'gemini-2.5-flash',
      tokensUtilizados: result.response.usageMetadata?.totalTokenCount,
      tipoConsulta: 'analisis_imagen',
      animalReferenciadoId: animalReferenciadoId
    });

    console.log('✅ Análisis de imagen guardado en BD exitosamente');

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Error en el servidor:", error.message);
    
    // Guardar también el error en la base de datos
    try {
      const formData = await req.formData();
      const file = formData.get("image") as File;
      const usuarioId = formData.get("usuarioId") as string;
      const guestId = formData.get("guestId") as string;

      await guardarConversacionIA({
        mensajeUsuario: `Análisis de imagen fallido: ${file?.name || 'imagen desconocida'}`,
        respuestaIA: `Error en el análisis: ${error.message}`,
        usuarioId: usuarioId || undefined,
        guestId: guestId || undefined,
        modeloIA: 'gemini-2.5-flash',
        tipoConsulta: 'error_analisis'
      });
    } catch (guardadoError) {
      console.error('Error guardando el error:', guardadoError);
    }

    return NextResponse.json(
      { error: "Falló el análisis", details: error.message },
      { status: 500 }
    );
  }
}