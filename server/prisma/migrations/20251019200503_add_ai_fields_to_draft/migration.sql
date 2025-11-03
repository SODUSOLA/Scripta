-- AlterTable
ALTER TABLE "Draft" ADD COLUMN     "generated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tone" TEXT;
