/*
  Warnings:

  - Added the required column `author_id` to the `lti_resource_link` table without a default value. This is not possible if the table is not empty.

*/
-- DeleteRows
DELETE FROM "lti_resource_link";

-- AlterTable
ALTER TABLE "lti_resource_link" ADD COLUMN "author_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
