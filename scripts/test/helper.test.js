/* eslint-disable no-undef */
const fs = require("fs");
const path = require("path");
const {
  deepAssign,
  isObject,
  getConfig,
  getSettings,
  setConfig,
  setSettings,
} = require("../helpers");

const configDir = path.resolve(__dirname, "../..", "config");
test("should deepAssgin", () => {
  const obj1 = {
    key: "aaa",
    key2: {
      key: "hello",
    },
  };

  const obj2 = {
    key: "bbb",
    key2: {
      key2: "world",
    },
  };

  expect(deepAssign(obj1, obj2).key2.key2).toBe("world");
  expect(deepAssign(obj1, obj2).key2.key).toBe("hello");
  expect(deepAssign(obj1, obj2).key).toBe("bbb");
});

test("should isObject", () => {
  expect(isObject({})).toBe(true);
  expect(isObject([])).toBe(false);
  expect(isObject("")).toBe(false);
  expect(isObject(1)).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject(undefined)).toBe(false);
});

test("should getConfig", () => {
  const config = getConfig();

  expect(config).toEqual(
    JSON.parse(fs.readFileSync(path.join(configDir, "trojan.json")).toString()),
  );
});

test("should getSettings", () => {
  const settings = getSettings();

  expect(settings).toEqual(
    JSON.parse(fs.readFileSync(path.join(configDir, "app.json")).toString()),
  );
});

test("should setConfig", () => {
  const cacheConfig = getConfig();
  setConfig({
    local_port: 1087,
    ssl: {
      alpn: ["h2"],
    },
  });
  const currentConfig = getConfig();

  expect(currentConfig.local_port).toBe(1087);
  expect(currentConfig.ssl.alpn).toEqual(["h2"]);
  setConfig(cacheConfig);
});

test("should setSettings", () => {
  const cacheSettings = getSettings();
  setSettings({
    proxyMode: "glob",
    port: {
      app: 8089,
    },
  });
  const currentSettings = getSettings();

  expect(currentSettings.proxyMode).toBe("glob");
  expect(currentSettings.port.app).toBe(8089);
  setSettings(cacheSettings);
});
