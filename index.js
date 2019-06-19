const path = require("path");
const fs = require("fs");

const configDir = path.resolve(__dirname, "config");
const assetsDir = path.resolve(__dirname, "assets");
const webDir = path.resolve(__dirname, "web");

const config = JSON.parse(fs.readFileSync(path.join(configDir, "app.json")).toString());
const clientConfig = JSON.parse(fs.readFileSync(path.join(configDir, "trojan.json")).toString());

const { local_port = 1080 } = clientConfig;
const { gui: guiCfg, pac: pacCfg } = config;

const pacHost = `http://localhost:${pacCfg.port}/proxy.pac`;

require("./services/pac")({ port: pacCfg.port, assetsDir, pacHost });
require("./services/api")({
  port: guiCfg.port,
  pacPort: pacCfg.port,
  proxyPort: local_port,
  pacHost,
  configDir,
  assetsDir,
  webDir,
});
