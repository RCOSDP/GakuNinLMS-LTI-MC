import {
  LtiLaunchBody,
  ltiLaunchBodySchema,
} from "$server/validators/ltiLaunchBody";
import {
  LtiResourceLinkSchema,
  ltiResourceLinkSchema,
} from "./ltiResourceLink";
import { UserSchema, userSchema } from "$server/models/user";

export type SessionScheme = {
  ltiLaunchBody: LtiLaunchBody;
  ltiResourceLink: null | LtiResourceLinkSchema;
  user: UserSchema;
};

export const sessionSchema = {
  description: "セッション情報",
  type: "object",
  properties: {
    ltiLaunchBody: ltiLaunchBodySchema,
    ltiResourceLink: {
      ...ltiResourceLinkSchema,
      nullable: true,
    },
    user: userSchema,
  },
};
