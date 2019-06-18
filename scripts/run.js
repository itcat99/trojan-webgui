const {
  spawn
} = require("child_process")
const path = require("path")

module.exports = ({
  configDir,
  assetsDir
}) => {
  const configPath = path.join(configDir, "client.json");
  const logPath = path.join(assetsDir, "info.log");
  
  console.log("logPath", logPath);
  const result = spawn(`./trojan-osx`, ['--config', `${configPath}`, '--log', `${logPath}`]);
  result.on("error", err => {
    console.error(err)

    process.exit(1)
  })

  result.stdout.on("data", data => {
    console.log(data.toString())
  })

  result.stderr.on("data", data => {
    console.error(data.toString());
  });
}