const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  transformIgnorePatterns: ["/node_modules/(?!(yn))"], // NOTE: "yn" is Pure ESM package
  globals: { "ts-jest": { isolatedModules: true } },
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: require("path").resolve(`${__dirname}/..`),
  }),
};
