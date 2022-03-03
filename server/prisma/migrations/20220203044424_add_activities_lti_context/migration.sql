/*
  Warnings:

  - A unique constraint covering the columns `[topic_id,learner_id,lti_consumer_id,lti_context_id]` on the table `activities` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "activities.topic_id_learner_id_unique";

-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "lti_consumer_id" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "lti_context_id" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "activities.topic_id_learner_id_lti_consumer_id_lti_context_id_unique" ON "activities"("topic_id", "learner_id", "lti_consumer_id", "lti_context_id");

-- Insert empty `lti_context`
INSERT INTO "lti_context" ("consumer_id", "id", "title", "label")
VALUES ('', '', '', '')
ON CONFLICT DO NOTHING;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY ("lti_consumer_id", "lti_context_id") REFERENCES "lti_context"("consumer_id", "id") ON DELETE CASCADE ON UPDATE CASCADE;
