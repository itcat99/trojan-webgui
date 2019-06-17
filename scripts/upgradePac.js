const axios = require("axios");

module.exports = async port => {
  let result = "";

  try {
    const response = await axios({
      method: "get",
      baseURL: "https://raw.githubusercontent.com/petronny/gfwlist2pac/master",
      url: "/gfwlist.pac"
    });

    result = response.data;
  } catch (error) {
    result = "";
  } finally {
    if (!result)
      res.json({
        type: "error",
        msg: "Can't find update or download failed."
      });

    fs.writeFileSync(
      "./gfwlist.pac",
      result.replace(/\'SOCKS5.*\'/, `'SOCKS5 127.0.0.1:${port}'`)
    );
    res.json({
      type: "success",
      msg: "upgrade gfwlist successed."
    });
  }
};
