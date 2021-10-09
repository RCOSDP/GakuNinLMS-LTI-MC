-- CreateTable
CREATE TABLE "zoom_meetings" (
    "uuid" TEXT NOT NULL,
    "resource_id" INTEGER NOT NULL,

    PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "zoom_meetings.resource_id_unique" ON "zoom_meetings"("resource_id");

-- AddForeignKey
ALTER TABLE "zoom_meetings" ADD FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;
