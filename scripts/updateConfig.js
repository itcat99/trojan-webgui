const fs = require("fs");
const path = require("path");
const restart = require("./restart");
const updatePacPort = require("./updatePacPort");
const { setConfig } = require("../scripts/helpers");

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

module.exports = ({ config, pacFilePath, globPort }) => {
  const { run_type } = config;
  const defaultConfig = require("./config")[run_type];

  setConfig(JSON.stringify(update(Object.assign({}, defaultConfig), config), null, 2));
  return (
    restart()
      .then(() => updatePacPort(pacFilePath, globPort))
      /* eslint no-console:0 */
      .catch(err => console.error(err))
  );
};
