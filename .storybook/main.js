const path = require("path");

module.exports = {
  webpackFinal: async (config) => {
    config.resolve.alias["theme"] = path.resolve(__dirname, "../theme");
    config.resolve.alias["styles"] = path.resolve(__dirname, "../styles");
    config.resolve.alias["$atoms"] = path.resolve(
      __dirname,
      "../components/atoms"
    );
    config.resolve.alias["$molecules"] = path.resolve(
      __dirname,
      "../components/molecules"
    );
    config.resolve.alias["$organisms"] = path.resolve(
      __dirname,
      "../components/organisms"
    );
    return config;
  },
  stories: ["../components/**/*.stories.tsx"],
};
