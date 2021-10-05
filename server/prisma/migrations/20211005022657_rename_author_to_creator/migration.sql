/*
  Warnings:

  - You are about to rename the `author_id` column of the `books` table to `creator_id`.
  - You are about to rename the `author_id` column of the `lti_resource_link` table to `creator_id`.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_resource_link" DROP CONSTRAINT "lti_resource_link_author_id_fkey";

-- DropIndex
DROP INDEX "author_id";

-- AlterTable
ALTER TABLE "books" RENAME COLUMN "author_id" TO "creator_id";

-- AlterTable
ALTER TABLE "lti_resource_link" RENAME COLUMN "author_id" TO "creator_id";

-- CreateIndex
CREATE INDEX "creator_id" ON "books"("creator_id");

-- AddForeignKey
ALTER TABLE "books" ADD FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
