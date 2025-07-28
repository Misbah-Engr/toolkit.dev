/*
  Warnings:

  - You are about to drop the `ToolUsage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ToolUsage";

-- CreateTable
CREATE TABLE "Toolkit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Toolkit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "toolkitId" TEXT NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_toolkitId_fkey" FOREIGN KEY ("toolkitId") REFERENCES "Toolkit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
