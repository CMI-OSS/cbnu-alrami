// eslint-disable-next-line @typescript-eslint/no-var-requires
const alias = require("../../craco.alias");

module.exports = {
  webpack: {
    alias,
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
