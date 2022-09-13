import { outdent } from "outdent";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { OPENID_PRIVATE_KEY, OPENID_PRIVATE_KEY_PATH } from "$server/utils/env";

export const method = {
  get: {
    summary: "LTI JWKS エンドポイント",
    description: outdent`
      クライアント認証用の公開鍵を取得するためのエンドポイントです。
      このエンドポイントをLTIツールのJWKSエンドポイントとして指定して利用します。`,
    response: {
      200: {
        type: "object",
        properties: {
          keys: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: true,
            },
          },
        },
      },
      404: {},
    },
  },
};

export const hooks = {
  get: { auth: [] },
};

export async function index() {
  if (!(OPENID_PRIVATE_KEY ?? OPENID_PRIVATE_KEY_PATH)) return { status: 404 };

  const key =
    OPENID_PRIVATE_KEY ?? (await fs.readFile(OPENID_PRIVATE_KEY_PATH));
  const jwk = crypto.createPublicKey(key).export({ format: "jwk" });

  return {
    status: 200,
    body: { keys: [jwk] },
  };
}
