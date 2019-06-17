const getNetworkService = require("./getNetworkService");
const { execSync } = require("child_process");

module.exports = async (domain, port) => {
  try {
    const deviceName = await getNetworkService();
    execSync(
      `networksetup -setsocksfirewallproxy ${deviceName} ${domain} ${port}`
    );
    execSync(`networksetup -setsocksfirewallproxystate ${deviceName} on`);
  } catch (error) {
    throw new Error(error);
  }
};
