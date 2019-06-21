const path = require("path");

const CONFIGDIR = path.resolve(__dirname, "..", "config");
const ASSETSDIR = path.resolve(__dirname, "..", "assets");
const WEBDIR = path.resolve(__dirname, "..", "dist");

const CONFIG = path.join(CONFIGDIR, "trojan.json");
const CONFIG_DEFAULT = path.join(CONFIGDIR, "trojan_default.json");
const SETTINGS = path.join(CONFIGDIR, "app.json");
const SETTINGS_DEFAULT = path.join(CONFIGDIR, "app_default.json");

const TROJAN = path.resolve(__dirname, "..", "trojan-osx");

module.exports = {
  CONFIGDIR,
  ASSETSDIR,
  WEBDIR,
  CONFIG,
  CONFIG_DEFAULT,
  SETTINGS,
  SETTINGS_DEFAULT,
  TROJAN,
};
