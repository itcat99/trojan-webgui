const fs = require("fs");
const path = require("path");
const { deepAssign } = require("./helpers");

module.exports = config => {
  const configPath = path.resolve(__dirname, "..", "config", "app.test.json");
  const defaultConfig = JSON.parse(require("./app_default.json"));

  fs.writeFileSync(configPath, JSON.stringify(deepAssign(defaultConfig, config), null, 2));
};
