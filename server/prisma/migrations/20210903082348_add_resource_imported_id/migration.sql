-- AlterTable
ALTER TABLE "resources" ADD COLUMN     "imported_id" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE INDEX "resources.imported_id_index" ON "resources"("imported_id");
