const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  transform: {
    "^.+\\.[tj]sx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!\\.pnpm/[^/]+/node_modules/(yn|openid-client|oauth4webapi|jose))(?!yn/)",
  ],
  testEnvironment: "node",
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: require("path").resolve(`${__dirname}/..`),
    }),
    "^openid-client$": "<rootDir>/test/mocks/openid-client.ts",
    "^jose$": "<rootDir>/test/mocks/jose.ts",
  },
};
