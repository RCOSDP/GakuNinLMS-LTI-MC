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
  },
  additionalProperties: false,
} as const;

/** 利用者 */
export type UserSchema = FromSchema<typeof UserSchema>;
