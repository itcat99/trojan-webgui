const express = require("express");
const path = require("path");
// const axios = require("axios");
const { spawn } = require("child_process");
const turnOnAutoPac = require("../scripts/turnOnAutoPac");
const turnOffAutoPac = require("../scripts/turnOffAutoPac");
const upgradePac = require("../scripts/upgradePac");

module.exports = ({ port, pacPort, pacHost }) => {
  const app = express();

  app.get("/api/upgrade", (_req, res) => {
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

  app.post("/api/off", (_req, res) => {
    console.log("off");
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

  app.post("/api/on", (_req, res) => {
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

  app.listen(port, () => {
    console.log(`[GUI] server is running http://localhost:${port}`);
  });
};
