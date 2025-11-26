import { NextRequest, NextResponse } from "next/server";
import { 
  GoogleGenerativeAI, 
  SchemaType, 
  HarmCategory, 
  HarmBlockThreshold,
  Schema 
} from "@google/generative-ai";

// Configuración Inicial
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY!);

// 🛡️ SECURITY LAYER: Lista blanca de tipos MIME permitidos
const ALLOWED_MIME_TYPES = [
  "image/jpeg", 
  "image/png", 
  "image/webp", 
  "image/heic", 
  "image/heif"
];

const schema: Schema = {
  description: "Análisis de fauna y evaluación de riesgos matizada",
  type: SchemaType.OBJECT,
  properties: {
    identificado: { type: SchemaType.BOOLEAN, description: "Si es un animal", nullable: false },
    nombre_comun: { type: SchemaType.STRING, description: "Nombre común", nullable: false },
    nombre_cientifico: { type: SchemaType.STRING, description: "Nombre científico", nullable: false },
    nivel_peligrosidad: { type: SchemaType.STRING, description: "Nivel de riesgo: 'BAJO', 'MODERADO', 'ALTO'", nullable: false },
    descripcion_pokedex: { type: SchemaType.STRING, description: "Dato curioso", nullable: false },
    habitat: { type: SchemaType.STRING, description: "Dónde vive", nullable: false },
    primeros_auxilios: { type: SchemaType.STRING, description: "Qué hacer", nullable: false },
    nivel_confianza: { type: SchemaType.NUMBER, description: "0 al 1", nullable: false },
  },
  required: ["identificado", "nombre_comun", "nombre_cientifico", "nivel_peligrosidad", "descripcion_pokedex", "habitat", "primeros_auxilios", "nivel_confianza"],
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    // 1. Validación de Existencia
    if (!file) {
      return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 });
    }

    // 2. 🛡️ VALIDACIÓN DE TIPO (MIME TYPE CHECK)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json({ 
            error: "Formato de archivo no soportado.", 
            details: `Recibido: ${file.type}. Permitidos: JPG, PNG, WEBP, HEIC.` 
        }, { status: 415 }); // 415: Unsupported Media Type
    }

    // 3. Validación de Tamaño (Fail Fast)
    if (file.size > 4.5 * 1024 * 1024) {
        return NextResponse.json({ error: "La imagen excede el límite de 4.5MB." }, { status: 413 });
    }

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
        temperature: 0.4,
      },
    });

    const prompt = `
      Actúa como un biólogo experto. Analiza la imagen.
      1. Identifica el animal.
      2. Clasifica el 'nivel_peligrosidad' (BAJO, MODERADO, ALTO).
      3. Si es abeja/avispa -> MODERADO.
      4. Genera consejos de primeros auxilios.
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: file.type, 
          data: base64Image,
        },
      },
    ]);

    const responseText = result.response.text();
    const data = JSON.parse(responseText);
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Error en análisis IA:", error);
    
    const status = error.message?.includes("413") ? 413 : 500;
    const msg = error.message?.includes("413") ? "Imagen demasiado pesada" : "Error interno del modelo IA";

    return NextResponse.json(
      { error: msg, details: error.message },
      { status }
    );
  }
}