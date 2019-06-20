/* 重启所有服务 app/pac/trojan */
const { execSync } = require("child_process");
const start = require("../scripts/start");
const path = require("path");
const fs = require("fs");

module.exports = async ({ configDir, assetsDir, trojanPath }) => {
  try {
    execSync(`${path.resolve(__dirname, "..", "node_modules/.bin/pm2")} restart trojan`);
    const config = JSON.parse(fs.readFileSync(path.join(configDir, "trojan.json")).toString());
    const settings = JSON.parse(fs.readFileSync(path.join(configDir, "app.json")).toString());

    const { port, proxyType } = settings;
    const { local_port } = config;

    return await start({
      trojanPath,
      configDir,
      assetsDir,
      proxyType,
      pacPort: port.pac,
      globPort: local_port,
    });
  } catch (err) {
    throw new Error(err);
  }
};
