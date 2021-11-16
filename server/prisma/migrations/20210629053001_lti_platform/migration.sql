-- AlterTable
ALTER TABLE "lti_consumer" ADD COLUMN     "platform_id" TEXT,
ALTER COLUMN "secret" SET DEFAULT E'';

-- CreateTable
CREATE TABLE "lti_platform" (
    "issuer" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,

    PRIMARY KEY ("issuer")
);

-- AddForeignKey
ALTER TABLE "lti_consumer" ADD FOREIGN KEY ("platform_id") REFERENCES "lti_platform"("issuer") ON DELETE SET NULL ON UPDATE CASCADE;
