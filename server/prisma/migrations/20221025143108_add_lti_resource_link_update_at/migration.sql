ALTER TABLE "lti_resource_link" ADD COLUMN "updated_at" TIMESTAMP(3);
UPDATE "lti_resource_link" SET updated_at = created_at;
ALTER TABLE "lti_resource_link" ALTER COLUMN "updated_at" SET NOT NULL;
