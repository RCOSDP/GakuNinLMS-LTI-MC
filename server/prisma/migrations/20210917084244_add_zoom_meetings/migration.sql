-- CreateTable
CREATE TABLE "zoom_meetings" (
    "id" BIGINT NOT NULL,
    "resource_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "zoom_meetings.resource_id_unique" ON "zoom_meetings"("resource_id");

-- AddForeignKey
ALTER TABLE "zoom_meetings" ADD FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
