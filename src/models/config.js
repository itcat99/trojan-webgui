import { BASIC, SSL, TCP, MYSQL } from "constants";
import axios from "axios";

const isObject = obj => Object.prototype.toString.call(obj).indexOf("Object") >= 0;
const deepAssign = (origin, target) => {
  const tempObj = Object.assign({}, origin);

  for (const key in target) {
    if (isObject(origin[key]) && target[key]) {
      tempObj[key] = deepAssign(origin[key], target[key]);
    } else {
      tempObj[key] = target[key];
    }
  }

  return tempObj;
};

/**
 * 深度吸收 - 仅改变origin内和target不一样的部分，如果target中有而origin中没有的，则不添加进origin内
 * @param {*} origin 源
 * @param {*} target 目标
 */
const deepTake = (origin, target) => {
  const tempObj = Object.assign({}, origin);

  for (const key in origin) {
    if (isObject(origin[key]) && target[key]) {
      tempObj[key] = deepTake(origin[key], target[key]);
    } else {
      tempObj[key] = target[key];
    }
  }

  return tempObj;
};

export default {
  namespace: "config",
  state: {
    type: "client",
    basic: {},
    ssl: {},
    tcp: {},
    mysql: {},
    proxyMode: "pac",
  },
  reducer: {
    update: (state, payload) => {
      const { run_type, ssl, tcp, mysql, ...others } = payload;
      const currentState = Object.assign({}, state);

      const newConfig = {
        basic: Object.assign({}, BASIC.common, BASIC[run_type], others),
        ssl: Object.assign({}, SSL.common, SSL[run_type], ssl),
        tcp: Object.assign({}, TCP.common, TCP[run_type], tcp),
        mysql: Object.assign({}, MYSQL.common, MYSQL[run_type], mysql),
      };

      return deepAssign(currentState, newConfig);
    },
    changeType: (state, type) => {
      const newConfig = {
        basic: Object.assign({}, BASIC.common, BASIC[type]),
        ssl: Object.assign({}, SSL.common, SSL[type]),
        tcp: Object.assign({}, TCP.common, TCP[type]),
        mysql: Object.assign({}, MYSQL.common, MYSQL[type]),
      };

      const result = deepTake(newConfig, state);
      return { type, ...result };
    },
    updateproxyMode: (state, mode) => {
      return Object.assign({}, state, {
        proxyMode: mode,
      });
    },
  },
  effect: {
    start: async () => {
      await axios.post("/api/start");
    },
    usePac: async (_payload, actions) => {
      try {
        await axios.post("/api/pacon");
        actions.config.updateproxyMode("pac");
      } catch (error) {
        throw new Error(error);
      }
    },
    useGlob: async (_payload, actions) => {
      try {
        await axios.post("/api/globon");
        actions.config.updateproxyMode("global");
      } catch (error) {
        throw new Error(error);
      }
    },
    updatePacFile: async () => {
      await axios.post("/api/updatePac");
    },
    getConfig: async (_payload, actions) => {
      const result = await axios.get("/api/getConfig");
      const { msg } = result.data;

      actions.config.update(msg);
    },

    updateConfig: async (payload, actions) => {
      try {
        await axios.post("/api/updateConfig", payload);
        await actions.config.getConfig();
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
