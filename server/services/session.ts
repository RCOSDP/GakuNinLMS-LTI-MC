import { FastifyRequest } from "fastify";
import Method from "~server/types/method";
import { schema as ltiLaunchBodySchema } from "~server/validators/ltiLaunchBody";
import { schema as userSchema } from "~server/utils/user";

export const method: Method = {
  get: {
    description: "セッション情報",
    response: {
      200: {
        description: "ltiLaunchBody",
        type: "object",
        properties: {
          ltiLaunchBody: ltiLaunchBodySchema,
          user: userSchema,
        },
      },
    },
  },
};

export default {
  async get({ session }: FastifyRequest) {
    const { ltiLaunchBody, user } = session;

    return {
      status: 200,
      body: {
        ltiLaunchBody,
        user,
      },
    };
  },
};
