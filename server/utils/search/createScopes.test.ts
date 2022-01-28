import createScopes from "./createScopes";

const userId = 42;
const sharedScope = { shared: true };
const selfScope = { authors: { some: { userId: userId } } };

describe("Default", function () {
  test("all: 共有されている範囲または著者に自分が含まれる範囲", function () {
    const scopes = createScopes({
      type: "all",
      by: userId,
      admin: false,
    });
    expect(scopes).toEqual([{ OR: [sharedScope, selfScope] }]);
  });

  test("self: 著者に自分が含まれる範囲", function () {
    const scopes = createScopes({
      type: "self",
      by: userId,
    });
    expect(scopes).toEqual([selfScope]);
  });

  test("other: 共有されている範囲かつ著者に自分が含まれない範囲", function () {
    const scopes = createScopes({
      type: "other",
      by: userId,
      admin: false,
    });
    expect(scopes).toEqual([sharedScope, { NOT: selfScope }]);
  });
});

describe("By Administrator", function () {
  test("all: すべての範囲", function () {
    const scopes = createScopes({
      type: "all",
      by: userId,
      admin: true,
    });
    expect(scopes).toEqual([]);
  });

  test("other: 著者に自分が含まれない範囲", function () {
    const scopes = createScopes({
      type: "other",
      by: userId,
      admin: true,
    });
    expect(scopes).toEqual([{ NOT: selfScope }]);
  });
});
