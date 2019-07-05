const fs = require("fs");
const { CUSTOM_RULES } = require("./constants");

module.exports = () => fs.readFileSync(CUSTOM_RULES);
