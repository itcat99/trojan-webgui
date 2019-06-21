/* 退出webgui */
const { execSync } = require("child_process");
const stop = require("./stop");

module.exports = () => {
  stop()
    .then(() => {
      execSync("yarn delete");
    })
    /* eslint no-console:0 */
    .catch(err => console.error(err));
};
