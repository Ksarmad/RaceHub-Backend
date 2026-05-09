-- CreateTable
CREATE TABLE "results" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "finishTime" TEXT NOT NULL,
    "finishTimeMs" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "results_registrationId_key" ON "results"("registrationId");

-- AddForeignKey
ALTER TABLE "results" ADD CONSTRAINT "results_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
