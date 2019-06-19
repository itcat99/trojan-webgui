import { deepAssign } from "@plume/helper";
import { CLIENT, FORWARD, SERVER, BASIC, SSL, TCP, MYSQL } from "constants";

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
        ...Object.assign({}, BASIC.common, BASIC[run_type], others),
        ssl: Object.assign({}, SSL.common, SSL[run_type], ssl),
        tcp: Object.assign({}, TCP.common, TCP[run_type], tcp),
      };

      if (run_type === SERVER) {
        newConfig.mysql = Object.assign({}, MYSQL, mysql);
      }

      return deepAssign(currentState, newConfig);
    },
    minus: state => state - 1,
  },
  effect: {
    asyncPlus: async actions => {
      setTimeout(() => actions["config"].plus(), 300);
    },
    asyncMinus: async actions => {
      setTimeout(() => actions["config"].minus(), 300);
    },
  },
};
