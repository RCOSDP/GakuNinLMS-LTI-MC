import { User } from "@prisma/client";
import jsonSchema from "$server/prisma/json-schema.json";
import { userSettingsPropSchema } from "$server/validators/userSettings";

export type UserProps = Omit<User, "id" | "settings">;

export type UserSchema = User;

const { id, ltiUserId, name, email } = jsonSchema.definitions.User.properties;
const { id: ltiConsumerId } = jsonSchema.definitions.LtiConsumer.properties;

export const userSchema = {
  type: "object",
  properties: {
    id,
    ltiConsumerId,
    ltiUserId,
    name,
    email,
    settings: userSettingsPropSchema,
  },
};
