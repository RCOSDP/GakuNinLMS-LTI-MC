export class Configuration {
  serverMetadata() {
    return { issuer: "https://example.com" };
  }
  clientMetadata() {
    return { client_id: "test-client" };
  }
}

export const None = () => () => {};
export const PrivateKeyJwt = () => () => {};
export const useIdTokenResponseType = () => {};
export const buildAuthorizationUrl = () => new URL("https://example.com/auth");
export const randomNonce = () => "nonce";
export const randomState = () => "state";
export const clientCredentialsGrant = async () => ({ access_token: "token" });
export const fetchProtectedResource = async () =>
  new Response(JSON.stringify({ members: [] }), { status: 200 });
export const implicitAuthentication = async () => ({ sub: "user" });
