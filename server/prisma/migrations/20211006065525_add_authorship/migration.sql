-- CreateTable
CREATE TABLE "authorships" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "topic_id" INTEGER,
    "book_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_roles" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- Set `role_name`
INSERT INTO "content_roles" ("id", "role_name") VALUES (1, 'author');
INSERT INTO "content_roles" ("id", "role_name") VALUES (2, 'co-author');
INSERT INTO "content_roles" ("id", "role_name") VALUES (3, 'collaborator');
INSERT INTO "content_roles" ("id", "role_name") VALUES (4, 'editor');

-- AddForeignKey
ALTER TABLE "authorships" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorships" ADD FOREIGN KEY ("role_id") REFERENCES "content_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorships" ADD FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorships" ADD FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;
