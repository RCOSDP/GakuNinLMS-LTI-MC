<<<<<<< HEAD
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
=======
import type { User } from "@prisma/client";
import type { FromSchema } from "json-schema-to-ts";

export type UserProps = Omit<User, "id" | "settings">;

/** 利用者 */
export const UserSchema = {
  type: "object",
  required: ["id", "ltiConsumerId", "ltiUserId", "name"],
  properties: {
    id: { type: "integer" },
    ltiConsumerId: { type: "string" },
    ltiUserId: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
  },
  additionalProperties: false,
} as const;

/** 利用者 */
export type UserSchema = FromSchema<typeof UserSchema>;
>>>>>>> main
