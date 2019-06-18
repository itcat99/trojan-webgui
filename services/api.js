const path = require("path");
const express = require("express");
const fs = require("fs");
// const bodyParser = require('body-parser')
const multer = require('multer')
// const axios = require("axios");
// const { spawn } = require("child_process");
const turnOnAutoPac = require("../scripts/turnOnAutoPac");
const turnOffAutoPac = require("../scripts/turnOffAutoPac");
const turnOnGlob = require("../scripts/turnOnGlob");
const turnOffGlob = require("../scripts/turnOffGlob");
const upgradePac = require("../scripts/upgradePac");
const updateConfig = require("../scripts/updateConfig")
const run = require("../scripts/run")

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
  const upload = multer();

  app.use(express.static(webDir));
  app.use(express.static(assetsDir));
  app.use(express.static(configDir));

  router.post("/start", async (req, res) => {
    try {
      await turnOnAutoPac(pacHost);
      run({
        configDir,
        assetsDir
      });
      res.json({
        type: 'success'
      })
    } catch (error) {
      res.json({
        type: "error",
        msg: err
      });

      res.end();
    }
  })
  router.post("/stop", async (req, res) => {
    try {
      await turnOffAutoPac()
      await turnOffGlob()

      res.json({
        type: 'success'
      })
    } catch (error) {
      res.json({
        type: "error",
        msg: err
      });

      res.end();
    }
  })

  router.post("/updateClientConfig", upload.array(), (req, res) => {
    const formData = req.body;
    updateConfig(formData);
    res.status(200);
  })
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