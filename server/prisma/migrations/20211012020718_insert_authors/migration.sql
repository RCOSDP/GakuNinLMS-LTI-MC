-- Insert `authorships`
INSERT INTO "authorships" ("user_id", "role_id", "topic_id") SELECT "creator_id", 1, "id" FROM "topics";
INSERT INTO "authorships" ("user_id", "role_id", "book_id") SELECT "creator_id", 1, "id" FROM "books";
