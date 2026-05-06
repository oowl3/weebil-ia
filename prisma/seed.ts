import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el Master Seed de WEEBIL (Versión Final)');

  // ============================================================
  // 1. LIMPIEZA TOTAL (Orden inverso para respetar Foreign Keys)
  // ============================================================
  await prisma.animalDesbloqueado.deleteMany();
  await prisma.hospitalAntidoto.deleteMany();
  await prisma.animalAntidoto.deleteMany();
  await prisma.hospital.deleteMany();
  await prisma.antidoto.deleteMany();
  await prisma.animal.deleteMany();
  await prisma.user.deleteMany();
  await prisma.faq.deleteMany();

  console.log('🧹 Base de datos limpiada.');

  // ============================================================
  // 2. CREACIÓN DE ANTÍDOTOS (ESPECÍFICOS)
  // ============================================================
  console.log('🧪 Creando antídotos...');

  const antialacran = await prisma.antidoto.create({
    data: {
      nombre: 'Antiveneno Antialacrán',
      descripcion: 'Faboterápico polivalente para escorpiones del género Centruroides.',
    },
  });

  const antiviperino = await prisma.antidoto.create({
    data: {
      nombre: 'Antiveneno Antiviperino',
      descripcion: 'Faboterápico polivalente para serpientes del género Crotalus (Cascabel).',
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
      nombre: 'Analgésico Sistémico / Soporte',
      descripcion: 'Tratamiento sintomático para dolor, limpieza o manejo de infecciones (Chagas/Bacterias).',
    },
  });

  // ============================================================
  // 3. CREACIÓN DE ANIMALES (FAUNA COMPLETA DE DURANGO)
  // ============================================================
  console.log('🦂 Creando animales...');

  // --- ESCORPIONES ---
  const alacranDurango = await prisma.animal.create({
    data: {
      nombreComun: 'Alacrán de Durango',
      nombreCientifico: 'Centruroides suffusus',
      descripcion: 'Escorpión neurotóxico, muy implicado en envenenamientos en zonas urbanas de Durango.',
      habitat: 'Escombros, bajo piedras, madera en zonas periurbanas.',
      primerosAuxilios: 'Lavar la zona, inmovilizar, aplicar hielo, buscar atención médica urgente.',
      rutaImagen: '/images/animals/alacran-suffusus.jpg',
      peligrosidad: 3, // ALTA
      categoria: 2,    // ESCORPION
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
      categoria: 2,
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
      peligrosidad: 2, // MEDIA
      categoria: 2,
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
      categoria: 2,
    },
  });

  const alacranCuerpoNegro = await prisma.animal.create({
    data: {
      nombreComun: 'Alacrán de cuerpo negro',
      nombreCientifico: 'Centruroides edwardsii',
      descripcion: 'Alacrán de color oscuro, presente en barrancas rocosas; veneno moderado.',
      habitat: 'Barrancas, grietas rocosas de zonas secas.',
      primerosAuxilios: 'Limpiar la zona, inmovilizar, aplicar hielo y buscar ayuda médica.',
      rutaImagen: '/images/animals/alacran-edwardsii.jpg',
      peligrosidad: 2,
      categoria: 2,
    },
  });

  // --- VÍBORAS (CASCABELES) ---
  const cascabelSierra = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel de la sierra',
      nombreCientifico: 'Crotalus atrox',
      descripcion: 'Víbora de cascabel con veneno mixto (hemotóxico y citotóxico), produce dolor y posible necrosis.',
      habitat: 'Laderas rocosas, matorrales áridos.',
      primerosAuxilios: 'Inmovilizar extremidad, NO usar torniquete, transporte inmediato para suero.',
      rutaImagen: '/images/animals/crotalus-atrox.jpg',
      peligrosidad: 3,
      categoria: 3, // SERPIENTE
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
      categoria: 3,
    },
  });

  const cascabelMojave = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel Mojave',
      nombreCientifico: 'Crotalus scutulatus',
      descripcion: 'Víbora altamente peligrosa: veneno con componente neurotóxico severo.',
      habitat: 'Regiones semidesérticas y áridas.',
      primerosAuxilios: 'Inmovilizar, monitorear respiración, transporte urgente para soporte vital.',
      rutaImagen: '/images/animals/crotalus-scutulatus.jpg',
      peligrosidad: 3, // LETAL
      categoria: 3,
    },
  });

  const cascabelColaNegra = await prisma.animal.create({
    data: {
      nombreComun: 'Cascabel cola negra',
      nombreCientifico: 'Crotalus molossus',
      descripcion: 'Víbora de cascabel con veneno que provoca dolor, inflamación local y efectos sistémicos.',
      habitat: 'Zonas rocosas y semiáridas.',
      primerosAuxilios: 'Inmovilizar la extremidad, mantener al paciente tranquilo, acudir a hospital.',
      rutaImagen: '/images/animals/crotalus-molossus.jpg',
      peligrosidad: 2,
      categoria: 3,
    },
  });

  // --- CORALILLO ---
  const coralillo = await prisma.animal.create({
    data: {
      nombreComun: 'Coralillo',
      nombreCientifico: 'Micrurus tener',
      descripcion: 'Serpiente elápida con veneno neurotóxico; puede causar parálisis respiratoria.',
      habitat: 'Hojarasca, troncos, zonas ribereñas.',
      primerosAuxilios: 'NO torniquetes. Inmovilizar y trasladar urgentemente para soporte respiratorio.',
      rutaImagen: '/images/animals/micrurus-tener.jpg',
      peligrosidad: 3,
      categoria: 3,
    },
  });

  // --- ARAÑAS VENENOSAS ---
  const viudaNegra = await prisma.animal.create({
    data: {
      nombreComun: 'Viuda negra',
      nombreCientifico: 'Latrodectus mactans',
      descripcion: 'Araña negra brillante con marca roja (reloj de arena). Veneno neurotóxico, dolor intenso.',
      habitat: 'Zonas oscuras, rincones, garajes, pilas de madera.',
      primerosAuxilios: 'Lavar área, aplicar frío, acudir por atención médica ante dolor muscular.',
      rutaImagen: '/images/animals/viuda-negra.jpg',
      peligrosidad: 3,
      categoria: 1, // ARANA
    },
  });

  const viudaCafe = await prisma.animal.create({
    data: {
      nombreComun: 'Viuda café',
      nombreCientifico: 'Latrodectus geometricus',
      descripcion: 'Marrón con patrón geométrico. Veneno similar a la negra pero menos potente.',
      habitat: 'Esquinas de casas, techos, lugares secos.',
      primerosAuxilios: 'Lavar, frío local, observación.',
      rutaImagen: '/images/animals/viuda-cafe.jpg',
      peligrosidad: 2,
      categoria: 1,
    },
  });

  const aranaViolinista = await prisma.animal.create({
    data: {
      nombreComun: 'Araña violinista',
      nombreCientifico: 'Loxosceles reclusa',
      descripcion: 'Marrón con marca de violín. Veneno necrotizante (muerte de tejido).',
      habitat: 'Detrás de cuadros, ropa guardada, rincones secos.',
      primerosAuxilios: 'NO aplicar calor. Hielo, no presionar, ir al médico para evitar necrosis.',
      rutaImagen: '/images/animals/arana-violinista.jpg',
      peligrosidad: 3,
      categoria: 1,
    },
  });

  // --- OTROS, CONFUSOS O NO LETALES ---
  const saltarina = await prisma.animal.create({
    data: {
      nombreComun: 'Araña Saltarina',
      nombreCientifico: 'Salticidae',
      descripcion: 'Pequeña, peluda y curiosa. Inofensiva.',
      habitat: 'Jardines, muros soleados.',
      primerosAuxilios: 'Lavar con agua y jabón.',
      rutaImagen: '/images/animals/saltarina.jpg',
      peligrosidad: 0, // BAJA
      categoria: 1,
    },
  });

  const lagartoEnchaquirado = await prisma.animal.create({
    data: {
      nombreComun: 'Lagarto enchaquirado',
      nombreCientifico: 'Heloderma horridum',
      descripcion: 'Lagarto venenoso; mordida dolorosa con efectos sistémicos.',
      habitat: 'Regiones rocosas y ribereñas.',
      primerosAuxilios: 'Lavar herida, inmovilizar, buscar atención médica (manejo del dolor).',
      rutaImagen: '/images/animals/heloderma-horridum.jpg',
      peligrosidad: 2,
      categoria: 5, // OTRO
    },
  });

  const abejaAfricanizada = await prisma.animal.create({
    data: {
      nombreComun: 'Abeja africanizada',
      nombreCientifico: 'Apis mellifera scutellata',
      descripcion: 'Picadura en masa puede producir choque anafiláctico.',
      habitat: 'Colmenas en árboles o estructuras.',
      primerosAuxilios: 'Retirar aguijón, epinefrina si hay alergia, hospital si son muchas picaduras.',
      rutaImagen: '/images/animals/abeja-africanizada.jpg',
      peligrosidad: 2,
      categoria: 4, // INSECTO
    },
  });

  // --- NUEVOS AGREGADOS (Falsos Positivos y Riesgo Sanitario) ---
  const tarantula = await prisma.animal.create({
    data: {
      nombreComun: 'Tarántula de Durango',
      nombreCientifico: 'Aphonopelma spp.',
      descripcion: 'Araña grande y peluda. A pesar de su apariencia intimidante, es dócil y su veneno no es peligroso para el humano.',
      habitat: 'Madrigueras en el suelo, zonas áridas.',
      primerosAuxilios: 'Lavar la zona con agua y jabón. No requiere suero, solo analgésico si hay dolor.',
      rutaImagen: '/images/animals/tarantula.jpg',
      peligrosidad: 1, // BAJA
      categoria: 1,
    },
  });

  const aranaLobo = await prisma.animal.create({
    data: {
      nombreComun: 'Araña Lobo',
      nombreCientifico: 'Lycosidae',
      descripcion: 'Cazadora activa, corre rápido. A menudo confundida con la violinista, pero no tiene la marca de violín y es inofensiva.',
      habitat: 'Jardines, pastizales, suelo.',
      primerosAuxilios: 'Lavar con agua y jabón.',
      rutaImagen: '/images/animals/lycosa.jpg',
      peligrosidad: 1, // BAJA
      categoria: 1,
    },
  });

  const chincheBesucona = await prisma.animal.create({
    data: {
      nombreComun: 'Chinche Besucona',
      nombreCientifico: 'Triatoma',
      descripcion: 'Insecto hematófago (chupa sangre). Principal vector de la enfermedad de Chagas en Durango.',
      habitat: 'Grietas en paredes de adobe, techos de lámina, zonas rurales.',
      primerosAuxilios: 'No aplastar sobre la piel. Lavar con agua y jabón, capturar al insecto y llevarlo a centro de salud para análisis.',
      rutaImagen: '/images/animals/chinche.jpg',
      peligrosidad: 2, // MEDIA (Riesgo sanitario a largo plazo)
      categoria: 4,    // INSECTO
    },
  });

  // ============================================================
  // 4. RELACIONAR ANIMALES CON ANTÍDOTOS (DINÁMICO Y SEGURO)
  // ============================================================
  console.log('🔗 Vinculando animales con sus antídotos...');

  // Agrupamos los objetos de animales para procesarlos juntos
  const grupoAlacranes = [alacranDurango, alacranPardoOscuro, alacranRayado, alacranCorteza, alacranCuerpoNegro];
  const grupoViperinos = [cascabelSierra, cascabelVerde, cascabelMojave, cascabelColaNegra];
  const grupoLatrodectus = [viudaNegra, viudaCafe];
  
  // Grupo de soporte ampliado con los nuevos animales
  const grupoSoporte = [
      abejaAfricanizada, lagartoEnchaquirado, saltarina, 
      tarantula, aranaLobo, chincheBesucona 
  ];

  // 1. Alacranes -> Antialacrán
  for (const animal of grupoAlacranes) {
    await prisma.animalAntidoto.create({ data: { animalId: animal.id, antidotoId: antialacran.id } });
  }

  // 2. Serpientes -> Antiviperino
  for (const animal of grupoViperinos) {
    await prisma.animalAntidoto.create({ data: { animalId: animal.id, antidotoId: antiviperino.id } });
  }

  // 3. Coralillo -> Anticoralillo
  await prisma.animalAntidoto.create({ data: { animalId: coralillo.id, antidotoId: anticoralillo.id } });

  // 4. Viudas -> Anti-Latrodectus
  for (const animal of grupoLatrodectus) {
    await prisma.animalAntidoto.create({ data: { animalId: animal.id, antidotoId: antilatrodectus.id } });
  }

  // 5. Violinista -> Anti-Loxosceles
  await prisma.animalAntidoto.create({ data: { animalId: aranaViolinista.id, antidotoId: antiloxosceles.id } });

  // 6. Soporte / Analgésico (Para todos los que duelen pero no tienen suero específico o es leve)
  for (const animal of grupoSoporte) {
    await prisma.animalAntidoto.create({ data: { animalId: animal.id, antidotoId: analgesico.id } });
  }


  // ============================================================
  // 5. CREACIÓN DE HOSPITALES
  // ============================================================
  console.log('🏥 Creando hospitales...');

  const hospitalesData = [
    { nombre: 'Hospital integral de Canatlán durango', direccion: 'Independencia y Ramón Corona #40 Zona Centro 34409 Canatlán, Dgo.', telefono: '677-872-0024', latitud: 24.52628, longitud: -104.77492, ultimaVerificacion: new Date() },
    { nombre: 'I.S.S.S.T.E Canatlán', direccion: '34455, Morelos 1013, valenzuela 34455 Canatlán, Dgo.', telefono: '677-872-0234', latitud: 24.52125, longitud: -104.77767, ultimaVerificacion: new Date() },
    { nombre: 'Cruz roja mexicana Canatlán', direccion: 'Manzanal 102, Soledad Álvarez, 34453 Canatlán, Durango.', telefono: '677-872-0202', latitud: 24.52733, longitud: -104.76657, ultimaVerificacion: new Date() },
    { nombre: 'I.M.S.S clínica 6', direccion: 'Soledad Álvarez SN, Centro, 34450, entre Alameda y Morelos. Canatlán, Durango', telefono: '677-872-0017', latitud: 24.52342, longitud: -104.77774, ultimaVerificacion: new Date() },
    { nombre: 'Canelas Centro de salud', direccion: '34500 Canelas, Durango', telefono: '674-864-0029', latitud: 25.12432, longitud: -106.54528, ultimaVerificacion: new Date() },
    { nombre: 'Coneto de comonfort Clínica nogales', direccion: 'Carretera coneteo, 34473 Nogales, Dgo.', telefono: null, latitud: 31.31656, longitud: -110.94847, ultimaVerificacion: new Date() },
    { nombre: 'Unidad medica rural IMSS #19 Coneto de Comonfort', direccion: 'Camino A Vizcaino A 500 M De La Telesecundaria , Col. Coneto De Comonfort, C.P. 34475, Durango', telefono: '800-623-2323', latitud: 25.08505, longitud: -104.77583, ultimaVerificacion: new Date() },
    { nombre: 'Hospital general de Cuencamé', direccion: 'Camino Pasaje 1, Alamedas, 35800 Cuencamé de Ceniceros, Dgo.', telefono: '671-763-0104', latitud: 24.87395, longitud: -103.70645, ultimaVerificacion: new Date() },
    { nombre: 'Centro de salud Cuencamé Dgo.', direccion: 'Primero de Mayo, Alamedas, 35800 Cuencamé de Ceniceros, Dgo.', telefono: null, latitud: 24.86999, longitud: -103.69732, ultimaVerificacion: new Date() },
    { nombre: 'Hospital regional de Cuencamé', direccion: 'Carretera A Pasaje Km 1, El Arenal, 35807 Cuencamé de Ceniceros, Dgo.', telefono: '671-763-0104', latitud: 24.87390, longitud: -103.70627, ultimaVerificacion: new Date() },
    { nombre: 'Hospital General 450 Durango', direccion: 'Blvd. José María Patoni S/N, El Ciprés, 34206 Durango, Dgo.', telefono: '618-137-3328', latitud: 24.05628, longitud: -104.64162, ultimaVerificacion: new Date() },
    { nombre: 'Cruz Roja Mexicana Urgencias Durango', direccion: 'Predio Rustico La Tinaja y Los Lugos, Blvd. José María Patoni, Impregnadora Guadiana, 34279 Durango, Dgo.', telefono: '618-817-3444', latitud: 24.04417, longitud: -104.65600, ultimaVerificacion: new Date() },
    { nombre: 'Instituto Mexicano del Seguro Social - Hospital Regional de Zona No. 1', direccion: 'Normal 2011, Predio Canoas, 34076 Durango, Dgo.', telefono: '618-811-9820', latitud: 24.02907, longitud: -104.68263, ultimaVerificacion: new Date() },
    { nombre: 'ISSSTE Hospital General Dr. Santiago Ramon y Cajal', direccion: 'Predio Canoas s/n, Colonia Obrera, Silvestre Dorador, 34070 Durango, Dgo.', telefono: '618-811-7513', latitud: 24.02939, longitud: -104.68159, ultimaVerificacion: new Date() },
    { nombre: 'Hospital integral Simón Bolívar', direccion: '35950 Gral. Simón Bolívar, Dgo.', telefono: null, latitud: 24.68317, longitud: -103.22704, ultimaVerificacion: new Date() },
    { nombre: 'ISSSTE Gómez Palacio', direccion: 'Boulevard Miguel Alemán S/N, Centro, 35000 Gómez Palacio, Dgo.', telefono: '871-714-5547', latitud: 25.55453, longitud: -103.50769, ultimaVerificacion: new Date() },
    { nombre: 'Hospital General de Gómez Palacio', direccion: 'De Las Violetas 1152, Rinconadas Bugambilias, 35010 Gómez Palacio, Dgo.', telefono: '871-715-6617', latitud: 25.59147, longitud: -103.48466, ultimaVerificacion: new Date() },
    { nombre: 'IMSS Hospital General de Zona Número 51', direccion: 'Calle María Esther Galarza No. 222 Fraccionamiento, Fidel Velásquez, Fidel Velázquez, 35025 Gómez Palacio, Dgo.', telefono: '871-719-6802', latitud: 25.57049, longitud: -103.52182, ultimaVerificacion: new Date() },
    { nombre: 'IMSS HGZ No.46', direccion: 'Calz. J. Agustín Castro, Cerro de La Cruz, Revolución, 35000 Gómez Palacio, Dgo.', telefono: '729-293-2131', latitud: 25.55757, longitud: -103.50585, ultimaVerificacion: new Date() },
    { nombre: 'Hospital Rural No. 26 IMSS Bienestar', direccion: 'Niños Heroes de Chapultepec SN-S Zona Centro 34700 Guadalupe Victoria Dgo.', telefono: null, latitud: 24.43901, longitud: -104.12197, ultimaVerificacion: new Date() },
    { nombre: 'Centro De Salud De Inde', direccion: '35500 Indé, Dgo.', telefono: null, latitud: 25.91578, longitud: -105.22334, ultimaVerificacion: new Date() },
    { nombre: 'Hospital general de lerdo', direccion: 'Periférico Gómez-Lerdo Km 12+500 S/N Col. Prudencia Jauregui 35150 Libramiento Rentería S/N Entre Prolongación Durango Y Prolongación Zacatecas', telefono: '871-725-0722', latitud: 25.53191, longitud: -103.53273, ultimaVerificacion: new Date() },
    { nombre: 'Cruz Roja Mexicana Delegación Lerdo', direccion: 'C. Gpe. Victoria, Las Brisas, 35153 Lerdo, Dgo.', telefono: '871-298-3911', latitud: 25.52365, longitud: -103.52789, ultimaVerificacion: new Date() },
    { nombre: 'IMSS Bermejillo', direccion: 'Carr. Torreon - Jiménez 85, Bermejillo, 35230 Bermejillo, Dgo.', telefono: null, latitud: 25.88378, longitud: -103.62032, ultimaVerificacion: new Date() },
    { nombre: 'IMSS 45 Mapimí', direccion: 'Calle G. PACHECO Colonia CENTRO Mapimí, cp 35200', telefono: null, latitud: 25.83302, longitud: -103.84851, ultimaVerificacion: new Date() },
    { nombre: 'Hospital integral del mezquital', direccion: 'Calle Principal 325, San Francisco del Mezquital, 34970 Mezquital, Dgo.', telefono: '675-884-4011', latitud: 23.47685, longitud: -104.39214, ultimaVerificacion: new Date() },
    { nombre: 'Hospital Integral de Nazas, Dgo', direccion: 'Nazas, Durango (cerrado)', telefono: null, latitud: 25.22500, longitud: -104.10000, ultimaVerificacion: new Date() },
    { nombre: 'CRUZ ROJA MEXICANA N. DE DIOS, DGO.', direccion: 'Carretera Panamericana, 34843 Nombre de Dios, Dgo.', telefono: '675-871-7041', latitud: 23.84397, longitud: -104.22520, ultimaVerificacion: new Date() },
    { nombre: 'Hospital Las Nieves', direccion: 'Carr. Panamericana KM 333, 35381 Villa las Nieves, Dgo.', telefono: '649-547-0474', latitud: 26.40477, longitud: -105.38120, ultimaVerificacion: new Date() },
    { nombre: 'Hospital General El Oro', direccion: 'Sertoma LB, Centro, 35690 Santa María del Oro, Dgo.', telefono: null, latitud: 25.95596, longitud: -105.36644, ultimaVerificacion: new Date() },
    { nombre: 'Hospital Integral "Peñon Blanco"', direccion: 'DGO 316, 34764 Puerto Peñasco, Dgo.', telefono: null, latitud: 24.78862, longitud: -104.02269, ultimaVerificacion: new Date() },
    { nombre: 'Cruz roja mexicana villa unión', direccion: 'Juárez 603, PUEBLO NUEVO, 34800 Villa Unión, Dgo.', telefono: '675-867-1632', latitud: 23.97458, longitud: -104.05242, ultimaVerificacion: new Date() },
    { nombre: 'Hospital Integral Villa Union', direccion: '20 de Noviembre 10, LA COLONIA, 34800 Villa Unión, Dgo.', telefono: '675-867-0020', latitud: 23.98278, longitud: -104.04340, ultimaVerificacion: new Date() },
    { nombre: 'Cruz Roja Mexicana delegación El Salto', direccion: 'Ferrocarril s/n, Ferrocarril 628, Juarez, Juárez, 34471 El Salto, Dgo.', telefono: '675-876-0895', latitud: 23.78009, longitud: -105.36198, ultimaVerificacion: new Date() },
    { nombre: 'Hospital integral regional El Salto', direccion: 'Durango-Mazatlán Kilómetro 99, El Brillante, 34950 Durango, Dgo. (localidad el salto)', telefono: '675-876-5512', latitud: 23.78819, longitud: -105.34764, ultimaVerificacion: new Date() },
    { nombre: 'IMSS HGP Rodeo', direccion: 'Panamericana, 35760 Rodeo, Dgo.', telefono: null, latitud: 25.16976, longitud: -104.55429, ultimaVerificacion: new Date() },
    { nombre: 'Hospital integral san juan del rio', direccion: 'La Eta, 34485 San Juan del Río, Dgo.', telefono: '677-866-0378', latitud: 24.78355, longitud: -104.47129, ultimaVerificacion: new Date() },
    { nombre: 'Hospital General de Santiago', direccion: 'Baca Ortiz 506, Lomas de San Juan, 34635 Santiago Papasquiaro, Dgo.', telefono: '674-862-3248', latitud: 25.04367, longitud: -105.42297, ultimaVerificacion: new Date() },
    { nombre: 'Hospital integral súchil', direccion: 'Av Ferrocarril 301, Centro, 34800 Súchil, Dgo.', telefono: '675-875-0208', latitud: 23.61666, longitud: -103.92410, ultimaVerificacion: new Date() },
    { nombre: 'Hospital Integral Tamazula Durango', direccion: 'Gral. Carlos Real Félix, 34580 Tamazula de Victoria, Dgo.', telefono: '667-430-2002', latitud: 24.97223, longitud: -106.96729, ultimaVerificacion: new Date() },
    { nombre: 'I.M.S.S. Clínica Número 42', direccion: 'Guanaceví Kilómetro 1, Col del Valle, 35600 Santa Catarina de Tepehuanes, Dgo.', telefono: '674-863-0314', latitud: 25.34053, longitud: -105.72552, ultimaVerificacion: new Date() },
    { nombre: 'CENTRO DE SALUD TLAHUALILO', direccion: 'Francisco I. Madero SN-S COMITE DEL PRI, Centro, 35290 Tlahualilo de Zaragoza, Dgo.', telefono: null, latitud: 26.10965, longitud: -103.43989, ultimaVerificacion: new Date() },
    { nombre: 'Unidad de medicina familiar No 13 Tlahualilo', direccion: 'Dalias 437, Secc 1339, Las Colonias, 35257 Tlahualilo de Zaragoza, Dgo.', telefono: '872-761-0191', latitud: 26.10182, longitud: -103.44341, ultimaVerificacion: new Date() },
    { nombre: 'ISSSTE C.M.F. TLAHUALILO DE ZARAGOZA', direccion: 'Aguascalientes 142, Zaragoza, 35257 Tlahualilo de Zaragoza, Dgo.', telefono: null, latitud: 26.10477, longitud: -103.43906, ultimaVerificacion: new Date() },
    { nombre: 'IMSS. Hospital Rural de Solidaridad (Oportunidades)', direccion: 'Carretera a Suchil km. 1.5, José Guadalupe Rodríguez, 34894 Vicente Guerrero, Dgo.', telefono: '675-865-0362', latitud: 23.71938, longitud: -103.97489, ultimaVerificacion: new Date() },
    { nombre: 'Cruz Roja Mexicana, Vicente Guerrero', direccion: 'Zona Centro, 34892 Vicente Guerrero, Dgo.', telefono: '675-865-0850', latitud: 23.73798, longitud: -103.98354, ultimaVerificacion: new Date() },
    { nombre: 'Centro de Salud Vicente Guerrero', direccion: 'Vicente Guerrero SN-S, San Antonio, 34892 Vicente Guerrero, Dgo.', telefono: '675-865-0158', latitud: 23.73857, longitud: -103.98389, ultimaVerificacion: new Date() },
    { nombre: 'Hospital Integral de Nuevo Ideal', direccion: 'Guadalupe Victoria, La Magdalena, 34420 Nuevo Ideal, Dgo.', telefono: null, latitud: 24.88156, longitud: -105.06567, ultimaVerificacion: new Date() },
    { nombre: 'Cruz Roja Mexicana Delegación Nuevo Ideal', direccion: 'Av. Miguel Aleman 712, Zona Centro, 34422 Nuevo Ideal, Dgo.', telefono: '677-873-0102', latitud: 24.88586, longitud: -105.07449, ultimaVerificacion: new Date() },
    { nombre: 'Instituto Mexicano del Seguro Social Nuevo Ideal', direccion: '20 de Noviembre s/n, Zona Centro, 34410 Nuevo Ideal, Dgo.', telefono: '677-873-0049', latitud: 24.88789, longitud: -105.07386, ultimaVerificacion: new Date() },
  ];

  await prisma.hospital.createMany({
    data: hospitalesData,
  });

  // ============================================================
  // 6. INVENTARIO DE HOSPITALES (Lógica Inteligente)
  // ============================================================
  console.log('📦 Distribuyendo inventario a hospitales...');
  
  // Recuperamos los hospitales con sus nuevos IDs
  const hospitalesCreados = await prisma.hospital.findMany();
  
  const inventarioData: any[] = [];
  
  // Función helper para stock aleatorio
  const randomStock = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  hospitalesCreados.forEach((hospital) => {
    // 1. TODOS tienen Antialacrán (Muy común en Durango)
    inventarioData.push({
      hospitalId: hospital.id,
      antidotoId: antialacran.id,
      stock: randomStock(10, 50),
    });

    // 2. TODOS tienen Analgésico
    inventarioData.push({
      hospitalId: hospital.id,
      antidotoId: analgesico.id,
      stock: randomStock(50, 100),
    });

    // 3. Distribución aleatoria de antídotos caros/específicos
    // Solo el 60% de hospitales tiene antiviperino
    if (Math.random() > 0.4) {
      inventarioData.push({
        hospitalId: hospital.id,
        antidotoId: antiviperino.id,
        stock: randomStock(2, 10),
      });
    }

    // Solo el 40% tiene para Coralillo
    if (Math.random() > 0.6) {
      inventarioData.push({
        hospitalId: hospital.id,
        antidotoId: anticoralillo.id,
        stock: randomStock(1, 5),
      });
    }
    
    // Solo el 50% tiene para Viuda Negra (Latrodectus)
    if (Math.random() > 0.5) {
      inventarioData.push({
        hospitalId: hospital.id,
        antidotoId: antilatrodectus.id,
        stock: randomStock(2, 8),
      });
    }

    // Solo el 50% tiene para Violinista (Loxosceles)
    if (Math.random() > 0.5) {
      inventarioData.push({
        hospitalId: hospital.id,
        antidotoId: antiloxosceles.id,
        stock: randomStock(2, 8),
      });
    }
  });

  await prisma.hospitalAntidoto.createMany({
    data: inventarioData,
  });

  // ============================================================
  // 7. USUARIO DEMO Y TEST
  // ============================================================
  const usuarioDemo = await prisma.user.create({
    data: {
      name: 'Estudiante Demo',
      email: 'demo@aracnoscan.com',
    },
  });

  // Usuario desbloquea un Alacrán por defecto
  await prisma.animalDesbloqueado.create({
    data: {
      usuarioId: usuarioDemo.id,
      animalId: alacranDurango.id,
    },
  });

  // ============================================================
  // 8. FAQs (PREGUNTAS FRECUENTES)
  // ============================================================
  console.log('❓ Insertando FAQs...');
  
  const faqsData = [
    {
      pregunta: "¿Qué tipo de animales puedo identificar con WEEBIL?",
      respuesta: "WEEBIL está diseñado para identificar arácnidos peligrosos (alacranes, arañas), insectos de importancia médica (como abejas, avispas, garrapatas) y otros animales venenosos como serpientes, priorizando la evaluación de riesgo."
    },
    {
      pregunta: "¿Necesito crear una cuenta para usar la aplicación?",
      respuesta: "No, puedes acceder y usar la funcionalidad de detección y localización de tratamiento sin crear una cuenta."
    },
    {
      pregunta: "¿Qué beneficios obtengo al crear una cuenta (Google/Correo)?",
      respuesta: "Al crear una cuenta, la aplicación guardará tu historial de detecciones y consultas para que puedas revisarlas posteriormente."
    },
    {
      pregunta: "¿Cómo subo una foto para la detección por IA?",
      respuesta: "Solo tienes que tomar una foto clara del animal o de la lesión/picadura directamente desde la aplicación o subir una imagen de tu galería para que la IA la analice."
    },
    {
      pregunta: "¿Qué información obtengo después de que la IA detecta un animal?",
      respuesta: "Recibirás una advertencia de peligro, el nombre científico del animal, recomendaciones médicas de primeros auxilios, información general del animal, y el porcentaje de confiabilidad de la detección por IA."
    },
    {
      pregunta: "¿Qué tan precisa es la detección de la IA?",
      respuesta: "La precisión depende de la calidad de la imagen que proporciones (enfoque, iluminación). La aplicación te mostrará un porcentaje de confiabilidad de la detección."
    },
    {
      pregunta: "¿Puedo subir una foto de la picadura/lesión en lugar del animal?",
      respuesta: "Sí, la IA está diseñada para la clasificación precisa de la especie arácnida y la evaluación del nivel de riesgo de la lesión a partir de imágenes."
    },
    {
      pregunta: "Si WEEBIL me indica que un animal es peligroso, ¿debo ir inmediatamente al hospital?",
      respuesta: "Sí, la aplicación proporciona una evaluación preliminar del riesgo. Si el resultado indica peligro, debes seguir las recomendaciones de primeros auxilios y buscar asistencia médica inmediata."
    },
    {
      pregunta: "¿WEEBIL reemplaza el diagnóstico de un médico?",
      respuesta: "No. WEEBIL es una herramienta de apoyo para la clasificación de riesgo, no un diagnóstico clínico oficial. El veredicto y tratamiento final son responsabilidad del personal médico."
    },
    {
      pregunta: "¿Cómo me ayuda WEEBIL en una emergencia?",
      respuesta: "WEEBIL proporciona una evaluación preliminar del riesgo y facilita la localización inmediata de centros de salud que tienen el antiveneno específico disponible, optimizando el traslado del paciente."
    },
    {
      pregunta: "¿Qué son las 'recomendaciones médicas' que proporciona WEEBIL?",
      respuesta: "Son protocolos de primeros auxilios validados que debes seguir mientras buscas atención médica especializada."
    },
    {
      pregunta: "¿Qué es el 'Bestiario' interactivo?",
      respuesta: "Es un Bestiario regional con datos validados e información sobre especies peligrosas de Durango. Las especies se 'descubren' al ser fotografiadas y validadas por la IA."
    },
    {
      pregunta: "¿La localización de hospitales abarca todo México?",
      respuesta: "No. La información de geolocalización de antídoto y el Bestiario se limitarán al estado de Durango, México."
    },
    {
      pregunta: "¿Por qué es tan importante la localización del antiveneno?",
      respuesta: "La aplicación busca reducir los tiempos de respuesta y optimizar la referencia de pacientes a hospitales con disponibilidad del antídoto, ya que la falta de conocimiento y la pérdida de tiempo resultan en un retraso vital en la administración del tratamiento específico."
    },
    {
      pregunta: "¿El riesgo por picaduras es realmente un problema de salud pública en Durango?",
      respuesta: "Sí. Durango enfrenta un desafío de salud pública por la alta prevalencia de fauna arácnida de importancia médica, y se mantiene consistentemente entre los estados con mayor número de picaduras de alacrán. En 2023, se registraron más de 13,000 casos de intoxicación por picadura de alacrán en el estado."
    }
  ];

  await prisma.faq.createMany({
    data: faqsData,
  });

  console.log(`✅ Master Seed completado exitosamente.`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });