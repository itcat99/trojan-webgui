const path = require("path");
const fs = require("fs");

const configDir = path.resolve(__dirname, "config");
const assetsDir = path.resolve(__dirname, "assets");
const webDir = path.resolve(__dirname, "web");

const config = JSON.parse(
  fs.readFileSync(path.join(configDir, "config.json")).toString()
);
const clientConfig = JSON.parse(
  fs.readFileSync(path.join(configDir, "client.json")).toString()
);

const { local_port } = clientConfig;
const { gui: guiCfg, pac: pacCfg, proxy: proxyCfg } = config;

if (local_port !== proxyCfg.port) {
  trojanConfig.local_port = proxyCfg.port;
  fs.writeFileSync(
    path.join(configDir, "config.json"),
    JSON.stringify(trojanConfig, null, 2)
  );
}

const pacHost = `http://localhost:${pacCfg.port}/proxy.pac`;

require("./services/pac")({ port: pacCfg.port, assetsDir, pacHost });
require("./services/api")({
  port: guiCfg.port,
  pacPort: pacCfg.port,
  proxyPort: proxyCfg.port,
  pacHost,
  configDir,
  assetsDir,
  webDir
});
