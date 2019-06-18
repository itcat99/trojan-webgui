const turnOffAutoPac = require("./turnOffAutoPac");
const turnOffGlob = require("./turnOffGlob");

module.exports = () => {
  turnOffAutoPac()
    .then(() => turnOffGlob())
    .then(() => console.log("turn off success"))
    .catch(err => console.error(err));
}