const pacService = require("./services/pac");
const appService = require("./services/app");

const { getConfig, getSettings, deepAssign } = require("./scripts/helpers");

const config = getConfig();
const settings = getSettings();

/* set APP_CONFIG in process.env */
process.env.APP_CONFIG = JSON.stringify(settings);

const opts = deepAssign(settings, {
  port: {
    glob: config.local_port,
  },
});

pacService(opts);
appService(opts);
