import { Configuration } from "$openapi/runtime";
import { DefaultApi } from "$openapi/apis";
import { NEXT_PUBLIC_API_BASE_PATH } from "./env";

const config = new Configuration({
  basePath: NEXT_PUBLIC_API_BASE_PATH,
  credentials: "include" /* TODO: 同一オリジンなら `same-origin` をつかう */,
});

export const api = new DefaultApi(config);
