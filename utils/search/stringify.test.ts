import stringify from "./stringify";

test("LTI Contextを検索クエリー文字列に変換", () => {
  const queryStr = stringify({
    link: [{ consumerId: "test", contextId: "foo" }],
  });
  expect(queryStr).toBe("link:test:foo");
});

test("キーワードを検索クエリー文字列に変換", () => {
  const queryStr = stringify({
    keyword: ["キーワード"],
  });
  expect(queryStr).toBe("keyword:キーワード");
});
