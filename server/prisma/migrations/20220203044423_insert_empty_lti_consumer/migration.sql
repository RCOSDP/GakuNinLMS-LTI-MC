-- Insert empty `lti_consumer`
INSERT INTO "lti_consumer" ("id", "secret")
VALUES ('', '')
ON CONFLICT DO NOTHING;
