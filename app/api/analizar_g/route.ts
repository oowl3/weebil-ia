import { NextRequest, NextResponse } from "next/server";
import { 
  GoogleGenerativeAI, 
  SchemaType, 
  HarmCategory, 
  HarmBlockThreshold,
  Schema 
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY!);

// OPTIMIZACIÓN: Schema más permisivo para casos negativos
const schema: Schema = {
  description: "Análisis de fauna y evaluación de riesgos matizada",
  type: SchemaType.OBJECT,
  properties: {
    identificado: { type: SchemaType.BOOLEAN, description: "Si es un animal", nullable: false },
    nombre_comun: { type: SchemaType.STRING, description: "Nombre común", nullable: false },
    nombre_cientifico: { type: SchemaType.STRING, description: "Nombre científico", nullable: false },
    nivel_peligrosidad: { type: SchemaType.STRING, description: "Nivel de riesgo: 'BAJO' (inofensivo), 'MODERADO' (doloroso/veneno leve), 'ALTO' (peligro médico/letal)", nullable: false },
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

    if (!file) {
      return NextResponse.json({ error: "No se recibió imagen" }, { status: 400 });
    }

    // Validación de tamaño (Vercel Serverless suele limitar a 4.5MB en el body)
    if (file.size > 4.5 * 1024 * 1024) {
        return NextResponse.json({ error: "La imagen es demasiado grande. Intenta con una de menor resolución." }, { status: 413 });
    }

    const arrayBuffer = await file.arrayBuffer();
    // Optimización: Convertir a Base64 es costoso en memoria, pero necesario aquí.
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    const model = genAI.getGenerativeModel({
      // AJUSTE: Usamos la versión estable más rápida actual
      model: "gemini-2.5-flash", 
      safetySettings: [
        // Crucial para que no bloquee imágenes de arañas "aterradoras" o heridas
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4, // Bajamos temperatura para ser más precisos y menos creativos
      },
    });

    // PROMPT DE INGENIERÍA: Más robusto y defensivo
const prompt = `
      Actúa como un biólogo experto. Analiza la imagen.
      1. Identifica el animal.
      2. Clasifica el 'nivel_peligrosidad' basándote en el impacto a un humano adulto sano:
         - "BAJO": Animales inofensivos, sin veneno o incapaces de herir (ej. grillos, mariposas, ranas comunes).
         - "MODERADO": Animales con veneno leve o mordida dolorosa pero NO letal (ej. ABEJAS, AVISPAS, tarántulas comunes, hormigas rojas). Causan dolor e hinchazón, pero rara vez urgencia médica salvo alergia.
         - "ALTO": Animales con veneno médicamente significativo o fuerza letal (ej. Viuda negra, Violinista, Serpientes de cascabel, Alacranes de corteza). Requieren antídoto u hospital.
      
      3. Si es una abeja o avispa, el nivel debe ser "MODERADO", no "ALTO".
      4. Genera los consejos de primeros auxilios acordes al nivel.
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

    // Extracción segura
    const responseText = result.response.text();
    const data = JSON.parse(responseText);
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("🔥 Error en análisis IA:", error);
    
    // Manejo diferenciado de errores
    const status = error.message?.includes("413") ? 413 : 500;
    const msg = error.message?.includes("413") ? "Imagen demasiado pesada" : "Error interno del modelo IA";

    return NextResponse.json(
      { error: msg, details: error.message },
      { status }
    );
  }
}