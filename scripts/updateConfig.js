const fs = require("fs");
const path = require("path");
const restart = require("./restart");
const updatePacPort = require("./updatePacPort");

const { isObject } = require("./helpers");

function update(def, config, name) {
  const keys = Object.keys(def);
  for (let key of keys) {
    const val = def[key];

    if (isObject(val)) {
      def[key] = update(def[key], config, key);
    } else {
      let newVal = key === "password" && name === "mysql" ? config.mysql_password : config[key];

      if (Array.isArray(newVal)) newVal = newVal.filter(v => v);
      if (typeof newVal === "string" && (key === "password" || key === "alpn")) {
        newVal = newVal.trim().split(",");
      }

      if (newVal === "false") newVal = false;
      if (newVal === "true") newVal = true;

      def[key] = newVal;
    }
  }

  return def;
}

module.exports = ({ config, configDir, assetsDir, pacFilePath, globPort }) => {
  const { run_type } = config;

  const configPath = path.resolve(__dirname, "..", "config", "trojan.json");
  const defaultConfig = require("./config")[run_type];

  fs.writeFileSync(
    configPath,
    JSON.stringify(update(Object.assign({}, defaultConfig), config), null, 2),
  );

  return restart({ configDir, assetsDir })
    .then(() => updatePacPort(pacFilePath, globPort))
    .catch(err => console.error(err));
};
