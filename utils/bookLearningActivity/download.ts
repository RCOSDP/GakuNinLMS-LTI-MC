import { flatten } from "flat";
import jsonexport from "jsonexport";
import type { UserHandlers } from "jsonexport";
import { BookActivitySchema } from "$server/models/bookActivity";

const bom = "\uFEFF";

const headers: Readonly<{ [key: string]: string }> = {
  "learner.id": "ユーザID",
  "learner.name": "ユーザ名",
  "topic.id": "トピックID",
  "topic.name": "トピック名",
  totalTimeMs: "ユニーク学習時間 (ms)",
  createdAt: "初回アクセス日時",
  updatedAt: "最終アクセス日時",
  "book.id": "ブックID",
  "book.name": "ブック名",
  status: "学習状況",
};

const jsonexportHandlers: UserHandlers = {
  mapHeaders: (header) => {
    return headers[header];
  },
  typeHandlers: {
    Object: (value) => {
      if (value instanceof Date) return value.toLocaleString();
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
  const flattenData = data.map((a) =>
    Object.fromEntries(
      Object.entries(flatten(a)).filter(([key]) => {
        return Object.keys(headers).includes(key);
      })
    )
  );
  const csv = await jsonexport(flattenData, {
    ...jsonexportHandlers,
  });
  const file = new File([bom, csv], filename, { type: "text/csv" });
  const dataUrl = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = dataUrl;
  anchor.click();
}

export default download;
