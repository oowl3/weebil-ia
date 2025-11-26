import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el seed de la base de datos...');

  // 1. LIMPIEZA (Orden inverso para respetar Foreign Keys)
  await prisma.animalDesbloqueado.deleteMany();
  await prisma.hospitalAntidoto.deleteMany();
  await prisma.animalAntidoto.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.antidoto.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.user.deleteMany();

  // ============================================================
  // CREACIÓN DE ANTÍDOTOS ESPECÍFICOS
  // ============================================================

  const antialacran = await prisma.antidoto.create({
    data: {
      nombre: 'Antiveneno Antialacrán',
      descripcion: 'Faboterápico polivalente para escorpiones del género Centruroides.',
    },
  });

  const antiviperino = await prisma.antidoto.create({
    data: {
      nombre: 'Antiveneno Antiviperino',
      descripcion: 'Faboterápico polivalente para serpientes del género Crotalus.',
    },
  });

  const anticoralillo = await prisma.antidoto.create({
    data: {
      nombre: 'Antiveneno Coralillo',
      descripcion: 'Suero específico para envenenamiento por Micrurus (coralillo).',
    },
  });

  const antilatrodectus = await prisma.antidoto.create({
    data: {
      nombre: 'Antiveneno Anti-Latrodectus',
      descripcion: 'Antídoto para mordeduras de arañas del género Latrodectus (viudas).',
    },
  });

  const antiloxosceles = await prisma.antidoto.create({
    data: {
      nombre: 'Antiveneno Anti-Loxosceles',
      descripcion: 'Antídoto utilizado en casos graves por Loxosceles (araña violinista).',
    },
  });

  const analgesico = await prisma.antidoto.create({
    data: {
      nombre: 'Analgésico Sistémico',
      descripcion: 'Tratamiento sintomático para dolor local por picadura o mordedura sin antiveneno específico.',
    },
  });

  // 3. CREACIÓN DE ANIMALES
  // --- Más animales venenosos de Durango ---
  const alacranDurango = await prisma.animal.create({
    data: {
      nombreComun: 'Alacrán de Durango',
      nombreCientifico: 'Centruroides suffusus',
      descripcion: 'Escorpión neurotóxico, muy implicado en envenenamientos en zonas urbanas de Durango.',
      habitat: 'Escombros, bajo piedras, madera en zonas periurbanas.',
      primerosAuxilios: 'Lavar la zona con agua, inmovilizar la extremidad, aplicar hielo, buscar atención médica urgente.',
      rutaImagen: '/images/animals/alacran-suffusus.jpg',
      peligrosidad: 3,
      categoria: 3,
    },
  });

  const alacranPardoOscuro = await prisma.animal.create({
    data: {
      nombreComun: 'Alacrán pardo oscuro',
      nombreCientifico: 'Centruroides noxius',
      descripcion: 'Escorpión con veneno potente y neurotóxico; puede producir síntomas graves.',
      habitat: 'Áreas áridas, grietas rocosas, puede ingresar a viviendas.',
      primerosAuxilios: 'Mantener al paciente calmado, inmovilizar, ir a hospital para suero.',
      rutaImagen: '/images/animals/alacran-noxius.jpg',
      peligrosidad: 3,
      categoria: 3,
    },
  });

  const alacranRayado = await prisma.animal.create({
    data: {
      nombreComun: 'Alacrán rayado',
      nombreCientifico: 'Centruroides vittatus',
      descripcion: 'Escorpión con toxicidad variable según edad y ejemplar.',
      habitat: 'Matorrales, zonas rurales, terrenos rocosos.',
      primerosAuxilios: 'Reposo, hielo, observación y evaluación médica si hay síntomas severos.',
      rutaImagen: '/images/animals/alacran-vittatus.jpg',
      peligrosidad: 2,
      categoria: 3,
    },
  });

  const alacranCorteza = await prisma.animal.create({
    data: {
      nombreComun: 'Alacrán de la corteza',
      nombreCientifico: 'Centruroides infamatus',
      descripcion: 'Escorpión que habita bajo la corteza de árboles o rocas; moderadamente venenoso.',
      habitat: 'Grietas rocosas y cortezas de árboles en zonas rurales.',
      primerosAuxilios: 'Inmovilizar, aplicar frío local, acudir a centro médico en caso de síntomas.',
      rutaImagen: '/images/animals/alacran-infamatus.jpg',
      peligrosidad: 2,
      categoria: 3,
    },
  });

  const alacranCuerpoNegro = await prisma.animal.create({
    data: {
      nombreComun: 'Alacrán de la corteza de cuerpo negro',
      nombreCientifico: 'Centruroides edwardsii',
      descripcion: 'Alacrán de color oscuro, presente en barrancas rocosas; veneno moderado.',
      habitat: 'Barrancas, grietas rocosas de zonas secas.',
      primerosAuxilios: 'Limpiar la zona, inmovilizar, aplicar hielo y buscar ayuda médica.',
      rutaImagen: '/images/animals/alacran-edwardsii.jpg',
      peligrosidad: 2,
      categoria: 3,
    },
  });

  // Reptiles — serpientes venenosas

  const cascabelSierra = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel de la sierra',
      nombreCientifico: 'Crotalus atrox',
      descripcion: 'Víbora de cascabel con veneno mixto (hemotóxico y citotóxico), produce dolor y posible necrosis.',
      habitat: 'Laderas rocosas, matorrales áridos.',
      primerosAuxilios: 'Inmovilizar la extremidad, no usar torniquete fuerte, transporte inmediato para suero antiofídico.',
      rutaImagen: '/images/animals/crotalus-atrox.jpg',
      peligrosidad: 3,
      categoria: 2,
    },
  });

  const cascabelVerde = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel verde',
      nombreCientifico: 'Crotalus lepidus',
      descripcion: 'Pequeña víbora de montaña; su veneno puede producir hinchazón local y dolor.',
      habitat: 'Altitudes rocosas en montaña.',
      primerosAuxilios: 'Mantener la calma, inmovilizar, buscar atención médica para suero.',
      rutaImagen: '/images/animals/crotalus-lepidus.jpg',
      peligrosidad: 2,
      categoria: 2,
    },
  });

  const cascabelMojave = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel Mojave',
      nombreCientifico: 'Crotalus scutulatus',
      descripcion: 'Víbora altamente peligrosa: en algunas poblaciones su veneno tiene componente neurotóxico.',
      habitat: 'Regiones semidesérticas y áridas.',
      primerosAuxilios: 'Inmovilizar, monitorear respiración, transporte urgente para suero y soporte vital.',
      rutaImagen: '/images/animals/crotalus-scutulatus.jpg',
      peligrosidad: 3,
      categoria: 2,
    },
  });

  const cascabelColaNegra = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel cola negra',
      nombreCientifico: 'Crotalus molossus',
      descripcion: 'Víbora de cascabel con veneno que provoca dolor, inflamación local y efectos sistémicos leves.',
      habitat: 'Zonas rocosas y semiáridas.',
      primerosAuxilios: 'Inmovilizar la extremidad, mantener al paciente tranquilo, acudir a hospital para suero si es necesario.',
      rutaImagen: '/images/animals/crotalus-molossus.jpg',
      peligrosidad: 2,
      categoria: 2,
    },
  });

  const cascabelMoteada = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel moteada',
      nombreCientifico: 'Crotalus pricei',
      descripcion: 'Víbora de montaña, menor tamaño; mordedura puede provocar efectos locales moderados.',
      habitat: 'Rocosos a gran altitud, sierra.',
      primerosAuxilios: 'Vendaje ligero, inmovilización, llevar a un hospital para valoración y suero.',
      rutaImagen: '/images/animals/crotalus-pricei.jpg',
      peligrosidad: 2,
      categoria: 2,
    },
  });

  const cascabelColaLargaSinaloense = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel sinaloense de cola larga',
      nombreCientifico: 'Crotalus stejnegeri',
      descripcion: 'Víbora con larga cola; veneno clínicamente importante en su región de distribución.',
      habitat: 'Quebradas y pendientes serranas.',
      primerosAuxilios: 'Inmovilizar, aplicar frío ligero, transferir a un centro con suero antiofídico.',
      rutaImagen: '/images/animals/crotalus-stejnegeri.jpg',
      peligrosidad: 3,
      categoria: 2,
    },
  });

  const cascabelNarizPuntiaguda = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel nariz puntiaguda',
      nombreCientifico: 'Crotalus willardi',
      descripcion: 'Víbora de montaña con nariz prominente; envenenamiento requiere atención especializada.',
      habitat: 'Sierra Madre Occidental, altitudes altas.',
      primerosAuxilios: 'Mantener la calma, inmovilizar, trasladar a hospital para suero y observación.',
      rutaImagen: '/images/animals/crotalus-willardi.jpg',
      peligrosidad: 2,
      categoria: 2,
    },
  });

  const lagartoEnchaquirado = await prisma.animal.create({
    data: {
      nombreComun: 'Lagarto enchaquirado',
      nombreCientifico: 'Heloderma horridum',
      descripcion: 'Lagarto venenoso de glándulas venenosas; su mordida puede provocar dolor y efectos sistémicos.',
      habitat: 'Regiones rocosas y ribereñas en zonas serranas.',
      primerosAuxilios: 'Lavar la herida, inmovilizar la zona, buscar atención médica inmediatamente.',
      rutaImagen: '/images/animals/heloderma-horridum.jpg',
      peligrosidad: 3,
      categoria: 2,
    },
  });

  const coralillo = await prisma.animal.create({
    data: {
      nombreComun: 'Coralillo',
      nombreCientifico: 'Micrurus tener',
      descripcion: 'Serpiente elápida con veneno neurotóxico; puede causar parálisis respiratoria.',
      habitat: 'Hojarasca, troncos, zonas ribereñas.',
      primerosAuxilios: 'No aplicar torniquetes ni succionar; inmovilizar y trasladar urgentemente para antiveneno y soporte respiratorio.',
      rutaImagen: '/images/animals/micrurus-tener.jpg',
      peligrosidad: 3,
      categoria: 2,
    },
  });

  // Otros (“varios”)

  const abejaAfricanizada = await prisma.animal.create({
    data: {
      nombreComun: 'Abeja africanizada',
      nombreCientifico: 'Apis mellifera scutellata',
      descripcion: 'Abeja cuya picadura en masa puede producir choque anafiláctico o asfixia por obstrucción de vías respiratorias.',
      habitat: 'Colmenas en árboles o estructuras periurbanas/rurales.',
      primerosAuxilios: 'Aplicar epinefrina si hay reacción alérgica, mantener vías respiratorias, enfriar la piel, traslado a hospital.',
      rutaImagen: '/images/animals/abeja-africanizada.jpg',
      peligrosidad: 3,
      categoria: 4,
    },

    //1=Araña 2=reptiles 3=Alacrán 4= varios
  });

  const avispaPolistes = await prisma.animal.create({
    data: {
      nombreComun: 'Avispa Polistes',
      nombreCientifico: 'Polistes spp.',
      descripcion: 'Avispa que puede picar varias veces; su picadura es dolorosa y puede desencadenar alergia grave.',
      habitat: 'Tejados, ramas, rincones al aire libre.',
      primerosAuxilios: 'Limpiar la zona, aplicar frío local, observar signos de reacción alérgica, epinefrina si es necesario.',
      rutaImagen: '/images/animals/polistes.jpg',
      peligrosidad: 2,
      categoria: 4,
    },
  });

  const ciempiésGigante = await prisma.animal.create({
    data: {
      nombreComun: 'Ciempiés gigante',
      nombreCientifico: 'Scolopendra viridis',
      descripcion: 'Ciempiés grande que inyecta veneno con dolor muy intenso y posible reacción sistémica leve.',
      habitat: 'Suelo, hojarasca, troncos y rocas de zonas montañosas.',
      primerosAuxilios: 'Limpiar la herida, aplicar frío local, inmovilizar, analgesia y observación médica.',
      rutaImagen: '/images/animals/ciempiés-viridis.jpg',
      peligrosidad: 2,
      categoria: 4,
    },
  });

  const viudaNegra = await prisma.animal.create({
    data: {
      nombreComun: 'Viuda negra',
      nombreCientifico: 'Latrodectus mactans',
      descripcion: 'Araña de color negro brillante con un característico reloj de arena rojo en el abdomen. Su veneno es neurotóxico y puede causar dolor intenso, espasmos musculares y síntomas sistémicos.',
      habitat: 'Zonas oscuras, rincones, garajes, pilas de madera y áreas rurales.',
      primerosAuxilios: 'Lavar el área con agua y jabón, mantener la calma, aplicar compresas frías y acudir por atención médica ante síntomas severos.',
      rutaImagen: '/images/animals/viuda-negra.jpg',
      peligrosidad: 3,
      categoria: 3
    },
  });

  const arañaViolinista = await prisma.animal.create({
    data: {
      nombreComun: 'Araña violinista',
      nombreCientifico: 'Loxosceles reclusa',
      descripcion: 'Araña de color café con una marca en forma de violín en el cefalotórax. Su veneno es necrotizante y puede causar lesiones graves en piel y tejidos.',
      habitat: 'Casas, almacenes, rincones secos, grietas y detrás de muebles.',
      primerosAuxilios: 'Lavar la herida, no aplicar calor, no presionar la zona, vigilar signos de necrosis y acudir a un centro médico.',
      rutaImagen: '/images/animals/arana-violinista.jpg',
      peligrosidad: 3,
      categoria: 3
    },
  });

  const viudaCafe = await prisma.animal.create({
    data: {
      nombreComun: 'Viuda café',
      nombreCientifico: 'Latrodectus geometricus',
      descripcion: 'Araña de color marrón o café con un patrón anaranjado o amarillo en el abdomen. Su veneno es neurotóxico, pero suele ser menos potente que el de la viuda negra.',
      habitat: 'Esquinas de casas, techos, cobertizos y lugares secos.',
      primerosAuxilios: 'Lavar el área afectada, aplicar frío local, evitar esfuerzos físicos y buscar atención médica si hay síntomas severos.',
      rutaImagen: '/images/animals/viuda-cafe.jpg',
      peligrosidad: 2,
      categoria: 3
    },
  });

  // ============================================================
// TABLA PIVOTE: ASOCIAR ANTÍDOTOS A LOS ANIMALES EXISTENTES
// ============================================================

// === 1. Alacranes (Antiveneno Antialacrán → id = 1) ===
const alacranIDs = [1, 2, 3, 4, 5];
for (const id of alacranIDs) {
  await prisma.animalAntidoto.create({
    data: {
      animalId: id,
      antidotoId: 1, // Antialacrán
    },
  });
}

// === 2. Cascabeles (Antiveneno Antiviperino → id = 2) ===
const cascabelIDs = [6, 7, 8, 9, 10, 11, 12];
for (const id of cascabelIDs) {
  await prisma.animalAntidoto.create({
    data: {
      animalId: id,
      antidotoId: 2, // Antiviperino
    },
  });
}

// === 3. Coralillo (Antiveneno Coralillo → id = 3) ===
await prisma.animalAntidoto.create({
  data: {
    animalId: 14,
    antidotoId: 3,
  },
});

// === 4. Viudas negras / cafés (Anti-Latrodectus → id = 4) ===
const latrodectusIDs = [18, 20];
for (const id of latrodectusIDs) {
  await prisma.animalAntidoto.create({
    data: {
      animalId: id,
      antidotoId: 4, // Anti-Latrodectus
    },
  });
}

// === 5. Araña violinista (Anti-Loxosceles → id = 5) ===
await prisma.animalAntidoto.create({
  data: {
    animalId: 19,
    antidotoId: 5, // Anti-Loxosceles
  },
});

// === 6. Animales sin antiveneno específico (Analgesia / Soporte) ===
// Analgésico Sistémico → id = 6
const soporteIDs = [
  13, // Lagarto enchaquirado
  15, // Abeja africanizada
  16, // Avispa Polistes
  17, // Ciempiés gigante
];

for (const id of soporteIDs) {
  await prisma.animalAntidoto.create({
    data: {
      animalId: id,
      antidotoId: 6, // Analgésico
    },
  });
}

  // 5. CREACIÓN DE HOSPITALES - Array con todos los hospitales
const hospitalesData = [
  // Hospitales existentes que ya tenías
  {
    nombre: 'Hospital integral de Canatlán durango',
    direccion: 'Independencia y Ramón Corona #40 Zona Centro 34409 Canatlán, Dgo.',
    telefono: '677-872-0024',
    latitud: 24.52628,
    longitud: -104.77492,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'I.S.S.S.T.E Canatlán',
    direccion: '34455, Morelos 1013, valenzuela 34455 Canatlán, Dgo.',
    telefono: '677-872-0234',
    latitud: 24.52125,
    longitud: -104.77767,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Cruz roja mexicana Canatlán',
    direccion: 'Manzanal 102, Soledad Álvarez, 34453 Canatlán, Durango.',
    telefono: '677-872-0202',
    latitud: 24.52733,
    longitud: -104.76657,
    ultimaVerificacion: new Date(),
  },

  {
    nombre: 'I.M.S.S clínica 6',
    direccion: 'Soledad Álvarez SN, Centro, 34450, entre Alameda y Morelos. Canatlán, Durango',
    telefono: '677-872-0017',
    latitud: 24.52342,
    longitud: -104.77774,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Canelas Centro de salud',
    direccion: '34500 Canelas, Durango',
    telefono: '674-864-0029',
    latitud: 25.12432,
    longitud: -106.54528,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Coneto de comonfort Clínica nogales',
    direccion: 'Carretera coneteo, 34473 Nogales, Dgo.',
    telefono: null,
    latitud: 31.31656,
    longitud: -110.94847,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Unidad medica rural IMSS #19 Coneto de Comonfort',
    direccion: 'Camino A Vizcaino A 500 M De La Telesecundaria , Col. Coneto De Comonfort, C.P. 34475, Durango',
    telefono: '800-623-2323',
    latitud: 25.08505,
    longitud: -104.77583,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital general de Cuencamé',
    direccion: 'Camino Pasaje 1, Alamedas, 35800 Cuencamé de Ceniceros, Dgo.',
    telefono: '671-763-0104',
    latitud: 24.87395,
    longitud: -103.70645,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Centro de salud Cuencamé Dgo.',
    direccion: 'Primero de Mayo, Alamedas, 35800 Cuencamé de Ceniceros, Dgo.',
    telefono: null,
    latitud: 24.86999,
    longitud: -103.69732,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital regional de Cuencamé',
    direccion: 'Carretera A Pasaje Km 1, El Arenal, 35807 Cuencamé de Ceniceros, Dgo.',
    telefono: '671-763-0104',
    latitud: 24.87390,
    longitud: -103.70627,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital General 450 Durango',
    direccion: 'Blvd. José María Patoni S/N, El Ciprés, 34206 Durango, Dgo.',
    telefono: '618-137-3328',
    latitud: 24.05628,
    longitud: -104.64162,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Cruz Roja Mexicana Urgencias Durango',
    direccion: 'Predio Rustico La Tinaja y Los Lugos, Blvd. José María Patoni, Impregnadora Guadiana, 34279 Durango, Dgo.',
    telefono: '618-817-3444',
    latitud: 24.04417,
    longitud: -104.65600,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Instituto Mexicano del Seguro Social - Hospital Regional de Zona No. 1',
    direccion: 'Normal 2011, Predio Canoas, 34076 Durango, Dgo.',
    telefono: '618-811-9820',
    latitud: 24.02907,
    longitud: -104.68263,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'ISSSTE Hospital General Dr. Santiago Ramon y Cajal',
    direccion: 'Predio Canoas s/n, Colonia Obrera, Silvestre Dorador, 34070 Durango, Dgo.',
    telefono: '618-811-7513',
    latitud: 24.02939,
    longitud: -104.68159,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital integral Simón Bolívar',
    direccion: '35950 Gral. Simón Bolívar, Dgo.',
    telefono: null,
    latitud: 24.68317,
    longitud: -103.22704,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'ISSSTE Gómez Palacio',
    direccion: 'Boulevard Miguel Alemán S/N, Centro, 35000 Gómez Palacio, Dgo.',
    telefono: '871-714-5547',
    latitud: 25.55453,
    longitud: -103.50769,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital General de Gómez Palacio',
    direccion: 'De Las Violetas 1152, Rinconadas Bugambilias, 35010 Gómez Palacio, Dgo.',
    telefono: '871-715-6617',
    latitud: 25.59147,
    longitud: -103.48466,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'IMSS Hospital General de Zona Número 51',
    direccion: 'Calle María Esther Galarza No. 222 Fraccionamiento, Fidel Velásquez, Fidel Velázquez, 35025 Gómez Palacio, Dgo.',
    telefono: '871-719-6802',
    latitud: 25.57049,
    longitud: -103.52182,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'IMSS HGZ No.46',
    direccion: 'Calz. J. Agustín Castro, Cerro de La Cruz, Revolución, 35000 Gómez Palacio, Dgo.',
    telefono: '729-293-2131',
    latitud: 25.55757,
    longitud: -103.50585,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital Rural No. 26 IMSS Bienestar',
    direccion: 'Niños Heroes de Chapultepec SN-S Zona Centro 34700 Guadalupe Victoria Dgo.',
    telefono: null,
    latitud: 24.43901,
    longitud: -104.12197,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Centro De Salud De Inde',
    direccion: '35500 Indé, Dgo.',
    telefono: null,
    latitud: 25.91578,
    longitud: -105.22334,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital general de lerdo',
    direccion: 'Periférico Gómez-Lerdo Km 12+500 S/N Col. Prudencia Jauregui 35150 Libramiento Rentería S/N Entre Prolongación Durango Y Prolongación Zacatecas',
    telefono: '871-725-0722',
    latitud: 25.53191,
    longitud: -103.53273,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Cruz Roja Mexicana Delegación Lerdo',
    direccion: 'C. Gpe. Victoria, Las Brisas, 35153 Lerdo, Dgo.',
    telefono: '871-298-3911',
    latitud: 25.52365,
    longitud: -103.52789,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'IMSS Bermejillo',
    direccion: 'Carr. Torreon - Jiménez 85, Bermejillo, 35230 Bermejillo, Dgo.',
    telefono: null,
    latitud: 25.88378,
    longitud: -103.62032,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'IMSS 45 Mapimí',
    direccion: 'Calle G. PACHECO Colonia CENTRO Mapimí, cp 35200',
    telefono: null,
    latitud: 25.83302,
    longitud: -103.84851,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital integral del mezquital',
    direccion: 'Calle Principal 325, San Francisco del Mezquital, 34970 Mezquital, Dgo.',
    telefono: '675-884-4011',
    latitud: 23.47685,
    longitud: -104.39214,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital Integral de Nazas, Dgo',
    direccion: 'Nazas, Durango (cerrado)',
    telefono: null,
    latitud: 25.22500,
    longitud: -104.10000,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'CRUZ ROJA MEXICANA N. DE DIOS, DGO.',
    direccion: 'Carretera Panamericana, 34843 Nombre de Dios, Dgo.',
    telefono: '675-871-7041',
    latitud: 23.84397,
    longitud: -104.22520,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital Las Nieves',
    direccion: 'Carr. Panamericana KM 333, 35381 Villa las Nieves, Dgo.',
    telefono: '649-547-0474',
    latitud: 26.40477,
    longitud: -105.38120,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital General El Oro',
    direccion: 'Sertoma LB, Centro, 35690 Santa María del Oro, Dgo.',
    telefono: null,
    latitud: 25.95596,
    longitud: -105.36644,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital Integral "Peñon Blanco"',
    direccion: 'DGO 316, 34764 Puerto Peñasco, Dgo.',
    telefono: null,
    latitud: 24.78862,
    longitud: -104.02269,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Cruz roja mexicana villa unión',
    direccion: 'Juárez 603, PUEBLO NUEVO, 34800 Villa Unión, Dgo.',
    telefono: '675-867-1632',
    latitud: 23.97458,
    longitud: -104.05242,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital Integral Villa Union',
    direccion: '20 de Noviembre 10, LA COLONIA, 34800 Villa Unión, Dgo.',
    telefono: '675-867-0020',
    latitud: 23.98278,
    longitud: -104.04340,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Cruz Roja Mexicana delegación El Salto',
    direccion: 'Ferrocarril s/n, Ferrocarril 628, Juarez, Juárez, 34471 El Salto, Dgo.',
    telefono: '675-876-0895',
    latitud: 23.78009,
    longitud: -105.36198,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital integral regional El Salto',
    direccion: 'Durango-Mazatlán Kilómetro 99, El Brillante, 34950 Durango, Dgo. (localidad el salto)',
    telefono: '675-876-5512',
    latitud: 23.78819,
    longitud: -105.34764,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'IMSS HGP Rodeo',
    direccion: 'Panamericana, 35760 Rodeo, Dgo.',
    telefono: null,
    latitud: 25.16976,
    longitud: -104.55429,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital integral san juan del rio',
    direccion: 'La Eta, 34485 San Juan del Río, Dgo.',
    telefono: '677-866-0378',
    latitud: 24.78355,
    longitud: -104.47129,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital General de Santiago',
    direccion: 'Baca Ortiz 506, Lomas de San Juan, 34635 Santiago Papasquiaro, Dgo.',
    telefono: '674-862-3248',
    latitud: 25.04367,
    longitud: -105.42297,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital integral súchil',
    direccion: 'Av Ferrocarril 301, Centro, 34800 Súchil, Dgo.',
    telefono: '675-875-0208',
    latitud: 23.61666,
    longitud: -103.92410,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital Integral Tamazula Durango',
    direccion: 'Gral. Carlos Real Félix, 34580 Tamazula de Victoria, Dgo.',
    telefono: '667-430-2002',
    latitud: 24.97223,
    longitud: -106.96729,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'I.M.S.S. Clínica Número 42',
    direccion: 'Guanaceví Kilómetro 1, Col del Valle, 35600 Santa Catarina de Tepehuanes, Dgo.',
    telefono: '674-863-0314',
    latitud: 25.34053,
    longitud: -105.72552,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'CENTRO DE SALUD TLAHUALILO',
    direccion: 'Francisco I. Madero SN-S COMITE DEL PRI, Centro, 35290 Tlahualilo de Zaragoza, Dgo.',
    telefono: null,
    latitud: 26.10965,
    longitud: -103.43989,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Unidad de medicina familiar No 13 Tlahualilo',
    direccion: 'Dalias 437, Secc 1339, Las Colonias, 35257 Tlahualilo de Zaragoza, Dgo.',
    telefono: '872-761-0191',
    latitud: 26.10182,
    longitud: -103.44341,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'ISSSTE C.M.F. TLAHUALILO DE ZARAGOZA',
    direccion: 'Aguascalientes 142, Zaragoza, 35257 Tlahualilo de Zaragoza, Dgo.',
    telefono: null,
    latitud: 26.10477,
    longitud: -103.43906,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'IMSS. Hospital Rural de Solidaridad (Oportunidades)',
    direccion: 'Carretera a Suchil km. 1.5, José Guadalupe Rodríguez, 34894 Vicente Guerrero, Dgo.',
    telefono: '675-865-0362',
    latitud: 23.71938,
    longitud: -103.97489,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Cruz Roja Mexicana, Vicente Guerrero',
    direccion: 'Zona Centro, 34892 Vicente Guerrero, Dgo.',
    telefono: '675-865-0850',
    latitud: 23.73798,
    longitud: -103.98354,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Centro de Salud Vicente Guerrero',
    direccion: 'Vicente Guerrero SN-S, San Antonio, 34892 Vicente Guerrero, Dgo.',
    telefono: '675-865-0158',
    latitud: 23.73857,
    longitud: -103.98389,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Hospital Integral de Nuevo Ideal',
    direccion: 'Guadalupe Victoria, La Magdalena, 34420 Nuevo Ideal, Dgo.',
    telefono: null,
    latitud: 24.88156,
    longitud: -105.06567,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Cruz Roja Mexicana Delegación Nuevo Ideal',
    direccion: 'Av. Miguel Aleman 712, Zona Centro, 34422 Nuevo Ideal, Dgo.',
    telefono: '677-873-0102',
    latitud: 24.88586,
    longitud: -105.07449,
    ultimaVerificacion: new Date(),
  },
  {
    nombre: 'Instituto Mexicano del Seguro Social Nuevo Ideal',
    direccion: '20 de Noviembre s/n, Zona Centro, 34410 Nuevo Ideal, Dgo.',
    telefono: '677-873-0049',
    latitud: 24.88789,
    longitud: -105.07386,
    ultimaVerificacion: new Date(),
  },
];

  // Insertar todos los hospitales
  console.log("➡ Creando hospitales...");

await prisma.hospital.createMany({
  data: hospitalesData.map(h => ({
    nombre: h.nombre,
    direccion: h.direccion,
    telefono: h.telefono,
    latitud: h.latitud,
    longitud: h.longitud,
    ultimaVerificacion: h.ultimaVerificacion,
  })),
  skipDuplicates: true, // 👈 evita duplicados si se corre el seed otra vez
});


// -----------------------------
// Inserción hospitalAntidoto con stock (sin duplicados)
// -----------------------------

// Obtenemos todos los hospitales y todos los antídotos
const hospitales = await prisma.hospital.findMany();
const todosLosHospitalesIDs = hospitales.map(h => h.id);

const antidotos = await prisma.antidoto.findMany();

// Función para generar stock aleatorio
const stockRange = {
  antialacran: () => Math.floor(Math.random() * 21) + 10, // 10 a 30
  antiveneno: () => Math.floor(Math.random() * 21) + 5,   // 5 a 25
  antiofido: () => Math.floor(Math.random() * 16) + 5,    // 5 a 20
};

// Objeto con antídotos específicos
const antidotoEspecial = {
  alacran: antidotos.find(a => a.nombre.includes('Alacrán'))?.id,
  coralillo: antidotos.find(a => a.nombre.includes('Coralillo'))?.id,
  latrodectus: antidotos.find(a => a.nombre.includes('Latrodectus'))?.id,
};

// Guardamos los datos que vamos a insertar
const inventarioData: { hospitalId: number; antidotoId: number; stock: number }[] = [];

// 1️⃣ Todos los hospitales reciben antídoto antialacrán
for (const hid of todosLosHospitalesIDs) {
  if (antidotoEspecial.alacran) {
    inventarioData.push({
      hospitalId: hid,
      antidotoId: antidotoEspecial.alacran,
      stock: stockRange.antialacran(),
    });
  }
}

// 2️⃣ Antídotos especiales asignados a hospitales aleatorios
for (const hid of todosLosHospitalesIDs) {
  // Ejemplo: 50% de hospitales reciben Coralillo
  if (antidotoEspecial.coralillo && Math.random() < 0.5) {
    inventarioData.push({
      hospitalId: hid,
      antidotoId: antidotoEspecial.coralillo,
      stock: stockRange.antiveneno(),
    });
  }

  // Ejemplo: 40% de hospitales reciben Latrodectus
  if (antidotoEspecial.latrodectus && Math.random() < 0.4) {
    inventarioData.push({
      hospitalId: hid,
      antidotoId: antidotoEspecial.latrodectus,
      stock: stockRange.antiofido(),
    });
  }
}

// 3️⃣ Insertamos en la BD sin duplicados
await prisma.hospitalAntidoto.createMany({
  data: inventarioData,
  skipDuplicates: true,
});

console.log('✅ Inventario de antídotos insertado correctamente en todos los hospitales');


  // 7. CREAR USUARIO DE PRUEBA
  const usuarioDemo = await prisma.user.create({
    data: {
      name: 'Estudiante Demo',
      email: 'demo@aracnoscan.com',
    },
  });

  // 8. SIMULAR ANIMALES DESBLOQUEADOS
  await prisma.animalDesbloqueado.create({
    data: {
      usuarioId: usuarioDemo.id,
      animalId: alacranDurango.id,
    },
  });



  console.log(`✅ Seed completado exitosamente. ${hospitalesData.length} hospitales creados.`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });