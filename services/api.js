const path = require("path");
const express = require("express");
const fs = require("fs");
// const axios = require("axios");
// const { spawn } = require("child_process");
const turnOnAutoPac = require("../scripts/turnOnAutoPac");
const turnOffAutoPac = require("../scripts/turnOffAutoPac");
const turnOnGlob = require("../scripts/turnOnGlob");
const turnOffGlob = require("../scripts/turnOffGlob");
const upgradePac = require("../scripts/upgradePac");

module.exports = ({
  port,
  pacPort,
  proxyPort,
  pacHost,
  webDir,
  assetsDir,
  configDir
}) => {
  const app = express();
  const router = express.Router();

  app.use(express.static(webDir));
  app.use(express.static(assetsDir));
  app.use(express.static(configDir));

  router.get("/clientConfig", (_req, res) => {
    const clientConfig = fs
      .readFileSync(path.join(configDir, "client.json"))
      .toString();
    res.json({
      type: "success",
      msg: clientConfig
    });
  });

  router.get("/upgrade", (_req, res) => {
    upgradePac(pacPort)
      .then(() => {
        res.json({
          type: "success"
        });
      })
      .catch(err => {
        res.json({
          type: "error",
          msg: err
        });

        res.end();
      });
  });

  router.post("/pacoff", (_req, res) => {
    turnOffAutoPac().then(
      () => {
        res.json({
          type: "success"
        });
      },
      err => {
        res.json({
          type: "error",
          msg: err
        });

        res.end();
      }
    );
  });

  router.post("/pacon", (_req, res) => {
    turnOnAutoPac(pacHost).then(
      () => {
        res.json({
          type: "success"
        });
      },
      err => {
        res.json({
          type: "error",
          msg: err
        });

        res.end();
      }
    );
  });

  router.post("/globon", (_req, res) => {
    turnOnGlob("127.0.0.1", proxyPort).then(
      () => {
        res.json({
          type: "success"
        });
      },
      err => {
        res.json({
          type: "error",
          msg: err
        });

        res.end();
      }
    );
  });

  router.post("/globoff", (_req, res) => {
    turnOffGlob().then(
      () => {
        res.json({
          type: "success"
        });
      },
      err => {
        res.json({
          type: "error",
          msg: err
        });

        res.end();
      }
    );
  });

  app.use("/api", router);
  app.listen(port, () => {
    console.log(`[GUI] server is running http://localhost:${port}`);
  });
};
