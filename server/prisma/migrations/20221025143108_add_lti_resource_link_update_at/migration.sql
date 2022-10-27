-- AlterTable
ALTER TABLE "lti_resource_link" ADD COLUMN "updated_at" TIMESTAMP(3) NOT NULL;

-- Set `created_at` to `updated_at`
UPDATE "lti_resource_link" SET updated_at = created_at;
