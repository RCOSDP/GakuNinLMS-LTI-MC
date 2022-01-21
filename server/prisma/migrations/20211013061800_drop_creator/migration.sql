/*
  Warnings:

  - You are about to drop the column `creator_id` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `creator_id` on the `topics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_creator_id_fkey";

-- DropIndex
DROP INDEX "creator_id";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "creator_id";

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "creator_id";
