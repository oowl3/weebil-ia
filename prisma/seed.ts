import { PrismaClient } from '@prisma/client';

// Inicializa el cliente de Prisma
const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando el proceso de "seed"...`);

  // --- 1. LIMPIAR DATOS (opcional, pero recomendado para pruebas) ---
  // Borramos en orden inverso para evitar conflictos de llaves foráneas
  console.log('Limpiando base de datos...');
  await prisma.animalDesbloqueado.deleteMany();
  await prisma.analisis.deleteMany();
  await prisma.hospitalAntidoto.deleteMany();
  await prisma.animalAntidoto.deleteMany();

  await prisma.usuario.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.antidoto.deleteMany();
  await prisma.hospital.deleteMany();

  // --- 2. CREAR ANTÍDOTOS ---
  console.log('Creando antídotos...');
  const sueroAntialacran = await prisma.antidoto.create({
    data: {
      nombre: "Suero Antialacrán (Faboterapéutico)",
      descripcion: "Polvo liofilizado para reconstituir, neutraliza veneno de alacrán Centruroides."
    },
  });

  const sueroAntivibora = await prisma.antidoto.create({
    data: {
      nombre: "Suero Antiofídico (Polivalente)",
      descripcion: "Neutraliza veneno de serpientes de cascabel (Crotalus) y Nauyaca (Bothrops)."
    },
  });

  // --- 3. CREAR ANIMALES (Catálogo "Pokedex") ---
  console.log('Creando animales...');
  const alacran = await prisma.animal.create({
    data: {
      // numeroCatalogo es autoincremental, no es necesario ponerlo
      nombreComun: "Alacrán de Durango",
      nombreCientifico: "Centruroides suffusus",
      esVenenoso: true,
      descripcion: "Alacrán de color amarillo-marrón, altamente venenoso, común en la región de Durango.",
      habitat: "Debajo de piedras, madera, en grietas y dentro de las casas.",
      primerosAuxilios: "1. Mantener la calma. 2. Limpiar la herida. 3. No aplicar torniquetes ni succionar. 4. Acudir al hospital de inmediato.",
      rutaImagenCard: "/images/pokedex/alacran_durango.png" // Ruta de ejemplo
    },
  });

  const violinista = await prisma.animal.create({
    data: {
      nombreComun: "Araña Violinista",
      nombreCientifico: "Loxosceles laeta",
      esVenenoso: true,
      descripcion: "Araña de color pardo con una marca en forma de violín en el cefalotórax. Su mordadura causa necrosis.",
      habitat: "Lugares oscuros y tranquilos: armarios, bodegas, detrás de cuadros, rincones.",
      primerosAuxilios: "1. Lavar con agua y jabón. 2. Aplicar hielo local. 3. No automedicarse. 4. Acudir al hospital.",
      rutaImagenCard: "/images/pokedex/arana_violinista.png" // Ruta de ejemplo
    },
  });

  // --- 4. RELACIONAR ANIMALES Y ANTÍDOTOS (N-M) ---
  console.log('Relacionando animales y antídotos...');
  await prisma.animalAntidoto.create({
    data: {
      animalId: alacran.id,
      antidotoId: sueroAntialacran.id,
    },
  });
  // (Aquí podrías ligar la violinista a un antídoto si lo tuvieras)

  // --- 5. CREAR HOSPITALES ---
  console.log('Creando hospitales...');
  const hospitalGeneral = await prisma.hospital.create({
    data: {
      nombre: "Hospital General 450",
      direccion: "Blvd. José María Patoni 100, 34217 Durango, Dgo.",
      telefono: "6181234567",
      latitud: 24.0478,
      longitud: -104.6062,
    },
  });

  // --- 6. ASIGNAR STOCK DE ANTÍDOTOS A HOSPITALES (N-M con stock) ---
  console.log('Asignando stock a hospitales...');
  await prisma.hospitalAntidoto.create({
    data: {
      hospitalId: hospitalGeneral.id,
      antidotoId: sueroAntialacran.id,
      stock: 50, // Stock de ejemplo
    },
  });

  await prisma.hospitalAntidoto.create({
    data: {
      hospitalId: hospitalGeneral.id,
      antidotoId: sueroAntivibora.id,
      stock: 20,
    },
  });

  // --- 7. CREAR UN USUARIO DE PRUEBA ---
  console.log('Creando usuario de prueba...');
  const usuarioPrueba = await prisma.usuario.create({
    data: {
      correo: "ojosue199@gmail.com",
      nombre: "Josue",
      // ¡IMPORTANTE! En una app real, NUNCA guardes la contraseña así.
      // Deberías usar bcrypt para hashearla. Esto es solo para el seed.
      contrasenaHash: "12345",
    },
  });

  // --- 8. DESBLOQUEAR UN ANIMAL PARA EL USUARIO (Pokedex) ---
  console.log('Actualizando Pokedex del usuario...');
  await prisma.animalDesbloqueado.create({
    data: {
      usuarioId: usuarioPrueba.id,
      animalId: alacran.id,
    },
  });

  // --- 9. CREAR UN ANÁLISIS DE PRUEBA (Escaneo) ---
  console.log('Creando un análisis de prueba...');
  await prisma.analisis.create({
    data: {
      // ID del usuario que hizo el análisis
      usuarioId: usuarioPrueba.id,
      
      // Ruta de la imagen que (simuladamente) subió
      rutaImagen: "/images/uploads/simulacion/alacran1.jpg", 
      
      // Dónde estaba el usuario (simulado)
      latitudUsuario: 24.0277, // Coordenadas de Durango
      longitudUsuario: -104.6533,
      
      // --- Resultados de la IA (simulados) ---
      animalDetectadoId: alacran.id,
      esVenenosoDetectado: true,
      confianzaIA: 0.95, // 95% de confianza
      descripcionIA: "Coincidencia alta con Centruroides suffusus.",
      primerosAuxiliosIA: "Acudir al hospital más cercano para valoración y posible aplicación de suero antialacrán.",
      
      // --- Recomendaciones (simuladas) ---
      antidotoSugeridoId: sueroAntialacran.id,
      hospitalRecomendadoId: hospitalGeneral.id,
    }
  });


  console.log(`¡"Seed" completado exitosamente!`);
}

// Ejecuta la función main y maneja errores
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Cierra la conexión a la base de datos al finalizar
    await prisma.$disconnect();
  });