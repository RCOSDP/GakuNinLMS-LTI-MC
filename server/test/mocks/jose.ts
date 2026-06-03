export class SignJWT {
  setProtectedHeader() {
    return this;
  }
  setIssuer() {
    return this;
  }
  setAudience() {
    return this;
  }
  setIssuedAt() {
    return this;
  }
  setExpirationTime() {
    return this;
  }
  async sign() {
    return "jwt";
  }
}

export const importJWK = async () => new Uint8Array();
export const calculateJwkThumbprint = async () => "kid";
