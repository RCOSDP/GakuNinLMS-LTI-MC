/*
  Warnings:

  - You are about to drop the column `type` on the `activities` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[topic_id,learner_id]` on the table `activities`. If there are existing duplicate values, the migration will fail.
  - Added the required column `total_time_ms` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "topic_id";

-- DropIndex
DROP INDEX "learner_id";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "type",
ADD COLUMN "total_time_ms" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "activities_time_ranges" (
    "activity_id" INTEGER NOT NULL,
    "start_ms" INTEGER NOT NULL,
    "end_ms" INTEGER NOT NULL,

    PRIMARY KEY ("activity_id","start_ms")
);

-- CreateIndex
CREATE UNIQUE INDEX "activities.topic_id_learner_id_unique" ON "activities"("topic_id", "learner_id");

-- AddForeignKey
ALTER TABLE "activities_time_ranges" ADD FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
