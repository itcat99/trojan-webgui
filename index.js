const fs = require("fs");
const pacService = require("./services/pac");
const appService = require("./services/app");

const { CONFIG, SETTINGS } = require("./scripts/constants");

const config = JSON.parse(fs.readFileSync(CONFIG).toString());
const settings = JSON.parse(fs.readFileSync(SETTINGS).toString());

/* set APP_CONFIG in process.env */
process.env.APP_CONFIG = JSON.stringify(settings);

const { local_port } = config;
const { port, proxyMode } = settings;
const { app, pac } = port;

pacService(pac);
appService({
  appPort: app,
  pacPort: pac,
  globPort: local_port,
  proxyMode,
});
