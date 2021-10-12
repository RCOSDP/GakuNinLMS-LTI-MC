import { isInstructor } from "./roles";

describe("isInstructor()", function () {
  test("ロールが管理者", function () {
    const ltiRoles = [
      "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Administrator",
    ];
    expect(isInstructor(ltiRoles)).toBe(true);
  });
});
