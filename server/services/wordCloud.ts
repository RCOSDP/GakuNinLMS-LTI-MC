import type { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import authUser from "$server/auth/authUser";
import authInstructor from "$server/auth/authInstructor";
import { WordCloudSchema } from "$server/models/wordCloud";
import { WordCloudParams } from "$server/validators/wordCloudParams";
import findWordCloud from "$server/utils/wordCloud/findWordCloud";

export type Params = WordCloudParams;

export const method = {
  get: {
    summary: "ワードクラウド",
    description: outdent`
      ワードクラウドに関するデータを取得します。
      教員または管理者でなければなりません。`,
    params: WordCloudParams,
    response: {
      200: { type: "array", items: WordCloudSchema },
    },
  },
} as const;

export const hooks = {
  get: { auth: [authUser, authInstructor] },
};

export async function index({
  params,
}: FastifyRequest<{ Params: WordCloudParams }>) {
  const { bookId } = params;
  const wordCloud = findWordCloud(bookId);

  return {
    status: 200,
    body: wordCloud,
  };
}
