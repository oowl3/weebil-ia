import { NextRequest, NextResponse } from "next/server";
import { 
  GoogleGenerativeAI, 
  SchemaType, 
  HarmCategory, 
  HarmBlockThreshold,
  Schema // <--- 1. IMPORTANTE: Importamos la interfaz
} from "@google/generative-ai";

// Carga las llaves (soporta ambos nombres por si acaso)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY!);

// 2. IMPORTANTE: Asignamos el tipo explícitamente ': Schema'
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

    if (!file) {
      return NextResponse.json({ error: "No imagen recibida" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema, // Ahora TypeScript aceptará esto sin problemas
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
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Error en el servidor:", error.message);
    return NextResponse.json(
      { error: "Falló el análisis", details: error.message },
      { status: 500 }
    );
  }
}