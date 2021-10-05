const { basename, resolve } = require("path");
const { sync: glob } = require("glob");

module.exports = {
  webpackFinal: async (config) => {
    glob(`../*/`, { cwd: __dirname })
      .map((path) => basename(path))
      .forEach((dir) => {
        config.resolve.alias[dir] = resolve(__dirname, "..", dir);
        config.resolve.alias[`$${dir}`] = resolve(__dirname, "..", dir);
      });
    glob(`../components/*/`, { cwd: __dirname })
      .map((path) => basename(path))
      .forEach((dir) => {
        config.resolve.alias[`$${dir}`] = resolve(
          __dirname,
          "..",
          "components",
          dir
        );
      });
    // NOTE: https://github.com/mui-org/material-ui/issues/24282 が解決したら取り除いて
    {
      const path = resolve(
        __dirname,
        "..",
        "node_modules",
        "@emotion",
        "react"
      );
      config.resolve.alias["@emotion/core"] = path;
      config.resolve.alias["emotion-theming"] = path;
    }
    return config;
  },
  stories: ["../components/**/*.stories.tsx"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-essentials"],
  core: { builder: "webpack5" },
};
