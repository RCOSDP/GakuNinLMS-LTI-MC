import { flatten } from "flat";
import { fromMs } from "hh-mm-ss";
import learningStatusLabel from "$utils/learningStatusLabel";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { SessionSchema } from "$server/models/session";

export const keyOrder = [
  "learner.id",
  "learner.name",
  "ltiLaunchBody.context_label",
  "ltiLaunchBody.context_title",
  "book.id",
  "book.name",
  "topic.id",
  "topic.name",
  "totalTimeMs",
  "status",
  "createdAt",
  "updatedAt",
] as const;

export const label: Readonly<{ [key in typeof keyOrder[number]]: string }> = {
  "learner.id": "ユーザID",
  "learner.name": "ユーザ名",
  "ltiLaunchBody.context_label": "コースID",
  "ltiLaunchBody.context_title": "コース名",
  "book.id": "ブックID",
  "book.name": "ブック名",
  "topic.id": "トピックID",
  "topic.name": "トピック名",
  totalTimeMs: "ユニーク視聴時間",
  status: "学習状況",
  createdAt: "初回アクセス",
  updatedAt: "最終アクセス",
};

/**
 * 単一の学習分析データをローカライズしたキーバリューに変換
 * @param activity 単一の学習分析データ
 * @param ltiLaunchBody 教員のセッション
 */
export function getLocaleEntries(
  activity: BookActivitySchema,
  ltiLaunchBody?: SessionSchema["ltiLaunchBody"]
) {
  const flattenActivity: Record<typeof keyOrder[number], unknown> = flatten({
    ...activity,
    ltiLaunchBody,
  });
  const a = {
    ...flattenActivity,
    totalTimeMs: fromMs(activity.totalTimeMs ?? 0, "hh:mm:ss.sss"),
    status: learningStatusLabel[activity.status],
    createdAt: activity.createdAt?.toLocaleString(),
    updatedAt: activity.updatedAt?.toLocaleString(),
  };
  return keyOrder.map((key) => [label[key], a[key]]);
}

export default getLocaleEntries;
