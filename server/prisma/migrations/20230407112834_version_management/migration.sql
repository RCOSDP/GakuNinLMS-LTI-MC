-- CreateTable
CREATE TABLE "release" (
    "book_id" INTEGER NOT NULL,
    "released_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT NOT NULL DEFAULT '0.0.0',
    "comment" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "release_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "node" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "root_id" INTEGER,

    CONSTRAINT "node_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "release" ADD CONSTRAINT "release_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "node" ADD CONSTRAINT "node_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "node" ADD CONSTRAINT "node_root_id_fkey" FOREIGN KEY ("root_id") REFERENCES "node"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert node to existing books
INSERT INTO "node" ("id") SELECT "id" FROM "books";

-- Set node id sequence value
SELECT setval('node_id_seq', COALESCE((SELECT MAX(id)+1 FROM "books"), 1), false);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_id_fkey" FOREIGN KEY ("id") REFERENCES "node"("id") ON DELETE CASCADE ON UPDATE CASCADE;
