/* 停止trojan服务 停止代理 */
// const { execSync } = require("child_process");
const turnOffAutoPac = require("./turnOffAutoPac");
const turnOffGlob = require("./turnOffGlob");

module.exports = () => {
  // execSync("yarn stop");
  return (
    turnOffAutoPac()
      .then(() => turnOffGlob())
      /* eslint no-console:0 */
      .catch(err => console.error(err))
  );
};
