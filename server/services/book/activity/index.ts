import { outdent } from "outdent";
import type { BookParams} from "$server/validators/bookParams";
import { bookParamsSchema } from "$server/validators/bookParams";
import type { SessionSchema } from "$server/models/session";
import { ActivitySchema } from "$server/models/activity";
import authUser from "$server/auth/authUser";
import fetchActivity from "$server/utils/activity/fetchActivity";

export type Params = BookParams;

const indexSchema = {
  summary: "学習状況の取得",
  description: outdent`
    現在のセッションの学習状況の詳細を取得します。
    自身以外の学習者の学習状況を取得することはできません。`,
  params: bookParamsSchema,
  response: {
    200: {
      type: "object",
      properties: {
        activity: { type: "array", items: ActivitySchema },
      },
      required: ["activity"],
    },
  },
};

const indexHooks = {
  auth: [authUser],
};

async function index({
  session,
  params,
}: {
  session: SessionSchema;
  params: BookParams;
}) {
  const activity: Array<ActivitySchema> = await fetchActivity(
    session.user.id,
    params.book_id
  );
  return { status: 200, body: { activity } };
}

export const method = {
  get: indexSchema,
};

export const hooks = {
  get: indexHooks,
};

export { index };
