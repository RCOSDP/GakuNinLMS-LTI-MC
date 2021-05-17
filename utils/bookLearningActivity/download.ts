import { flatten } from "flat";
import jsonexport from "jsonexport";
import type { UserHandlers } from "jsonexport";
import { BookActivitySchema } from "$server/models/bookActivity";

const bom = "\uFEFF";

const jsonexportHandlers: UserHandlers = {
  mapHeaders: (header) =>
    header
      .replace(/^learner\.id$/, "ユーザID")
      .replace(/^learner\.name$/, "ユーザ名")
      .replace(/^topic\.id$/, "トピックID")
      .replace(/^topic\.name$/, "トピック名")
      .replace(/^completed$/, "完了")
      .replace(/^totalTimeMs$/, "ユニーク学習時間 (ms)")
      .replace(/^createdAt$/, "初回アクセス日時")
      .replace(/^updatedAt$/, "最終アクセス日時")
      .replace(/^book\.id$/, "ブックID")
      .replace(/^book\.name$/, "ブック名")
      .replace(/^status$/, "ステータス"),
  typeHandlers: {
    Object: (value) => {
      if (value instanceof Date) return value.toISOString();
      return value;
    },
  },
};

/**
 * ブラウザーで学習分析データをCSVファイル(BOM付きUTF-8)に変換しエクスポート
 * @param data 学習分析データ
 * @param filename ダウンロードするファイル名
 */
async function download(data: BookActivitySchema[], filename: string) {
  const flattenData = data.map((a) => flatten(a));
  const csv = await jsonexport(flattenData, { ...jsonexportHandlers });
  const file = new File([bom, csv], filename, { type: "text/csv" });
  const dataUrl = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = dataUrl;
  anchor.click();
}

export default download;
