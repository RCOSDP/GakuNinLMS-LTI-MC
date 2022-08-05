/** @type {import("next").NextConfig} */
module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  swcMinify: true,
  // NOTE: ESLintによる型検査を外部で実施しないならば取り除いて型検査を有効化してください
  //       https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
  typescript: { ignoreBuildErrors: true },
  // NOTE: ESLintによる静的コード解析を外部で実施しないならば取り除いて有効化してください
  //       https://nextjs.org/docs/api-reference/next.config.js/ignoring-eslint
  eslint: { ignoreDuringBuilds: true },
};
