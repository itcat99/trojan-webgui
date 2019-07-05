const path = require("path");
const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

/* ctl pac */
const usePacProxy = require("../scripts/usePacProxy");
const useGlobProxy = require("../scripts/useGlobProxy");
const updatePacFile = require("../scripts/updatePacFile");
const getCustomRules = require("../scripts/getRules");
const updateRules = require("../scripts/updateRules");

/* ctl config */
const updateConfig = require("../scripts/updateConfig");

/* ctl */
const start = require("../scripts/start");
const restart = require("../scripts/restart");
const stop = require("../scripts/stop");
const exit = require("../scripts/exit");

const { success, fail, getSettings, getConfig, setSettings } = require("../scripts/helpers");
const { WEBDIR, CONFIGDIR, ASSETSDIR } = require("../scripts/constants");

module.exports = config => {
  const { port, proxyMode } = config;
  const { app: appPort, glob: globPort, pac: pacPort } = port;
  const app = express();
  const router = express.Router();
  const upload = multer();
  const jsonBody = bodyParser.json();

  app.use(express.static(WEBDIR));
  app.use(express.static(ASSETSDIR));
  app.use(express.static(CONFIGDIR));

  const pacFilePath = path.join(ASSETSDIR, "gfwlist.pac");
  const settings = getSettings();

  if (settings.start) {
    start({ proxyMode, pacPort, globPort }).then(
      () => console.log("Start"),
      err => console.error(err),
    );
  }

  router.get("/status", (_req, res) => {
    const config = getSettings();
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
      setSettings({ start: true });
      await start({ proxyMode, pacPort, globPort });
      success(res);
    } catch (err) {
      fail(res, err);
    }
  });

  router.post("/restart", async (req, res) => {
    try {
      setSettings({ start: true });
      await restart();
      success(res);
    } catch (err) {
      fail(res, err);
    }
  });

  router.post("/stop", async (req, res) => {
    try {
      setSettings({ start: false });
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
  router.post("/setSettings", upload.array(), async (req, res) => {
    try {
      const formData = req.body;
      setSettings(formData);
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
  router.get("/customRules", (req, res) => {
    const rules = getCustomRules();
    if (rules) {
      success(res, rules.toString());
    } else {
      fail(res, "no custom rules");
    }
  });
  router.post("/updateRules", jsonBody, (req, res) => {
    try {
      updateRules(req.body.rules);
      success(res, "update rules successed.");
    } catch (error) {
      fail(res, "update rules failed.");
    }
  });

  router.post("/pacon", (req, res) => {
    usePacProxy(pacPort)
      .then(() => {
        setSettings({ proxyMode: "pac" });
        success(res);
      })
      .catch(err => fail(res, err));
  });
  router.post("/globon", (req, res) => {
    useGlobProxy(globPort)
      .then(() => {
        setSettings({ proxyMode: "glob" });
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
