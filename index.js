const express = require("express")
const path = require("path")
const fs = require("fs")
const axios = require("axios")
const { spawn } = require("child_process")
const turnOnAutoPac = require("./turnOnAutoPac");
const turnOffAutoPac = require("./turnOffAutoPac");
const upgradePac = require("./upgradePac")

const guiConfig = JSON.parse(fs.readFileSync("./gui_config.json").toString())
const trojanConfig = JSON.parse(fs.readFileSync("./config.json").toString())

const { local_port } = trojanConfig
const { gui: guiCfg, pac: pacCfg, proxy: proxyCfg } = guiConfig;

if (local_port !== proxyCfg.port) {
  trojanConfig.local_port = proxyCfg.port;
  fs.writeFileSync("./config.json", JSON.stringify(trojanConfig, null, 2));
}

express.static("./");

const pacHost = `http://localhost:${pacCfg.port}/proxy.pac`;
const pac = express();
pac.get("/proxy.pac", (req, res) => {
  res.sendFile(path.resolve(__dirname, "gfwlist.pac"), err => {
    err && console.error(err);
  })
})
pac.listen(pacCfg.port, () => {
  turnOnAutoPac(pacHost).then(() => { }, err => console.error(err));
  console.log(`[PAC] server is running http://localhost:${pacCfg.port}`);
});

const gui = express();
gui.get("/api/upgrade", (_req, res) => {
  upgradePac(pacCfg.port)
    .then(() => {
      res.json({
        type: "success"
      })
    })
    .catch(err => {
      res.json({
        type: "error",
        msg: err
      })

      res.end()
    })
})

gui.post("/api/off", (_req, res) => {
  console.log("off")
  turnOffAutoPac().then(() => {
    res.json({
      type: "success"
    })
  }, err => {
    res.json({
      type: "error",
      msg: err
    })

    res.end()
  })
})

gui.post("/api/on", (_req, res) => {
  console.log("on")
  turnOnAutoPac(pacHost).then(() => {
    res.json({
      type: "success"
    })
  }, err => {
    res.json({
      type: "error",
      msg: err
    })

    res.end()
  })
})

gui.listen(guiCfg.port, () => {
  console.log(`[GUI] server is running http://localhost:${guiCfg.port}`);
});