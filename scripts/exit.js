/* 退出webgui */
const { execSync } = require("child_process");
const stop = require("./stop");

module.exports = () => {
  stop()
    .then(() => {
      execSync("pm2 delete trojan");
    })
    /* eslint no-console:0 */
    .catch(err => console.error(err));
};
