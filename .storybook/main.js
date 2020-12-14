const path = require("path");
const glob = require("glob");

module.exports = {
  webpackFinal: async (config) => {
    glob
      .sync(`../*/`, { cwd: __dirname })
      .map((path) => path.basename(path))
      .forEach((dir) => {
        config.resolve.alias[dir] = path.resolve(__dirname, "..", dir);
        config.resolve.alias[`$${dir}`] = path.resolve(__dirname, "..", dir);
      });
    glob
      .sync(`../components/*/`, { cwd: __dirname })
      .map((path) => path.basename(path))
      .forEach((dir) => {
        config.resolve.alias[`$${dir}`] = path.resolve(
          __dirname,
          "..",
          "components",
          dir
        );
      });
    return config;
  },
  stories: ["../components/**/*.stories.tsx"],
};
