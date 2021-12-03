import { parse, stringify } from "./parser";

describe("parse()", function () {
  test("検索クエリー文字列をパースできる", function () {
    expect(
      parse(
        `name:a description:"b b" author:c keyword:d,e license:CC-BY-4.0 shared:true link:hoge:piyo foo bar baz`
      )
    ).toEqual({
      text: ["foo", "bar", "baz"],
      name: ["a"],
      description: ["b b"],
      author: ["c"],
      keyword: ["d", "e"],
      license: ["CC-BY-4.0"],
      shared: [true],
      link: [{ consumerId: "hoge", contextId: "piyo" }],
    });
  });

  test("`link:` 以降にいくつかキーワードが含まれる文字列をパースできる", function () {
    expect(parse("link:hoge:piyo,foo:bar").link).toEqual([
      { consumerId: "hoge", contextId: "piyo" },
      { consumerId: "foo", contextId: "bar" },
    ]);
  });

  test("`link:` がいくつか含まれる文字列をパースできる", function () {
    expect(parse("link:foo:bar link:hoge:piyo,te%3As%2Ct:fo%20o").link).toEqual(
      [
        { consumerId: "foo", contextId: "bar" },
        { consumerId: "hoge", contextId: "piyo" },
        { consumerId: "te:s,t", contextId: "fo o" },
      ]
    );
  });

  test("`link:` キーワードに区切り文字 `:` が含まない無効値の場合は何も得られない", function () {
    expect(parse("link:foo")).toEqual({
      text: [],
      name: [],
      description: [],
      author: [],
      keyword: [],
      license: [],
      shared: [],
      link: [],
    });
  });
});

describe("stringify()", function () {
  test("検索クエリー文字列に変換", () => {
    const query = {
      text: ["a", "b"],
      name: [],
      description: [],
      author: [],
      keyword: ["foo", "bar"],
      license: [],
      shared: [],
      link: [],
    };
    expect(stringify(query)).toBe("a b keyword:foo,bar");
  });

  test("LTI Contextを検索クエリー文字列に変換", () => {
    const query = {
      text: [],
      name: [],
      description: [],
      author: [],
      keyword: [],
      license: [],
      shared: [],
      link: [{ consumerId: "foo", contextId: "bar" }],
    };
    expect(stringify(query)).toBe("link:foo:bar");
  });

  test("いくつかのLTI Contextを検索クエリー文字列に変換", () => {
    const query = {
      text: [],
      name: [],
      description: [],
      author: [],
      keyword: [],
      license: [],
      shared: [],
      link: [
        { consumerId: "foo", contextId: "bar" },
        { consumerId: "hoge", contextId: "piyo" },
      ],
    };
    expect(stringify(query)).toBe("link:foo:bar,hoge:piyo");
  });

  test("`:` や `,` や空白が含まれるLTI Contextを検索クエリー文字列に変換", () => {
    const query = {
      text: [],
      name: [],
      description: [],
      author: [],
      keyword: [],
      license: [],
      shared: [],
      link: [{ consumerId: "te:s,t", contextId: "fo o" }],
    };
    expect(stringify(query)).toBe("link:te%3As%2Ct:fo%20o");
  });

  test("共有可否を検索クエリー文字列に変換", () => {
    const query = {
      text: [],
      name: [],
      description: [],
      author: [],
      keyword: [],
      license: [],
      shared: [true],
      link: [],
    };
    expect(stringify(query)).toBe("shared:true");
  });
});
