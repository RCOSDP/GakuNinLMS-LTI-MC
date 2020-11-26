import jsonSchema from "$server/prisma/json-schema.json";

const { id, ltiUserId, name } = jsonSchema.definitions.User.properties;
const schema = {
  type: "object",
  properties: { id, ltiUserId, name },
};

export default schema;
