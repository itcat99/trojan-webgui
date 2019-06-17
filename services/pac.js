const fs = require("fs");
const path = require("path");
const express = require("express");
const turnOnAutoPac = require("../scripts/turnOnAutoPac");

module.exports = config => {
  const pac = express();
  const { port, assetsDir, pacHost } = config;

  // const configDir = path.resolve(__dirname, "..", "config");
  // const assetsDir = path.resolve(__dirname, "..", "assets");

  // const config = JSON.parse(
  //   fs.readFileSync(path.join(configDir, "config")).toString()
  // );

  // const port = config.pac.port;
  // const pacHost = `http://localhost:${port}/proxy.pac`;

  pac.get("/proxy.pac", (req, res) => {
    res.sendFile(path.join(assetsDir, "gfwlist.pac"), err => {
      err && console.error(err);
    });
  });

  pac.listen(port, () => {
    turnOnAutoPac(pacHost).then(() => {}, err => console.error(err));
    console.log(`[PAC] server is running http://localhost:${port}`);
  });
};
