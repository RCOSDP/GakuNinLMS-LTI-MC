/*
  Warnings:

  - You are about to rename the `author_id` column of the `books` table to `creator_id`.
  - You are about to rename the `author_id` column of the `lti_resource_link` table to `creator_id`.

*/
-- RenameForeignKey
ALTER TABLE "books" RENAME CONSTRAINT "books_author_id_fkey" TO "books_creator_id_fkey";

-- RenameForeignKey
ALTER TABLE "lti_resource_link" RENAME CONSTRAINT "lti_resource_link_author_id_fkey" TO "lti_resource_link_creator_id_fkey";

-- AlterIndex
ALTER INDEX "author_id" RENAME TO "creator_id";

-- AlterTable
ALTER TABLE "books" RENAME COLUMN "author_id" TO "creator_id";

-- AlterTable
ALTER TABLE "lti_resource_link" RENAME COLUMN "author_id" TO "creator_id";
