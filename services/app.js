const fs = require("fs");
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

const { success, fail } = require("../scripts/helpers");

module.exports = ({
  appPort,
  pacPort,
  globPort,
  proxyType,
  webDir,
  assetsDir,
  configDir,
  trojanPath,
}) => {
  const app = express();
  const router = express.Router();
  const upload = multer();

  app.use(express.static(webDir));
  app.use(express.static(assetsDir));
  app.use(express.static(configDir));

  const pacFilePath = path.join(assetsDir, "gfwlist.pac");

  router.get("/getConfig", (req, res) => {
    try {
      const config = JSON.parse(fs.readFileSync(path.join(configDir, "trojan.json")).toString());
      success(res, config);
    } catch (err) {
      fail(res, err);
    }
  });

  router.post("/start", async (req, res) => {
    try {
      start({ configDir, assetsDir, proxyType, pacPort, globPort, trojanPath });
      success(res);
    } catch (err) {
      fail(res, err);
    }
  });
  router.post("/restart", (req, res) => {
    restart({ configDir, assetsDir, trojanPath })
      .then(() => success(res))
      .then(err => fail(res, err));
  });
  router.post("/stop", (req, res) => {
    stop()
      .then(() => success(res))
      .then(err => fail(res, err));
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
      await updateConfig({ config: formData, configDir, assetsDir, globPort, pacFilePath });
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
      .then(() => success(res))
      .catch(err => fail(res, err));
  });
  router.post("/globon", (req, res) => {
    useGlobProxy(globPort)
      .then(() => success(res))
      .catch(err => fail(res, err));
  });

  app.use("/api", router);
  app.listen(appPort, () => {
    /* eslint no-console:0 */
    console.log(`[APP] server is running http://localhost:${appPort}`);
  });
};
