/* eslint no-console:0 */
const fs = require("fs");
const { exec } = require("child_process");
const { CUSTOM_RULES } = require("./constants");

module.exports = async (pacFilePath, port = 1080) => {
  let msg = "";

  return new Promise((resolve, reject) => {
    if (fs.existsSync(pacFilePath)) {
      fs.unlinkSync(pacFilePath);
    }

    const command = `./genpac/genpac --format=pac --pac-proxy="SOCKS5 127.0.0.1:${port}" ${
      fs.existsSync(CUSTOM_RULES) ? "--user-rule-from " + CUSTOM_RULES : ""
    } -o ${pacFilePath}`;

    const result = exec(command);

    result.on("error", err => reject(err));
    result.stderr.on("data", chunk => {
      msg += chunk.toString();
      console.log(msg);
    });

    result.on("exit", code => {
      if (code === 1) reject(msg);

      resolve();
    });
  });
};
