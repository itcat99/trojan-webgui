const fs = require("fs");
const path = require("path");
const { deepAssign } = require("./helpers");

module.exports = (configPath, settings) => {
  const settingsPath = path.join(configPath, "app.json");
  const defaultSettings = JSON.parse(
    fs.readFileSync(path.join(configPath, "app_default.json")).toJSON(),
  );

  fs.writeFileSync(settingsPath, JSON.stringify(deepAssign(defaultSettings, settings), null, 2));
};
