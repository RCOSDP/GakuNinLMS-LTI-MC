import parse from "spdx-expression-parse";

/**
 * ライセンス https://spdx.org/licenses/ に準拠しているか否かの判定
 * @param input ライセンス
 * @returns 空文字か正しい形式ならば true, そうでなければ false
 */
export function isValidLicense(input: unknown): boolean {
  if (typeof input !== "string") return false;
  if (input === "") return true;

  try {
    parse(input);
    return true;
  } catch {
    return false;
  }
}
