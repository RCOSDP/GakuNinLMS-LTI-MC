const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("../tsconfig.json");

module.exports = {
  preset: "ts-jest",
  globals: { "ts-jest": { isolatedModules: true } },
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: require("path").resolve(`${__dirname}/..`),
  }),
};
