/* eslint no-console:0 */
const path = require("path");
const express = require("express");
const { ASSETSDIR } = require("../scripts/constants");

module.exports = config => {
  const { pac: port } = config.port;
  const pac = express();

  pac.get("/proxy.pac", (req, res) => {
    res.sendFile(path.join(ASSETSDIR, "gfwlist.pac"), err => {
      err && console.error(err);
    });
  });

  pac.listen(port, () => {
    console.log(`[PAC] server is running http://localhost:${port}`);
  });
};
