const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { workspaces } = require("./package.json");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  globals: { "ts-jest": { isolatedModules: true } },
  testPathIgnorePatterns: workspaces,
  projects: [__dirname, ...workspaces],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname,
  }),
};
