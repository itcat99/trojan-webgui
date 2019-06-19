const getNetworkService = require("./getNetworkService");
const { execSync } = require("child_process");

module.exports = async () => {
  try {
    const deviceName = await getNetworkService();
    execSync(`networksetup -setautoproxystate ${deviceName} off`);
    console.log("turn off autopac");
  } catch (error) {
    throw new Error(error);
  }
};
