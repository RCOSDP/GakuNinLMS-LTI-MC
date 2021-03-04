import { sign, query } from "./token";

describe("sign()", function () {
  test("正しい署名が得られる", function () {
    const contentPath = "vod/_myInstance_/sample.mp4";
    const params = {
      CustomParameter: "abcdef",
      endtime: "1500000000",
    };
    const prefix = "wowzatoken";
    const secret = "xyzSharedSecret";
    const algorithm = "sha256";

    expect(sign(contentPath, params, prefix, secret, algorithm)).toBe(
      "kJ591xB2lT-X0OA9UdoRx61uwp6A_IoSc_jCx_9h1l8="
    );
  });
});

describe("query()", function () {
  test("正しいURLクエリが得られる", function () {
    const contentPath = "vod/_myInstance_/sample.mp4";
    const params = {
      CustomParameter: "abcdef",
      endtime: "1500000000",
    };
    const prefix = "wowzatoken";
    const secret = "xyzSharedSecret";
    const algorithm = "sha256";

    expect(query(contentPath, params, prefix, secret, algorithm)).toEqual(
      new URLSearchParams(
        [
          "wowzatokenCustomParameter=abcdef",
          "wowzatokenendtime=1500000000",
          "wowzatokenhash=kJ591xB2lT-X0OA9UdoRx61uwp6A_IoSc_jCx_9h1l8%3D",
        ].join("&")
      )
    );
  });
});
