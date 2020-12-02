import { FastifyRequest } from "fastify";
import Method from "$server/types/method";
import { sessionSchema } from "$server/models/session";

export const method: Method = {
  get: {
    description: "セッション情報",
    response: {
      200: sessionSchema,
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
