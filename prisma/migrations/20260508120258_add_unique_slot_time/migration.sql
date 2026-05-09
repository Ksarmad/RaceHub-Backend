/*
  Warnings:

  - A unique constraint covering the columns `[slotTime]` on the table `timeslots` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "timeslots_slotTime_key" ON "timeslots"("slotTime");
