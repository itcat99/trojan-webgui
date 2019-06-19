import { CLIENT, FORWARD, SERVER, BASIC, SSL, TCP, MYSQL } from "constants";
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
  },
  reducer: {
    update: (state, payload) => {
      const { run_type, ssl, tcp, mysql, ...others } = payload;
      const currentState = Object.assign({}, state);

      const newConfig = {
        basic: Object.assign({}, BASIC.common, BASIC[run_type], others),
        ssl: Object.assign({}, SSL.common, SSL[run_type], ssl),
        tcp: Object.assign({}, TCP.common, TCP[run_type], tcp),
      };

      if (run_type === SERVER) {
        newConfig.mysql = Object.assign({}, MYSQL, mysql);
      }

      return deepAssign(currentState, newConfig);
    },
    changeType: (state, type) => {
      const newConfig = {
        basic: Object.assign({}, BASIC.common, BASIC[type]),
        ssl: Object.assign({}, SSL.common, SSL[type]),
        tcp: Object.assign({}, TCP.common, TCP[type]),
      };

      if (type === SERVER) {
        console.log("is ===");
        newConfig.mysql = Object.assign({}, MYSQL);
      }

      const result = deepTake(newConfig, state);
      console.log("====", result);
      return { type, ...result };
    },
  },
  effect: {
    getConfig: async (_payload, actions) => {
      const result = await axios.get("/api/trojanConfig");
      const { msg } = result.data;

      actions.config.update(JSON.parse(msg));
    },
    asyncPlus: async actions => {
      setTimeout(() => actions["config"].plus(), 300);
    },
    asyncMinus: async actions => {
      setTimeout(() => actions["config"].minus(), 300);
    },
  },
};
