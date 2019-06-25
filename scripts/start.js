/* 启动trojan服务 启动local proxy */
/* eslint no-console:0 */
const { spawn } = require("child_process");
const path = require("path");
/* ctl pac */
const usePacProxy = require("../scripts/usePacProxy");
const useGlobProxy = require("../scripts/useGlobProxy");
const { ASSETSDIR, CONFIG, TROJAN } = require("../scripts/constants");

const startTrojan = logPath => {
  let msg = "";

  return new Promise((resolve, reject) => {
    const result = spawn(TROJAN, ["--config", `${CONFIG}`, "--log", `${logPath}`]);
    console.log("trojan start");
    result.stdout.on("data", data => {
      process.stdout.write(`${data.toString()}\r`);
    });

    result.stderr.on("data", data => {
      msg += data.toString();
      console.log(msg);
    });

    result.on("exit", code => {
      if (code === 1) reject(msg);

      resolve();
    });
  });
};

module.exports = async ({ proxyMode, pacPort, globPort }) => {
  const logPath = path.join(ASSETSDIR, "info.log");

  try {
    proxyMode === "pac" ? await usePacProxy(pacPort) : await useGlobProxy(globPort);
    await startTrojan(logPath);
  } catch (err) {
    throw new Error(err);
  }
};
