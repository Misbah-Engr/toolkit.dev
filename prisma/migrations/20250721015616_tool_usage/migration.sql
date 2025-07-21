-- CreateTable
CREATE TABLE "ToolUsage" (
    "toolkit" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToolUsage_pkey" PRIMARY KEY ("toolkit","tool")
);
