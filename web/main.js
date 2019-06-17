function readFile(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

window.onload = function() {
  const $pacOnBtn = document.getElementById("pacOn");
  const $pacOffBtn = document.getElementById("pacOff");
  const $globalOnBtn = document.getElementById("globalOn");
  const $globalOffBtn = document.getElementById("globalOff");
  const $view = document.getElementById("view");

  readFile("config.json", result => {
    const config = JSON.parse(result);
    const port = config.gui.port;

    const instance = window.axios.create({
      baseURL: `http://localhost:${port}/api`
    });

    instance.get("/clientConfig").then(result => {
      const { type, msg } = result.data;
      if (type === "success") {
        const data = JSON.parse(msg);
        console.log("data", data);
        $view.innerHTML = JSON.stringify(data, null, 2);
      }
    });

    $pacOnBtn.addEventListener("click", function() {
      instance({ method: "post", url: "/pacon" })
        .then(() => console.log("on successed"))
        .catch(err => console.error(err));
    });

    $pacOffBtn.addEventListener("click", function() {
      instance({ method: "post", url: "/pacoff" })
        .then(() => console.log("off successed"))
        .catch(err => console.error(err));
    });

    $globalOnBtn.addEventListener("click", function() {
      instance({ method: "post", url: "/globon" })
        .then(() => console.log("on successed"))
        .catch(err => console.error(err));
    });

    $globalOffBtn.addEventListener("click", function() {
      instance({ method: "post", url: "/globoff" })
        .then(() => console.log("off successed"))
        .catch(err => console.error(err));
    });
  });
};
