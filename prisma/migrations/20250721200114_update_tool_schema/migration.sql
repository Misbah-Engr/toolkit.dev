/*
  Warnings:

  - The primary key for the `Tool` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Tool` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Toolkit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tool" DROP CONSTRAINT "Tool_pkey",
DROP COLUMN "name",
ADD CONSTRAINT "Tool_pkey" PRIMARY KEY ("id", "toolkitId");

-- AlterTable
ALTER TABLE "Toolkit" DROP COLUMN "name";
