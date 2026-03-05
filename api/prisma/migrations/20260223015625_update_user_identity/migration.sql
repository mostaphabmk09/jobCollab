/*
  Warnings:

  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('INDIVIDUAL', 'ENTREPRENEUR', 'INVESTOR', 'AGENCY', 'COMPANY');

-- CreateEnum
CREATE TYPE "Interest" AS ENUM ('COLLABORATION', 'FINANCEMENT', 'IMMOBILIER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userType",
ADD COLUMN     "interests" "Interest"[] DEFAULT ARRAY[]::"Interest"[],
ADD COLUMN     "profileType" "ProfileType";

-- DropEnum
DROP TYPE "UserType";
