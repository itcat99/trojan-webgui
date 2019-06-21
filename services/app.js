const path = require("path");
const express = require("express");
const multer = require("multer");

/* ctl pac */
const usePacProxy = require("../scripts/usePacProxy");
const useGlobProxy = require("../scripts/useGlobProxy");
const updatePacFile = require("../scripts/updatePacFile");

/* ctl config */
const updateConfig = require("../scripts/updateConfig");
const updateSettings = require("../scripts/updateSettings");

/* ctl */
const start = require("../scripts/start");
const restart = require("../scripts/restart");
const stop = require("../scripts/stop");
const exit = require("../scripts/exit");

const { success, fail, getSettings, getConfig } = require("../scripts/helpers");
const { WEBDIR, CONFIGDIR, ASSETSDIR } = require("../scripts/constants");

module.exports = ({ appPort, pacPort, globPort, proxyType }) => {
  const app = express();
  const router = express.Router();
  const upload = multer();

  app.use(express.static(WEBDIR));
  app.use(express.static(ASSETSDIR));
  app.use(express.static(CONFIGDIR));

  const pacFilePath = path.join(ASSETSDIR, "gfwlist.pac");
  const settings = getSettings();

  if (settings.start) {
    start({ proxyType, pacPort, globPort }).then(
      () => console.log("Start"),
      err => console.error(err),
    );
  }

  router.get("/status", (_req, res) => {
    const config = getSettings();
    console.log("config: ", config);
    res.json(config);
  });

  router.get("/getConfig", (req, res) => {
    try {
      const config = getConfig();
      success(res, config);
    } catch (err) {
      fail(res, err);
    }
  });

  router.post("/start", async (req, res) => {
    try {
      updateSettings({ start: true });
      await start({ proxyType, pacPort, globPort });
      success(res);
    } catch (err) {
      fail(res, err);
    }
  });

  router.post("/restart", async (req, res) => {
    try {
      updateSettings({ start: true });
      await restart();
      success(res);
    } catch (err) {
      fail(res, err);
    }
  });

  router.post("/stop", async (req, res) => {
    try {
      updateSettings({ start: false });
      await stop();
      success(res);
    } catch (err) {
      fail(res, err);
    }
  });
  router.post("/exit", (req, res) => {
    try {
      exit();
      res.status(200);
    } catch (err) {
      fail(res, err);
    }
  });
  router.post("/updateConfig", upload.array(), async (req, res) => {
    try {
      const formData = req.body;
      await updateConfig({ config: formData, globPort, pacFilePath });
      res.status(200);
    } catch (err) {
      fail(res, err);
    }
  });
  router.post("/updateSettings", upload.array(), async (req, res) => {
    try {
      const formData = req.body;
      updateSettings(formData);
      res.status(200);
    } catch (err) {
      fail(res, err);
    }
  });
  router.post("/updatePac", async (req, res) => {
    try {
      await updatePacFile(pacFilePath, globPort);
      success(res);
    } catch (error) {
      fail(res, error);
    }
  });
  router.post("/pacon", (req, res) => {
    usePacProxy(pacPort)
      .then(() => {
        updateSettings({ proxyType: "pac" });
        success(res);
      })
      .catch(err => fail(res, err));
  });
  router.post("/globon", (req, res) => {
    useGlobProxy(globPort)
      .then(() => {
        updateSettings({ proxyType: "glob" });
        success(res);
      })
      .catch(err => fail(res, err));
  });

  app.use("/api", router);
  app.listen(appPort, () => {
    /* eslint no-console:0 */
    console.log(`[APP] server is running http://localhost:${appPort}`);
  });
};
