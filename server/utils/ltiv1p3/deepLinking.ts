import type { Client } from "openid-client";
import { SignJWT, importJWK, type JWK } from "jose";
import { generators } from "openid-client";
import { createAccessToken } from "./accessToken";
import prisma from "$server/utils/prisma";

type LineItem = {
  label?: string;
  scoreMaximum: number;
  resourceId?: string;
  tag?: string;
  gradesReleased?: boolean;
};

/** https://www.imsglobal.org/spec/lti-dl/v2p0#content-item-types */
export type ContentItem =
  /** https://www.imsglobal.org/spec/lti-dl/v2p0#link */
  | {
      type: "link";
      url: string;
      title?: string;
      text?: string;
      icon?: {
        url: string;
        width?: number;
        height?: number;
      };
      thumbnail?: {
        url: string;
        width?: number;
        height?: number;
      };
      embed?: {
        html: string;
      };
      window?: {
        targetName: string;
        width?: number;
        height?: number;
        windowFeatures: string;
      };
      iframe?: {
        src: string;
        width?: number;
        height?: number;
      };
      [key: string]: unknown;
    }
  /** https://www.imsglobal.org/spec/lti-dl/v2p0#lti-resource-link */
  | {
      type: "ltiResourceLink";
      url?: string;
      title?: string;
      text?: string;
      icon?: {
        url: string;
        width?: number;
        height?: number;
      };
      thumbnail?: {
        url: string;
        width?: number;
        height?: number;
      };
      window?: {
        targetName: string;
        width?: number;
        height?: number;
        windowFeatures: string;
      };
      iframe?: {
        width?: number;
        height?: number;
      };
      lineItem?: LineItem;
      available?: {
        startDateTime?: string;
        endDateTime?: string;
      };
      submission?: {
        startDateTime?: string;
        endDateTime?: string;
      };
      custom?: {
        [key: string]: unknown;
      };
      [key: string]: unknown;
    }
  /** https://www.imsglobal.org/spec/lti-dl/v2p0#file */
  | {
      type: "file";
      url: string;
      title?: string;
      text?: string;
      icon?: {
        url: string;
        width?: number;
        height?: number;
      };
      thumbnail?: {
        url: string;
        width?: number;
        height?: number;
      };
      expiresAt?: string;
      [key: string]: unknown;
    }
  /** https://www.imsglobal.org/spec/lti-dl/v2p0#html-fragment */
  | {
      type: "html";
      html: string;
      title?: string;
      text?: string;
      [key: string]: unknown;
    }
  /** https://www.imsglobal.org/spec/lti-dl/v2p0#image */
  | {
      type: "image";
      url: string;
      title?: string;
      text?: string;
      icon?: {
        url: string;
        width?: number;
        height?: number;
      };
      thumbnail?: {
        url: string;
        width?: number;
        height?: number;
      };
      width?: number;
      height?: number;
      [key: string]: unknown;
    };

/**
 * Deep Linking Response Message Private Claim
 * https://www.imsglobal.org/spec/lti-dl/v2p0#deep-linking-response-message
 */
export type DlResponseMessagePrivateClaim = {
  "https://purl.imsglobal.org/spec/lti/claim/message_type": "LtiDeepLinkingResponse";
  "https://purl.imsglobal.org/spec/lti/claim/version": "1.3.0";
  "https://purl.imsglobal.org/spec/lti/claim/deployment_id": string;
  "https://purl.imsglobal.org/spec/lti-dl/claim/data"?: string;
  "https://purl.imsglobal.org/spec/lti-dl/claim/content_items": Array<ContentItem>;
  "https://purl.imsglobal.org/spec/lti-dl/claim/msg"?: string;
  "https://purl.imsglobal.org/spec/lti-dl/claim/log"?: string;
  "https://purl.imsglobal.org/spec/lti-dl/claim/errormsg"?: string;
  "https://purl.imsglobal.org/spec/lti-dl/claim/errorlog"?: string;
};

const successCode = [200, 201, 202, 204];
const authFailureCode = [401];

/**
 * LTI-NRPS 2.0 lineItems の取得
 * https://www.imsglobal.org/spec/lti-dl/v2p0
 * @param client OpenID Connect Client
 * @param contextLineItemsUrl LTI claim に含まれる context_memberships_url
 * @param retry リトライを行うか否か (デフォルト: true 行う)
 */
export async function getLineItems(
  client: Client,
  contextLineItemsUrl?: string,
  retry = true
): Promise<LineItem[]> {
  const clientId = client.metadata.client_id;
  if (!contextLineItemsUrl) {
    throw new Error(`Failed to get contextLineItemsUrl`);
  }

  const { accessToken } = await createAccessToken(client);

  const url = new URL(contextLineItemsUrl);
  const res = await client.requestResource(url, accessToken, {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.ims.lis.v2.lineitemcontainer+json",
    },
  });

  const statusCode = Number(res.statusCode);

  if (authFailureCode.includes(statusCode)) {
    await prisma.ltiConsumer.update({
      where: { id: clientId },
      data: { accessToken: "" },
    });

    if (retry) {
      return await getLineItems(client, contextLineItemsUrl, false);
    }
  }

  if (!successCode.includes(statusCode)) {
    throw new Error(`${res.statusCode} ${res.statusMessage}`);
  }

  if (!res.body) {
    throw new Error("Failed to request memberships resource");
  }

  const lineItems = JSON.parse(res.body.toString()) as LineItem[];

  return lineItems;
}

/**
 * LTI-DL 2.0 Deep Linking Response Message JWT の取得
 * https://www.imsglobal.org/spec/lti-dl/v2p0#deep-linking-response-message
 * Message, Log, Error message, ErrorLog, Defining new Content items types 非対応
 * @param client OpenID Connect Client
 * @param options Options
 * @param options.deploymentId Deployment ID
 * @param options.data LtiDeepLinkingRequest data property
 * @param options.contentItems Content items
 * @param options.alg Algorithm identifier
 */
export async function getDlResponseJwt(
  client: Client,
  options: {
    privateKey: JWK;
    deploymentId: string;
    data?: string;
    contentItems?: Array<ContentItem>;
    alg?: string;
  }
): Promise<string | null> {
  const {
    privateKey,
    deploymentId,
    data,
    contentItems = [],
    alg = "RS256",
  } = options;

  const claim = {
    "https://purl.imsglobal.org/spec/lti/claim/message_type":
      "LtiDeepLinkingResponse",
    "https://purl.imsglobal.org/spec/lti/claim/version": "1.3.0",
    "https://purl.imsglobal.org/spec/lti/claim/deployment_id": deploymentId,
    "https://purl.imsglobal.org/spec/lti-dl/claim/data": data,
    "https://purl.imsglobal.org/spec/lti-dl/claim/content_items": contentItems,
  } as const satisfies DlResponseMessagePrivateClaim;

  try {
    const jwt = await new SignJWT({
      nonce: generators.nonce(),
      ...claim,
    })
      .setProtectedHeader({ alg, kid: privateKey?.kid })
      .setIssuer(client.metadata.client_id)
      .setAudience(client.issuer.metadata.issuer)
      .setIssuedAt()
      .setExpirationTime("60s")
      .sign(await importJWK({ alg, ...privateKey }));

    return jwt;
  } catch {
    return null;
  }
}
