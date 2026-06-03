import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["utils/activity/downloadCli.ts"],
  format: ["esm"],
  target: "node20",
  platform: "node",
  outDir: "dist",
  outExtension: () => ({ js: ".js" }),
});
