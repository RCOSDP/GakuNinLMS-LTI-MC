--- Set `name`
INSERT INTO "keywords" ("name") VALUES ('Zoom') ON CONFLICT DO NOTHING;

--- Set `A` `B`
INSERT INTO "_KeywordToTopic"
SELECT "keywords"."id" AS "A", "topics"."id" AS "B" FROM "keywords" CROSS JOIN "topics"
WHERE "keywords"."name" = 'Zoom' AND "topics"."name" LIKE '%' || (U&'\+01F4FD') || '%';
