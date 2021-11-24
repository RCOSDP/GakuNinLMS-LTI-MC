--- Set `name`
INSERT INTO "keywords" ("name") VALUES ('Zoom') ON CONFLICT DO NOTHING;

--- Set `A` `B`
INSERT INTO "_KeywordToTopic"
SELECT "keywords"."id" AS "A", "topics"."id" AS "B" FROM "keywords", "topics"
WHERE "keywords"."name" LIKE 'Zoom' AND "topics"."name" LIKE E'\U0001F4FD%';
