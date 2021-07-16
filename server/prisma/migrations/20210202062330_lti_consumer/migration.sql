/*
  Warnings:

  - The migration will change the primary key for the `lti_context` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will change the primary key for the `lti_resource_link` table. If it partially fails, the table could be left without primary key constraint.
  - The migration will add a unique constraint covering the columns `[lti_consumer_id,lti_user_id]` on the table `users`. If there are existing duplicate values, the migration will fail.
  - Added the required column `consumer_id` to the `lti_context` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consumer_id` to the `lti_resource_link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lti_consumer_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users.lti_user_id_unique";

-- DropForeignKey
ALTER TABLE "lti_resource_link" DROP CONSTRAINT "lti_resource_link_context_id_fkey";

-- CreateTable
CREATE TABLE "lti_consumer" (
    "id" TEXT NOT NULL,
    "secret" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- Insert empty `lti_consumer`
INSERT INTO "lti_consumer" VALUES ('', '');

-- AlterTable
ALTER TABLE "lti_context" ADD COLUMN "consumer_id" TEXT;
ALTER TABLE "lti_resource_link" ADD COLUMN "consumer_id" TEXT;
ALTER TABLE "users" ADD COLUMN "lti_consumer_id" TEXT;

-- Set `consumer_id` and `lti_consumer_id`
UPDATE "lti_context" SET consumer_id = '';
UPDATE "lti_resource_link" SET consumer_id = '';
UPDATE "users" SET lti_consumer_id = '';

-- AlterTable
ALTER TABLE "lti_context" DROP CONSTRAINT "lti_context_pkey",
ALTER COLUMN "consumer_id" SET NOT NULL,
ADD PRIMARY KEY ("consumer_id", "id");

-- AlterTable
ALTER TABLE "lti_resource_link" DROP CONSTRAINT "lti_resource_link_pkey",
ALTER COLUMN "consumer_id" SET NOT NULL,
ADD PRIMARY KEY ("consumer_id", "id");

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "lti_consumer_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users.lti_consumer_id_lti_user_id_unique" ON "users"("lti_consumer_id", "lti_user_id");

-- AddForeignKey
ALTER TABLE "lti_context" ADD FOREIGN KEY ("consumer_id") REFERENCES "lti_consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD FOREIGN KEY ("consumer_id") REFERENCES "lti_consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD FOREIGN KEY ("consumer_id", "context_id") REFERENCES "lti_context"("consumer_id", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("lti_consumer_id") REFERENCES "lti_consumer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
