import { flatten } from "flat";
import jsonexport from "jsonexport";
import { BookActivitySchema } from "$server/models/bookActivity";

const bom = "\uFEFF";

/**
 * ブラウザーで学習分析データをCSVファイル(BOM付きUTF-8)に変換しエクスポート
 * @param data 学習分析データ
 * @param filename ダウンロードするファイル名
 */
async function download(data: BookActivitySchema[], filename: string) {
  const flattenData = data.map((a) => flatten(a));
  const csv = await jsonexport(flattenData, {
    mapHeaders: (header) =>
      header
        .replace(/^createdAt$/, "初回アクセス日")
        .replace(/^updatedAt$/, "最終アクセス日"),
  });
  const file = new File([bom, csv], filename, { type: "text/csv" });
  const dataUrl = URL.createObjectURL(file);
  const anchor = document.createElement("a");
  anchor.download = filename;
  anchor.href = dataUrl;
  anchor.click();
}

export default download;
