-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "animales" (
    "id" SERIAL NOT NULL,
    "nombreComun" TEXT NOT NULL,
    "nombreCientifico" TEXT,
    "esVenenoso" BOOLEAN,
    "descripcion" TEXT,
    "habitat" TEXT,
    "primerosAuxilios" TEXT,
    "rutaImagenCard" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animales_desbloqueados" (
    "usuarioId" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,
    "desbloqueadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "animales_desbloqueados_pkey" PRIMARY KEY ("usuarioId","animalId")
);

-- CreateTable
CREATE TABLE "antidotos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "antidotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animales_antidotos" (
    "animalId" INTEGER NOT NULL,
    "antidotoId" INTEGER NOT NULL,

    CONSTRAINT "animales_antidotos_pkey" PRIMARY KEY ("animalId","antidotoId")
);

-- CreateTable
CREATE TABLE "hospitales" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "ultimaVerificacion" TIMESTAMP(3),
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hospitales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitales_antidotos" (
    "hospitalId" INTEGER NOT NULL,
    "antidotoId" INTEGER NOT NULL,
    "stock" INTEGER DEFAULT 0,

    CONSTRAINT "hospitales_antidotos_pkey" PRIMARY KEY ("hospitalId","antidotoId")
);

-- CreateTable
CREATE TABLE "analisis" (
    "id" SERIAL NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rutaImagen" TEXT NOT NULL,
    "latitudUsuario" DOUBLE PRECISION,
    "longitudUsuario" DOUBLE PRECISION,
    "usuarioId" TEXT,
    "guestId" TEXT,
    "animalDetectadoId" INTEGER,
    "esVenenosoDetectado" BOOLEAN,
    "descripcionIA" TEXT,
    "primerosAuxiliosIA" TEXT,
    "confianzaIA" DOUBLE PRECISION,
    "antidotoSugeridoId" INTEGER,
    "hospitalRecomendadoId" INTEGER,

    CONSTRAINT "analisis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "antidotos_nombre_key" ON "antidotos"("nombre");

-- CreateIndex
CREATE INDEX "analisis_guestId_idx" ON "analisis"("guestId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animales_desbloqueados" ADD CONSTRAINT "animales_desbloqueados_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animales_desbloqueados" ADD CONSTRAINT "animales_desbloqueados_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animales_antidotos" ADD CONSTRAINT "animales_antidotos_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "animales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animales_antidotos" ADD CONSTRAINT "animales_antidotos_antidotoId_fkey" FOREIGN KEY ("antidotoId") REFERENCES "antidotos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospitales_antidotos" ADD CONSTRAINT "hospitales_antidotos_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitales"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospitales_antidotos" ADD CONSTRAINT "hospitales_antidotos_antidotoId_fkey" FOREIGN KEY ("antidotoId") REFERENCES "antidotos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_animalDetectadoId_fkey" FOREIGN KEY ("animalDetectadoId") REFERENCES "animales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_antidotoSugeridoId_fkey" FOREIGN KEY ("antidotoSugeridoId") REFERENCES "antidotos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "analisis" ADD CONSTRAINT "analisis_hospitalRecomendadoId_fkey" FOREIGN KEY ("hospitalRecomendadoId") REFERENCES "hospitales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
