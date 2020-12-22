-- CreateTable
CREATE TABLE "resources" (
"id" SERIAL,
    "video_id" INTEGER,
    "url" TEXT NOT NULL,
    "details" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
"id" SERIAL,
    "provider_url" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracks" (
"id" SERIAL,
    "video_id" INTEGER NOT NULL,
    "kind" TEXT NOT NULL DEFAULT E'subtitles',
    "language" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topics" (
"id" SERIAL,
    "resource_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT E'ja',
    "time_required" INTEGER NOT NULL,
    "shared" BOOLEAN NOT NULL DEFAULT true,
    "creator_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lti_context" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lti_resource_link" (
    "id" TEXT NOT NULL,
    "context_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "language" TEXT NOT NULL DEFAULT E'ja',
    "time_required" INTEGER,
    "shared" BOOLEAN NOT NULL DEFAULT true,
    "author_id" INTEGER NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
"id" SERIAL,
    "book_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic_sections" (
"id" SERIAL,
    "section_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
"id" SERIAL,
    "lti_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
"id" SERIAL,
    "topic_id" INTEGER NOT NULL,
    "learner_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
"id" SERIAL,
    "nonce" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KeywordToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BookToKeyword" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "resources.url_unique" ON "resources"("url");

-- CreateIndex
CREATE UNIQUE INDEX "resources_video_id_unique" ON "resources"("video_id");

-- CreateIndex
CREATE UNIQUE INDEX "keywords.name_unique" ON "keywords"("name");

-- CreateIndex
CREATE INDEX "author_id" ON "books"("author_id");

-- CreateIndex
CREATE INDEX "book_id" ON "sections"("book_id");

-- CreateIndex
CREATE INDEX "section_id" ON "topic_sections"("section_id");

-- CreateIndex
CREATE UNIQUE INDEX "users.lti_user_id_unique" ON "users"("lti_user_id");

-- CreateIndex
CREATE INDEX "topic_id" ON "activities"("topic_id");

-- CreateIndex
CREATE INDEX "learner_id" ON "activities"("learner_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.sid_unique" ON "sessions"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "accounts.nonce_timestamp_unique" ON "accounts"("nonce", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordToTopic_AB_unique" ON "_KeywordToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordToTopic_B_index" ON "_KeywordToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookToKeyword_AB_unique" ON "_BookToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToKeyword_B_index" ON "_BookToKeyword"("B");

-- AddForeignKey
ALTER TABLE "resources" ADD FOREIGN KEY("video_id")REFERENCES "videos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD FOREIGN KEY("video_id")REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD FOREIGN KEY("resource_id")REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD FOREIGN KEY("creator_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD FOREIGN KEY("context_id")REFERENCES "lti_context"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD FOREIGN KEY("book_id")REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD FOREIGN KEY("author_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD FOREIGN KEY("book_id")REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_sections" ADD FOREIGN KEY("section_id")REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_sections" ADD FOREIGN KEY("topic_id")REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("topic_id")REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD FOREIGN KEY("learner_id")REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToTopic" ADD FOREIGN KEY("A")REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToTopic" ADD FOREIGN KEY("B")REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToKeyword" ADD FOREIGN KEY("A")REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToKeyword" ADD FOREIGN KEY("B")REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
