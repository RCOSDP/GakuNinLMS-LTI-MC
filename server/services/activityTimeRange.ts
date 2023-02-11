import type { FastifyRequest } from "fastify";
import { outdent } from "outdent";
import authUser from "$server/auth/authUser";
import fetchActivityTimeRange from "$server/utils/activity/fetchActivityTimeRange";
import { ActivityTimeRangeQuery } from "$server/validators/activityTimeRangeQuery";
import { ActivityTimeRangeSchema } from "$server/models/activityTimeRange";

export type Query = ActivityTimeRangeQuery;

export const method = {
  get: {
    summary: "ビデオ視聴時間",
    description: outdent`
      学習活動IDに紐づく、ビデオ視聴済の時間を返します。
      `,
    querystring: ActivityTimeRangeQuery,
    response: {
      200: {
        description: "成功時",
        type: "array",
        items: ActivityTimeRangeSchema,
      },
    },
  },
} as const;

export const hooks = {
  get: { auth: [authUser] },
};

export async function index({
  session,
  query,
}: FastifyRequest<{ Querystring: Query }>) {
  const body = await fetchActivityTimeRange({
    session,
    activityId: query.activityId,
  });

  return { status: 200, body };
}
