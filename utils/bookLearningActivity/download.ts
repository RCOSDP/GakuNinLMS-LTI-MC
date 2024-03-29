import json2csv from "json2csv";
import getLocaleEntries from "./getLocaleEntries";
import type { BookActivitySchema } from "$server/models/bookActivity";
import type { SessionSchema } from "$server/models/session";

const bom = "\uFEFF";

/**
 * ブラウザーで学習分析データをCSVファイル(BOM付きUTF-8)に変換しエクスポート
 * @param data 学習分析データ
 * @param filename ダウンロードするファイル名
 * @param session 教員のセッション
 */
async function download(
  data: BookActivitySchema[],
  filename: string,
  session: SessionSchema
) {
  if (data.length === 0) return;
  const decoratedData = data.map((a) =>
    Object.fromEntries(getLocaleEntries(a, session))
  );
  const csv = json2csv.parse(decoratedData);
  const file = new File([bom, csv], filename, { type: "text/csv" });
  const dataUrl = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = dataUrl;
  anchor.click();
}

export default download;
