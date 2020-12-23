/*
  Warnings:

  - Added the required column `content` to the `tracks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tracks" ADD COLUMN     "content" TEXT NOT NULL;
