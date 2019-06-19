const fs = require("fs");
const path = require("path");

const configDir = path.resolve(__dirname, "config");
const appConfig = fs.readFileSync(path.join(configDir, "config.json"));
