const fs = require("fs");
const path = require("path");
const pacService = require("./services/_pac");
const appService = require("./services/app");

const configDir = path.resolve(__dirname, "config");
const assetsDir = path.resolve(__dirname, "assets");
const webDir = path.resolve(__dirname, "web");

const appConfig = JSON.parse(fs.readFileSync(path.join(configDir, "_app.json")).toString());

/* set APP_CONFIG in process.env */
process.env.APP_CONFIG = JSON.stringify(appConfig);

const { port } = appConfig;
const { app, pac, proxy } = port;

pacService({ port: pac, assetsDir });
appService({
  port: app,
  pacPort: pac,
  proxyPort: proxy,
  configDir,
  assetsDir,
  webDir,
});
