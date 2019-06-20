const axios = require("axios");
const fs = require("fs");

module.exports = async (pacFilePath, port) => {
  let result = "";

  try {
    const response = await axios({
      method: "get",
      baseURL: "https://raw.githubusercontent.com/petronny/gfwlist2pac/master",
      url: "/gfwlist.pac",
    });

    result = response.data;
    fs.writeFileSync(pacFilePath, result.replace(/'SOCKS5.*'/, `'SOCKS5 127.0.0.1:${port}'`));
  } catch (error) {
    throw new Error(error);
  }
};
