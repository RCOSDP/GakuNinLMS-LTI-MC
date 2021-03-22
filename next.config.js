module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // NOTE: ESLintによって型検査を実施しないならば取り除いて型検査を有効化してください
  typescript: { ignoreDevErrors: true, ignoreBuildErrors: true },
};
