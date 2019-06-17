const {execSync} = require("child_process")
const si = require('systeminformation');

module.exports = async () => {
  try {
    const defaultActiveDevice = await si.networkInterfaceDefault()
    const devices = execSync("networksetup -listnetworkserviceorder").toString().split("\n");
    let activeDeviceName = ''
  
    for(let index = 0; index < devices.length; index++){
      const str = devices[index]
      if(str.indexOf(defaultActiveDevice) >= 0){
        activeDeviceName = devices[index - 1].replace(/\(.*\)\s/, "").trim()
        break;
      }
    }
    
    if(!activeDeviceName) throw new Error;
    return activeDeviceName;
  } catch (error) {
    throw new Error(error)
  }
}