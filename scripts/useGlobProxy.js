const turnOnGlob = require("../scripts/turnOnGlob");
const turnOffAutoPac = require("../scripts/turnOffAutoPac");

module.exports = async proxyPort => {
  try {
    await turnOnGlob(proxyPort);
    await turnOffAutoPac();
  } catch (err) {
    throw new Error(err);
  }
};
