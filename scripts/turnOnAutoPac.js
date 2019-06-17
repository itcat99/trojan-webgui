const getNetworkService = require("./getNetworkService");
const { execSync } = require("child_process");

module.exports = async proxyHost => {
  try {
    const deviceName = await getNetworkService();
    execSync(`networksetup -setautoproxyurl ${deviceName} ${proxyHost}`);
    execSync(`networksetup -setautoproxystate ${deviceName} on`);
  } catch (error) {
    throw new Error(error);
  }
};
