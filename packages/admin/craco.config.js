// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  babel: {
    plugins: [
      [
        "@emotion",
        {
          autoLabel: "always",
          labelFormat: "[local]",
        },
      ],
    ],
  },
  webpack: {
    alias: {
      src: path.resolve(__dirname, "./src/"),
      "@shared": path.resolve(__dirname, "../shared/src/"),
    },
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin",
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
  },
};
