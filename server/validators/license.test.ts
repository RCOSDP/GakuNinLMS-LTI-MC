import { isValidLicense } from "./license";

describe("isValidLicense()", () => {
  test("正しい形式のライセンス", () => {
    expect(isValidLicense("CC-BY-4.0")).toBe(true);
  });
  test("誤った形式のライセンス", () => {
    expect(isValidLicense("無効なライセンス")).toBe(false);
  });
  test("式を含む形式の正しいライセンス", () => {
    expect(isValidLicense("GPL-2.0 OR MIT")).toBe(true);
  });
  test("空文字は無効値として許容", () => {
    expect(isValidLicense("")).toBe(true);
  });
});
