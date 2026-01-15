/*
  Warnings:

  - You are about to drop the column `ageMax` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `ageMin` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ageMax",
DROP COLUMN "ageMin";
