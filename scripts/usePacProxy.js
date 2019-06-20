const turnOnAutoPac = require("../scripts/turnOnAutoPac");
const turnOffGlob = require("../scripts/turnOffGlob");

module.exports = async pacPort => {
  console.log("use pac proxy");
  try {
    await turnOnAutoPac(pacPort);
    await turnOffGlob();
  } catch (err) {
    throw new Error(err);
  }
};
