import { User } from "$prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";

export type UserProps = Omit<User, "id">;

const { id, ltiUserId, name } = jsonSchema.definitions.User.properties;
const schema = {
  type: "object",
  properties: { id, ltiUserId, name },
};

export default schema;
