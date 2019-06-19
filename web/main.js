/* eslint no-console:0 */
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

function setAttr(el, key, value) {
  if (Array.isArray(el)) {
    el.forEach(item => {
      setAttr(item, key, value);
    });
  } else {
    el.setAttribute(key, value);
  }
}

function fillForm(data) {
  const keys = Object.keys(data);

  for (const key of keys) {
    let val = data[key];
    if (Object.prototype.toString.call(val).indexOf("Object") >= 0) {
      fillForm(val);
    } else {
      const keyArr = key.split("_");
      const elId = keyArr
        .map((item, i) => {
          if (i > 0) return `${item[0].toUpperCase()}${item.slice(1)}`;
          return item;
        })
        .join("");

      if (Array.isArray(val)) val = val.join(",");
      if (typeof val === "boolean") val = `${val}`;

      getEl(elId).value = val;
    }
  }
}

function getEl(id) {
  return document.getElementById(id);
}

window.onload = function() {
  const $pacOnBtn = getEl("pacOn");
  const $pacOffBtn = getEl("pacOff");
  const $globalOnBtn = getEl("globalOn");
  const $globalOffBtn = getEl("globalOff");
  const $runType = getEl("runType");
  const $verify = getEl("verify");
  const $start = getEl("start");
  const $stop = getEl("stop");

  const $config = getEl("config");

  $runType.addEventListener("change", function(event) {
    const val = event.target.value;
    const $targetAddr = getEl("targetAddr");
    const $targetPort = getEl("targetPort");
    const $udpTimeout = getEl("udpTimeout");
    const $key = getEl("key");
    const $keyPassword = getEl("keyPassword");
    const $preferServerCipher = getEl("preferServerCipher");
    const $sessionTimeout = getEl("sessionTimeout");
    const $plainHttpResponse = getEl("plainHttpResponse");
    const $dhparam = getEl("dhparam");
    const $preferIpv4 = getEl("preferIpv4");
    const $mysql = getEl("mysql");
    const $verifyHostname = getEl("verifyHostname");

    if (val === "forward") {
      setAttr(
        [$targetAddr.parentElement, $targetPort.parentElement, $udpTimeout.parentElement],
        "class",
        "",
      );
    } else {
      setAttr(
        [$targetAddr.parentElement, $targetPort.parentElement, $udpTimeout.parentElement],
        "class",
        "hidden",
      );
    }

    if (val === "server") {
      setAttr(
        [
          $key.parentElement,
          $keyPassword.parentElement,
          $preferServerCipher.parentElement,
          $sessionTimeout.parentElement,
          $plainHttpResponse.parentElement,
          $dhparam.parentElement,
          $preferIpv4.parentElement,
          $mysql,
        ],
        "class",
        "",
      );
      setAttr([$verify.parentElement, $verifyHostname.parentElement], "class", "hidden");
    } else {
      setAttr(
        [
          $key.parentElement,
          $keyPassword.parentElement,
          $preferServerCipher.parentElement,
          $sessionTimeout.parentElement,
          $plainHttpResponse.parentElement,
          $dhparam.parentElement,
          $preferIpv4.parentElement,
          $mysql,
        ],
        "class",
        "hidden",
      );
      setAttr([$verify.parentElement, $verifyHostname.parentElement], "class", "");
    }
  });

  $verify.addEventListener("change", function(event) {
    const val = event.target.value;
    const $verifyHostname = getEl("verifyHostname");
    const $cert = getEl("cert");

    if (val === "true") {
      $verifyHostname.parentElement.setAttribute("class", "");
      $cert.parentElement.setAttribute("class", "");
    } else {
      $verifyHostname.parentElement.setAttribute("class", "hidden");
      $cert.parentElement.setAttribute("class", "hidden");
    }
  });

  readFile("app.json", result => {
    const config = JSON.parse(result);
    const port = config.gui.port;

    const instance = window.axios.create({
      baseURL: `http://localhost:${port}/api`,
    });

    instance.get("/trojanConfig").then(result => {
      const { type, msg } = result.data;
      if (type === "success") {
        fillForm(JSON.parse(msg));
      }
    });

    $start.addEventListener("click", function() {
      instance({
        method: "post",
        url: "/start",
      }).then(() => alert("Proxy Start"));
    });

    $stop.addEventListener("click", function() {
      instance({
        method: "post",
        url: "/stop",
      }).then(() => alert("Proxy Stop"));
    });

    $config.addEventListener("submit", function(event) {
      event.preventDefault();

      const config = new FormData(this);
      instance({
        method: "post",
        url: "/updateClientConfig",
        data: config,
      }).then(result => {}, err => console.error(err));
    });
    $config.addEventListener("reset", function() {
      $runType.value = "client";
    });

    $pacOnBtn.addEventListener("click", function() {
      instance({
        method: "post",
        url: "/pacon",
      })
        .then(() => console.log("on successed"))
        .catch(err => console.error(err));
    });

    $pacOffBtn.addEventListener("click", function() {
      instance({
        method: "post",
        url: "/pacoff",
      })
        .then(() => console.log("off successed"))
        .catch(err => console.error(err));
    });

    $globalOnBtn.addEventListener("click", function() {
      instance({
        method: "post",
        url: "/globon",
      })
        .then(() => console.log("on successed"))
        .catch(err => console.error(err));
    });

    $globalOffBtn.addEventListener("click", function() {
      instance({
        method: "post",
        url: "/globoff",
      })
        .then(() => console.log("off successed"))
        .catch(err => console.error(err));
    });
  });
};
