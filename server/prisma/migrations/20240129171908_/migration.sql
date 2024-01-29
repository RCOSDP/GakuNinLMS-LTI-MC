/*
  Warnings:

  - A unique constraint covering the columns `[lti_consumer_id,lti_context_id,tag_id,memo_id,user_id,topic_id]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memo_id` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Bookmark_lti_consumer_id_lti_context_id_tag_id_user_id_topi_key";

-- AlterTable
ALTER TABLE "Bookmark" ADD COLUMN     "memo_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Memo" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,

    CONSTRAINT "Memo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Memo_label_key" ON "Memo"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_lti_consumer_id_lti_context_id_tag_id_memo_id_user_key" ON "Bookmark"("lti_consumer_id", "lti_context_id", "tag_id", "memo_id", "user_id", "topic_id");

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_memo_id_fkey" FOREIGN KEY ("memo_id") REFERENCES "Memo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
