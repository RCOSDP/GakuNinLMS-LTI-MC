import formatInterval from "./formatInterval";

test("10000ミリ秒のとき日本語表記の秒数が得られる", () => {
  expect(formatInterval(0, 10000)).toBe("10秒");
});

test("9999ミリ秒のとき日本語表記の秒数が得られる", () => {
  expect(formatInterval(0, 9999)).toBe("9秒");
});

test("1000ミリ秒のとき日本語表記の秒数が得られる", () => {
  expect(formatInterval(0, 1000)).toBe("1秒");
});

test("1000ミリ秒未満のとき用意した文字列が得られる", () => {
  expect(formatInterval(0, 999)).toBe("1秒未満");
});
