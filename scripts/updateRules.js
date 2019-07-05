const { CUSTOM_RULES } = require("./constants");
const fs = require("fs");

module.exports = rules => {
  try {
    if (fs.existsSync(CUSTOM_RULES)) {
      fs.unlinkSync(CUSTOM_RULES);
    }

    fs.writeFileSync(CUSTOM_RULES, rules, {
      flag: "ax",
    });
  } catch (error) {
    throw new Error(error);
  }
};
