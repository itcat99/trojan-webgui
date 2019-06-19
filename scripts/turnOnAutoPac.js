const getNetworkService = require("./getNetworkService");
const { execSync } = require("child_process");

module.exports = async port => {
  try {
    const deviceName = await getNetworkService();
    execSync(`networksetup -setautoproxyurl ${deviceName} http://localhost:${port}/proxy.pac`);
    execSync(`networksetup -setautoproxystate ${deviceName} on`);
  } catch (error) {
    throw new Error(error);
  }
};
