import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el seed de la base de datos...');

  // 1. LIMPIEZA (Orden inverso para respetar Foreign Keys)
  // Borramos datos previos para evitar duplicados o errores de constraint
  await prisma.animalDesbloqueado.deleteMany();
  await prisma.analisis.deleteMany();
  await prisma.hospitalAntidoto.deleteMany();
  await prisma.animalAntidoto.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.antidoto.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Base de datos limpiada.');

  // 2. CREACIÓN DE ANTÍDOTOS
  const sueroPolivalente = await prisma.antidoto.create({
    data: {
      nombre: 'Suero Anti-arácnido Polivalente',
      descripcion: 'Neutraliza veneno de Latrodectus (Viuda negra) y Loxosceles (Violinista).',
    },
  });

  const analgesicoFuerte = await prisma.antidoto.create({
    data: {
      nombre: 'Analgésico Sistémico',
      descripcion: 'Tratamiento sintomático para picaduras no letales pero dolorosas.',
    },
  });

  console.log('💉 Antídotos creados.');

  // 3. CREACIÓN DE ANIMALES
  const viudaNegra = await prisma.animal.create({
    data: {
      nombreComun: 'Viuda Negra',
      nombreCientifico: 'Latrodectus mactans',
      esVenenoso: true,
      descripcion: 'Araña negra brillante con una marca roja en forma de reloj de arena en el abdomen.',
      habitat: 'Lugares oscuros y secos, garajes, sótanos.',
      primerosAuxilios: 'Lavar la zona, aplicar hielo, acudir a urgencias inmediatamente.',
      rutaImagenCard: '/images/animals/viuda-negra.jpg',
    },
  });

  const violinista = await prisma.animal.create({
    data: {
      nombreComun: 'Araña Violinista',
      nombreCientifico: 'Loxosceles reclusa',
      esVenenoso: true,
      descripcion: 'Marrón con una marca en forma de violín en el cefalotórax. Su picadura causa necrosis.',
      habitat: 'Rincones, detrás de cuadros, ropa guardada.',
      primerosAuxilios: 'Aplicar hielo, no succionar veneno, ir al hospital.',
      rutaImagenCard: '/images/animals/violinista.jpg',
    },
  });

  const saltarina = await prisma.animal.create({
    data: {
      nombreComun: 'Araña Saltarina',
      nombreCientifico: 'Salticidae',
      esVenenoso: false,
      descripcion: 'Pequeña, peluda y con grandes ojos frontales. Es inofensiva y curiosa.',
      habitat: 'Jardines, muros soleados, interior de casas.',
      primerosAuxilios: 'Lavar con agua y jabón. No requiere atención médica urgente.',
      rutaImagenCard: '/images/animals/saltarina.jpg',
    },
  });

  console.log('🕷️ Animales creados.');

  // 4. RELACIONAR ANIMALES CON ANTÍDOTOS (Tabla Intermedia)
  await prisma.animalAntidoto.createMany({
    data: [
      { animalId: viudaNegra.id, antidotoId: sueroPolivalente.id },
      { animalId: violinista.id, antidotoId: sueroPolivalente.id },
      // La saltarina no necesita antídoto específico
    ],
  });

  // 5. CREACIÓN DE HOSPITALES
  const hospitalCentral = await prisma.hospital.create({
    data: {
      nombre: 'Hospital General de la Ciudad',
      direccion: 'Av. Reforma 123, Centro',
      telefono: '555-123-4567',
      latitud: 19.4326, 
      longitud: -99.1332,
      ultimaVerificacion: new Date(),
    },
  });

  const clinicaNorte = await prisma.hospital.create({
    data: {
      nombre: 'Clínica de Especialidades Norte',
      direccion: 'Calle Norte 45, Industrial',
      telefono: '555-987-6543',
      latitud: 19.4826,
      longitud: -99.1032,
      ultimaVerificacion: new Date(),
    },
  });

  console.log('🏥 Hospitales creados.');

  // 6. INVENTARIO DE HOSPITALES (Tabla Intermedia)
  await prisma.hospitalAntidoto.createMany({
    data: [
      { hospitalId: hospitalCentral.id, antidotoId: sueroPolivalente.id, stock: 10 },
      { hospitalId: hospitalCentral.id, antidotoId: analgesicoFuerte.id, stock: 50 },
      { hospitalId: clinicaNorte.id, antidotoId: sueroPolivalente.id, stock: 2 }, // Stock bajo
    ],
  });

  // 7. CREAR USUARIO DE PRUEBA
  const usuarioDemo = await prisma.user.create({
    data: {
      name: 'Estudiante Demo',
      email: 'demo@aracnoscan.com',
      emailVerified: new Date(),
      image: 'https://i.pravatar.cc/150?img=11',
    },
  });

  console.log('👤 Usuario demo creado.');

  // 8. SIMULAR ANIMALES DESBLOQUEADOS POR EL USUARIO
  await prisma.animalDesbloqueado.create({
    data: {
      usuarioId: usuarioDemo.id,
      animalId: saltarina.id, // El usuario ya encontró una saltarina
    },
  });

  // 9. SIMULAR UN ANÁLISIS (HISTORIAL DE ESCANEO)
  await prisma.analisis.create({
    data: {
      usuarioId: usuarioDemo.id,
      rutaImagen: '/uploads/analisis/scan_001.jpg',
      latitudUsuario: 19.4326,
      longitudUsuario: -99.1332,
      
      // Resultado de la IA
      animalDetectadoId: viudaNegra.id,
      esVenenosoDetectado: true,
      confianzaIA: 0.98,
      descripcionIA: 'Alta probabilidad de Latrodectus mactans por patrón abdominal.',
      primerosAuxiliosIA: 'Busque atención médica inmediata. No aplique torniquetes.',
      
      // Recomendaciones del sistema
      antidotoSugeridoId: sueroPolivalente.id,
      hospitalRecomendadoId: hospitalCentral.id,
    },
  });

  console.log('✅ Seed completado exitosamente.');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });