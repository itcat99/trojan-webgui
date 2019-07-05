const path = require("path");

module.exports = {
  mode: "app",
  options: {
    port: 8081,
    cssMode: "sass",
    cssModules: false,
    styledComponents: true,
    flow: true,
    hashRouter: true,
    webpack: (webpack_config, plume_config) => {
      const { components, src } = plume_config.paths;
      // webpack_config.devServer = {
      //   contentBase: [path.resolve(__dirname, "dist"), path.resolve(__dirname, "uploads")],
      // };
      webpack_config.resolve.alias = {
        components,
        // containers,
        // helpers: path.join(src, "helpers"),
        constants: path.join(src, "constants"),
        // layouts: path.join(src, "Layouts"),
        // css: path.join(src, "css"),
      };

      return webpack_config;
    },
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
};
