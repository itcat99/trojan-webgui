const getNetworkService = require("./getNetworkService");
const { execSync } = require("child_process");

module.exports = async () => {
  try {
    const deviceName = await getNetworkService();
    execSync(`networksetup -setsocksfirewallproxystate ${deviceName} off`);
  } catch (error) {
    throw new Error(error);
  }
};
