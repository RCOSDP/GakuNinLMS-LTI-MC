import { User } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";

export type UserProps = Omit<User, "id">;

export type UserSchema = User;

const { id, ltiUserId, name } = jsonSchema.definitions.User.properties;
const { id: ltiConsumerId } = jsonSchema.definitions.LtiConsumer.properties;

export const userSchema = {
  type: "object",
  properties: { id, ltiConsumerId, ltiUserId, name },
};
