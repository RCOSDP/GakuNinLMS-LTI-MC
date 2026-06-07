import { defineConfig } from "tsdown";

const shared = {
  format: ["esm"] as const,
  target: "node20",
  platform: "node" as const,
  outDir: "dist",
  hash: false,
  outExtensions: () => ({ js: ".js" }),
  deps: {
    onlyBundle: false,
  },
  outputOptions: {
    codeSplitting: false,
  },
};

export default defineConfig([
  {
    ...shared,
    entry: { index: "index.ts" },
    clean: true,
  },
  {
    ...shared,
    entry: { downloadCli: "utils/activity/downloadCli.ts" },
    clean: false,
  },
]);
