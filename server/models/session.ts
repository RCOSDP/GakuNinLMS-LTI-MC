import {
  LtiLaunchBody,
  ltiLaunchBodySchema,
} from "$server/validators/ltiLaunchBody";
import { UserSchema, userSchema } from "$server/models/user";

export type SessionScheme = {
  ltiLaunchBody: LtiLaunchBody;
  user: UserSchema;
};

export const sessionSchema = {
  description: "セッション情報",
  type: "object",
  properties: {
    ltiLaunchBody: ltiLaunchBodySchema,
    user: userSchema,
  },
};
