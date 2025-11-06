-- CreateTable
CREATE TABLE "Scenario" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "publicSlug" TEXT,
    "createdBy" TEXT,

    CONSTRAINT "Scenario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scenario_publicSlug_key" ON "Scenario"("publicSlug");
