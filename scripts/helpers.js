const fs = require("fs");
const { SETTINGS, CONFIG } = require("../scripts/constants");

const isObject = obj => Object.prototype.toString.call(obj).indexOf("Object") >= 0;

const deepAssign = (origin, target) => {
  const tempObj = Object.assign({}, origin);

  for (const key in target) {
    if (isObject(origin[key]) && target[key]) {
      tempObj[key] = deepAssign(origin[key], target[key]);
    } else {
      tempObj[key] = target[key];
    }
  }

  return tempObj;
};

const success = (res, msg) => res.json({ type: "success", msg });
const fail = (res, msg) => res.json({ type: "fail", msg });

const setStatus = status => {
  const config = JSON.parse(fs.readFileSync(SETTINGS).toString());
  fs.writeFileSync(
    SETTINGS,
    JSON.stringify(Object.assign({}, config, { start: !!status }), null, 2),
  );
};

const getSettings = () => JSON.parse(fs.readFileSync(SETTINGS).toString());
const setSettings = settings => {
  const currentSettings = getSettings();
  fs.writeFileSync(SETTINGS, Object.assign({}, currentSettings, settings));
};

const getConfig = () => JSON.parse(fs.readFileSync(CONFIG).toString());
const setConfig = config => {
  const currentConfig = getConfig();
  fs.writeFileSync(CONFIG, deepAssign(currentConfig, config));
};

module.exports = {
  isObject,
  deepAssign,
  success,
  fail,
  setStatus,
  getSettings,
  getConfig,
  setSettings,
  setConfig,
};
