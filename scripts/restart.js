/* 重启所有服务 app/pac/trojan */
const { execSync } = require("child_process");
const start = require("../scripts/start");
const { getSettings, getConfig } = require("../scripts/helpers");

module.exports = async () => {
  try {
    execSync(`yarn restart`);
    const config = getConfig();
    const settings = getSettings();

    const { port, proxyType } = settings;
    const { local_port } = config;

    return await start({
      proxyType,
      pacPort: port.pac,
      globPort: local_port,
    });
  } catch (err) {
    throw new Error(err);
  }
};
