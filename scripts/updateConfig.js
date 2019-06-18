const fs = require("fs")
const path = require("path")

const {
  isObject,
  deepAssign
} = require("./helpers")

function update(def, config) {
  const keys = Object.keys(def);
  for (let key of keys) {
    // if (!config[key]) continue;

    const val = def[key];
    if (isObject(val)) {
      def[key] = update(def[key], config);
    } else {
      let newVal = config[key];
      
      if (Array.isArray(newVal)) newVal = newVal.filter(v => v);
      if (typeof newVal === 'string' && (key === 'password' || key === "alpn")) {
        newVal = newVal.trim().split(",");
      }

      if (newVal === "false") newVal = false;
      if (newVal === "true") newVal = true;

      def[key] = newVal;
    }
  }

  return def;
}

function str2num(key, val) {
  const KEYS = ["local_port", "target_port", "remote_port", "udp_timeout", "log_level", "fast_open_qlen", "session_timeout", "server_port"]
  if(KEYS.indexOf(key) >= 0) return val * 1;
  return val;
}

function str2bool(key, val) {
  const KEYS = ["prefer_server_cipher", "reuse_session", "session_ticket", "prefer_ipv4", "no_delay", "keep_alive", "fast_open", "enabled", "verify", "verify_hostname"]
  if(KEYS.indexOf(key) >= 0) return val === "true";
  return val;
}

module.exports = config => {
  const {
    run_type
  } = config;

  const configPath = path.resolve(__dirname, "..", 'config', 'client.test.json');
  const defaultConfig = require("./config")[run_type];

  fs.writeFileSync(configPath, JSON.stringify(update(Object.assign({}, defaultConfig), config), null, 2));
}