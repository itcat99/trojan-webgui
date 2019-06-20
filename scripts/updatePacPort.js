const fs = require("fs");

module.exports = (pacFilePath, port) => {
  const result = fs.readFileSync(pacFilePath).toString();
  fs.writeFileSync(pacFilePath, result.replace(/'SOCKS5.*'/, `'SOCKS5 127.0.0.1:${port}'`));
};
