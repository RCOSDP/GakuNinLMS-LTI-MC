-- CreateTable
CREATE TABLE "lti_members" (
    "consumer_id" TEXT NOT NULL,
    "context_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    PRIMARY KEY ("consumer_id","context_id","user_id")
);

-- AddForeignKey
ALTER TABLE "lti_members" ADD FOREIGN KEY ("consumer_id", "context_id") REFERENCES "lti_context"("consumer_id", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_members" ADD FOREIGN KEY ("consumer_id", "user_id") REFERENCES "users"("lti_consumer_id", "lti_user_id") ON DELETE CASCADE ON UPDATE CASCADE;
