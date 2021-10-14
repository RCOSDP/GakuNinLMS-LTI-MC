import type { FastifyRequest } from "fastify";
import type Method from "$server/types/method";
import { sessionSchema } from "$server/models/session";
import authUser from "$server/auth/authUser";

export const method: Method = {
  get: {
    summary: "セッション情報",
    description: "自身に関する詳細な情報を取得します。",
    response: {
      200: sessionSchema,
    },
  },
};

export const hooks = {
  get: { auth: [authUser] },
};

export async function show({ session }: FastifyRequest) {
  return {
    status: 200,
    body: session,
  };
}
