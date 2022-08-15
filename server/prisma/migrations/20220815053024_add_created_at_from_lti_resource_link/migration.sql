-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_learner_id_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_lti_consumer_id_lti_context_id_fkey";

-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "activities_time_ranges" DROP CONSTRAINT "activities_time_ranges_activity_id_fkey";

-- DropForeignKey
ALTER TABLE "authorships" DROP CONSTRAINT "authorships_role_id_fkey";

-- DropForeignKey
ALTER TABLE "authorships" DROP CONSTRAINT "authorships_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_context" DROP CONSTRAINT "lti_context_consumer_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_members" DROP CONSTRAINT "lti_members_consumer_id_context_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_members" DROP CONSTRAINT "lti_members_consumer_id_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_resource_link" DROP CONSTRAINT "lti_resource_link_book_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_resource_link" DROP CONSTRAINT "lti_resource_link_consumer_id_context_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_resource_link" DROP CONSTRAINT "lti_resource_link_consumer_id_fkey";

-- DropForeignKey
ALTER TABLE "lti_resource_link" DROP CONSTRAINT "lti_resource_link_creator_id_fkey";

-- DropForeignKey
ALTER TABLE "public_books" DROP CONSTRAINT "public_books_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public_books" DROP CONSTRAINT "public_books_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sections" DROP CONSTRAINT "sections_book_id_fkey";

-- DropForeignKey
ALTER TABLE "topic_sections" DROP CONSTRAINT "topic_sections_section_id_fkey";

-- DropForeignKey
ALTER TABLE "topic_sections" DROP CONSTRAINT "topic_sections_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_resource_id_fkey";

-- DropForeignKey
ALTER TABLE "tracks" DROP CONSTRAINT "tracks_video_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_lti_consumer_id_fkey";

-- DropForeignKey
ALTER TABLE "zoom_meetings" DROP CONSTRAINT "zoom_meetings_resource_id_fkey";

-- AlterTable
ALTER TABLE "lti_resource_link" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "zoom_meetings" ADD CONSTRAINT "zoom_meetings_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_context" ADD CONSTRAINT "lti_context_consumer_id_fkey" FOREIGN KEY ("consumer_id") REFERENCES "lti_consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_members" ADD CONSTRAINT "lti_members_consumer_id_context_id_fkey" FOREIGN KEY ("consumer_id", "context_id") REFERENCES "lti_context"("consumer_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_members" ADD CONSTRAINT "lti_members_consumer_id_user_id_fkey" FOREIGN KEY ("consumer_id", "user_id") REFERENCES "users"("lti_consumer_id", "lti_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD CONSTRAINT "lti_resource_link_consumer_id_fkey" FOREIGN KEY ("consumer_id") REFERENCES "lti_consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD CONSTRAINT "lti_resource_link_consumer_id_context_id_fkey" FOREIGN KEY ("consumer_id", "context_id") REFERENCES "lti_context"("consumer_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD CONSTRAINT "lti_resource_link_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lti_resource_link" ADD CONSTRAINT "lti_resource_link_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_books" ADD CONSTRAINT "public_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_books" ADD CONSTRAINT "public_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_sections" ADD CONSTRAINT "topic_sections_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_sections" ADD CONSTRAINT "topic_sections_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_lti_consumer_id_fkey" FOREIGN KEY ("lti_consumer_id") REFERENCES "lti_consumer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_learner_id_fkey" FOREIGN KEY ("learner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_lti_consumer_id_lti_context_id_fkey" FOREIGN KEY ("lti_consumer_id", "lti_context_id") REFERENCES "lti_context"("consumer_id", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities_time_ranges" ADD CONSTRAINT "activities_time_ranges_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorships" ADD CONSTRAINT "authorships_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorships" ADD CONSTRAINT "authorships_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "content_roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "accounts.nonce_timestamp_unique" RENAME TO "accounts_nonce_timestamp_key";

-- RenameIndex
ALTER INDEX "activities.topic_id_learner_id_lti_consumer_id_lti_context_id_u" RENAME TO "activities_topic_id_learner_id_lti_consumer_id_lti_context__key";

-- RenameIndex
ALTER INDEX "books.zoom_meeting_id_index" RENAME TO "books_zoom_meeting_id_idx";

-- RenameIndex
ALTER INDEX "keywords.name_unique" RENAME TO "keywords_name_key";

-- RenameIndex
ALTER INDEX "public_books.token_unique" RENAME TO "public_books_token_key";

-- RenameIndex
ALTER INDEX "resources.url_unique" RENAME TO "resources_url_key";

-- RenameIndex
ALTER INDEX "resources.video_id_unique" RENAME TO "resources_video_id_key";

-- RenameIndex
ALTER INDEX "sessions.sid_unique" RENAME TO "sessions_sid_key";

-- RenameIndex
ALTER INDEX "users.email_index" RENAME TO "users_email_idx";

-- RenameIndex
ALTER INDEX "users.lti_consumer_id_lti_user_id_unique" RENAME TO "users_lti_consumer_id_lti_user_id_key";

-- RenameIndex
ALTER INDEX "zoom_meetings.resource_id_unique" RENAME TO "zoom_meetings_resource_id_key";
