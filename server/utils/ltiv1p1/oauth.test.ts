import { sign, valid, auth } from "./oauth";

describe("sign()", function () {
  test("正しく署名が得られる", function () {
    const oauthConsumerSecret = "secret";
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(sign(url, params, oauthConsumerSecret)).toBe(
      "IeMP6CeHaVU47hNucWgW5y1TGQI="
    );
  });

  test("RFC 3986 仕様予約語を正しくエンコードできる", function () {
    const oauthConsumerSecret = "secret";
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
      resource_link_title: `RFC 3986 ":/?#[]@!$&'()*+,;="`,
    } as const;

    expect(sign(url, params, oauthConsumerSecret)).toBe(
      "gbPiSxjJCBTUnnuQ8jF1pC+Vs8w="
    );
  });

  test("RFC 3986 仕様予約語がパラメータの名前に含まれる場合", function () {
    const oauthConsumerSecret = "secret";
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
      a0: "a",
      // エンコード前後で順番が変わる文字列 ("a%40" < "a0")
      "a@": "a",
      // エンコード前後で順番が変わる文字列 ("a" < "a%40")
      a: "a",
    } as const;

    expect(sign(url, params, oauthConsumerSecret)).toBe(
      "g8em84DQAPFyb00SlFyh8BxQkOI="
    );
  });
});

describe("valid()", function () {
  test("正しい", function () {
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "IeMP6CeHaVU47hNucWgW5y1TGQI=",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(valid(params)).toBe(true);
  });

  test("パラメーター不足", function () {
    const params = {
      oauth_version: "1.0",
      invalid: "invalid",
    } as const;

    expect(valid(params)).toBe(false);
  });

  test("oauth_version が異なる", function () {
    const params = {
      oauth_version: "2.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "IeMP6CeHaVU47hNucWgW5y1TGQI=",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(valid(params)).toBe(false);
  });

  test("lti_version が異なる", function () {
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "IeMP6CeHaVU47hNucWgW5y1TGQI=",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-2p0",
      resource_link_id: "1",
    } as const;

    expect(valid(params)).toBe(false);
  });
});

describe("auth()", function () {
  test("正しい", async function () {
    const oauthConsumerKey = "key";
    const oauthConsumerSecret = "secret";
    const lookupNonce = async () => false;
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "IeMP6CeHaVU47hNucWgW5y1TGQI=",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(
      await auth(
        url,
        params,
        oauthConsumerKey,
        oauthConsumerSecret,
        lookupNonce
      )
    ).toBe(true);
  });

  test("oauth_consumer_key が異なる", async function () {
    const oauthConsumerKey = "another-key";
    const oauthConsumerSecret = "secret";
    const lookupNonce = async () => false;
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "IeMP6CeHaVU47hNucWgW5y1TGQI=",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(
      await auth(
        url,
        params,
        oauthConsumerKey,
        oauthConsumerSecret,
        lookupNonce
      )
    ).toBe(false);
  });

  test("oauth_signature が異なる", async function () {
    const oauthConsumerKey = "key";
    const oauthConsumerSecret = "secret";
    const lookupNonce = async () => false;
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "invalid",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(
      await auth(
        url,
        params,
        oauthConsumerKey,
        oauthConsumerSecret,
        lookupNonce
      )
    ).toBe(false);
  });

  test("oauth_consumer_key が空", async function () {
    const empty = "";
    const oauthConsumerSecret = "secret";
    const lookupNonce = async () => false;
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: empty,
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "IeMP6CeHaVU47hNucWgW5y1TGQI=",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(
      await auth(url, params, empty, oauthConsumerSecret, lookupNonce)
    ).toBe(false);
  });

  test("OAuth Consumer Secret が空", async function () {
    const oauthConsumerKey = "key";
    const empty = "";
    const lookupNonce = async () => false;
    const url = "http://localhost:8080/api/v2/lti/lauch";
    const params = {
      oauth_version: "1.0",
      oauth_nonce: "0878c39c4c274c2072d3af6604a75c64",
      oauth_timestamp: "1605829208",
      oauth_consumer_key: "key",
      oauth_signature_method: "HMAC-SHA1",
      oauth_signature: "IeMP6CeHaVU47hNucWgW5y1TGQI=",
      lti_message_type: "basic-lti-launch-request",
      lti_version: "LTI-1p0",
      resource_link_id: "1",
    } as const;

    expect(await auth(url, params, oauthConsumerKey, empty, lookupNonce)).toBe(
      false
    );
  });
});
