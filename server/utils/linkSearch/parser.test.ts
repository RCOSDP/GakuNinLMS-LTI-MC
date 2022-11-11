import { parse, stringify } from "./parser";

const emptyQuery = {
  type: "link" as const,
  text: [],
  oauthClientId: [],
  linkTitle: [],
  bookName: [],
  topicName: [],
};

describe("parse()", function () {
  test("検索クエリー文字列をパースできる", function () {
    expect(parse(`link:hoge foo bar baz`)).toEqual({
      ...emptyQuery,
      type: "link",
      text: ["foo", "bar", "baz"],
      oauthClientId: ["hoge"],
    });
  });

  test("`link:` 以降にいくつかキーワードが含まれる文字列をパースできる", function () {
    expect(parse("link:hoge,foo").oauthClientId).toEqual(["hoge", "foo"]);
  });

  test("`link:` がいくつか含まれる文字列をパースできる", function () {
    expect(parse("link:foo link:hoge,te%3As%2Ct").oauthClientId).toEqual([
      "foo",
      "hoge",
      "te:s,t",
    ]);
  });

  test("`linkTitle:` が含まれる文字列をパースできる", function () {
    expect(parse("link:foo bar linkTitle:hoge")).toEqual({
      ...emptyQuery,
      type: "link",
      text: ["bar"],
      linkTitle: ["hoge"],
      oauthClientId: ["foo"],
    });
  });
});

describe("stringify()", function () {
  test("検索クエリー文字列に変換", () => {
    const query = {
      ...emptyQuery,
      text: ["a", "b"],
    };
    expect(stringify(query)).toBe("a b");
  });

  test("空の検索クエリーは空文字列に変換", () => {
    const query = emptyQuery;
    expect(stringify(query)).toBe("");
  });

  test("oauthClientIdを検索クエリー文字列に変換", () => {
    const query = {
      ...emptyQuery,
      oauthClientId: ["foo"],
    };
    expect(stringify(query)).toBe("link:foo");
  });

  test("いくつかのLTI Contextを検索クエリー文字列に変換", () => {
    const query = {
      ...emptyQuery,
      oauthClientId: ["foo", "hoge"],
    };
    expect(stringify(query)).toBe("link:foo,hoge");
  });

  test("`:` や `,` や空白が含まれるLTI Contextを検索クエリー文字列に変換", () => {
    const query = {
      ...emptyQuery,
      oauthClientId: ["te:s,t"],
    };
    expect(stringify(query)).toBe("link:te%3As%2Ct");
  });
});
