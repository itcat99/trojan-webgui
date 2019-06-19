/* eslint no-console:0 */
const path = require("path");
const express = require("express");

module.exports = config => {
  const pac = express();
  const { port, assetsDir } = config;

  pac.get("/proxy.pac", (req, res) => {
    res.sendFile(path.join(assetsDir, "gfwlist.pac"), err => {
      err && console.error(err);
    });
  });

  pac.listen(port, () => {
    console.log(`[PAC] server is running http://localhost:${port}`);
  });
};
