import {
  LtiResourceLinkSchema,
  ltiResourceLinkSchema,
} from "./ltiResourceLink";
import { UserSchema } from "$server/models/user";
import { OauthClientSchema } from "./oauthClient";
import { LtiVersionSchema } from "./ltiVersion";
import { LtiUserSchema } from "./ltiUser";
import { LtiRolesSchema } from "./ltiRoles";
import { LtiResourceLinkRequestSchema } from "./ltiResourceLinkRequest";
import { LtiContextSchema } from "./ltiContext";
import { LtiLaunchPresentationSchema } from "./ltiLaunchPresentation";

/** セッション */
export type SessionSchema = {
  oauthClient: OauthClientSchema;
  ltiVersion: LtiVersionSchema;
  ltiUser: LtiUserSchema;
  ltiRoles: LtiRolesSchema;
  ltiResourceLinkRequest: LtiResourceLinkRequestSchema;
  ltiContext: LtiContextSchema;
  ltiLaunchPresentation?: LtiLaunchPresentationSchema;
  ltiResourceLink: null | LtiResourceLinkSchema;
  user: UserSchema;
};

export const sessionSchema = {
  description: "セッション情報",
  type: "object",
  required: [
    "oauthClient",
    "ltiVersion",
    "ltiUser",
    "ltiRoles",
    "ltiResourceLinkRequest",
    "ltiContext",
    "user",
  ],
  properties: {
    oauthClient: OauthClientSchema,
    ltiVersion: LtiVersionSchema,
    ltiUser: LtiUserSchema,
    ltiRoles: LtiRolesSchema,
    ltiResourceLinkRequest: LtiResourceLinkRequestSchema,
    ltiContext: LtiContextSchema,
    ltiLaunchPresentation: LtiLaunchPresentationSchema,
    ltiResourceLink: {
      ...ltiResourceLinkSchema,
      nullable: true,
    },
    user: UserSchema,
  },
  additionalProperties: false,
} as const;
