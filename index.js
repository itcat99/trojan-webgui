const fs = require("fs");
const path = require("path");
const pacService = require("./services/pac");
const appService = require("./services/app");

const configDir = path.resolve(__dirname, "config");
const assetsDir = path.resolve(__dirname, "assets");
const webDir = path.resolve(__dirname, "web");
const trojanPath = path.resolve(__dirname, "trojan-osx");

const config = JSON.parse(fs.readFileSync(path.join(configDir, "trojan.json")).toString());
const settings = JSON.parse(fs.readFileSync(path.join(configDir, "app.json")).toString());

/* set APP_CONFIG in process.env */
process.env.APP_CONFIG = JSON.stringify(settings);

const { local_port } = config;
const { port, proxyType } = settings;
const { app, pac } = port;

pacService({ port: pac, assetsDir });
appService({
  trojanPath,
  appPort: app,
  pacPort: pac,
  globPort: local_port,
  proxyType,
  configDir,
  assetsDir,
  webDir,
});
