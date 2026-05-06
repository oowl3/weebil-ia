/*
  Warnings:

  - You are about to drop the column `esVenenoso` on the `animales` table. All the data in the column will be lost.
  - You are about to drop the column `rutaImagenCard` on the `animales` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `analisis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "analisis" DROP CONSTRAINT "analisis_animalDetectadoId_fkey";

-- DropForeignKey
ALTER TABLE "analisis" DROP CONSTRAINT "analisis_antidotoSugeridoId_fkey";

-- DropForeignKey
ALTER TABLE "analisis" DROP CONSTRAINT "analisis_hospitalRecomendadoId_fkey";

-- DropForeignKey
ALTER TABLE "analisis" DROP CONSTRAINT "analisis_usuarioId_fkey";

-- AlterTable
ALTER TABLE "animales" DROP COLUMN "esVenenoso",
DROP COLUMN "rutaImagenCard",
ADD COLUMN     "categoria" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "peligrosidad" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "rutaImagen" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified",
DROP COLUMN "image";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- DropTable
DROP TABLE "analisis";

-- CreateTable
CREATE TABLE "usuario_tokens" (
    "id" BIGSERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "usuario_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" SERIAL NOT NULL,
    "pregunta" TEXT NOT NULL,
    "respuesta" TEXT NOT NULL,
    "orden" INTEGER DEFAULT 0,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_tokens_token_key" ON "usuario_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_tokens_usuarioId_key" ON "usuario_tokens"("usuarioId");

-- AddForeignKey
ALTER TABLE "usuario_tokens" ADD CONSTRAINT "usuario_tokens_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
