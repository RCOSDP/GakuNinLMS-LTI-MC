import { Configuration } from "$openapi/runtime";
import { DefaultApi } from "$openapi/apis";

const basePath = process.env.NEXT_PUBLIC_API_BASE_PATH ?? "";
const config = new Configuration({
  basePath,
  credentials: "include" /* TODO: 同一オリジンなら `same-origin` をつかう */,
});

export const api = new DefaultApi(config);
