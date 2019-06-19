// const { deepAssign } = require("../../scripts/helpers");

const BASIC = {
  common: {
    local_addr: "127.0.0.1",
    local_port: 1080,
    remote_addr: "",
    remote_port: 443,
    password: [],
    log_level: 1,
  },
  client: {
    run_type: "client",
  },
  forward: {
    run_type: "forward",
    udp_timeout: 60,
    target_addr: "127.0.0.1",
    target_port: 5901,
  },
  server: {
    run_type: "server",
  },
};

const SSL = {
  common: {
    cert: "",
    cipher:
      "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305-SHA256:ECDHE-RSA-CHACHA20-POLY1305-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:RSA-AES128-GCM-SHA256:RSA-AES256-GCM-SHA384:RSA-AES128-SHA:RSA-AES256-SHA:RSA-3DES-EDE-SHA",
    sni: "",
    alpn: ["http/1.1"],
    reuse_session: true,
    session_ticket: false,
    curves: "",
  },
  client: {
    verify: true,
    verify_hostname: true,
  },
  forward: {
    verify: true,
    verify_hostname: true,
  },
  server: {
    key: "",
    key_password: "",
    prefer_server_cipher: true,
    session_timeout: 600,
    plain_http_response: "",
    dhparam: "",
  },
};

const TCP = {
  common: {
    no_delay: true,
    keep_alive: true,
    fast_open: false,
    fast_open_qlen: 20,
  },
  client: {},
  forward: {},
  server: {
    prefer_ipv4: false,
  },
};

const MYSQL = {
  enabled: false,
  server_addr: "127.0.0.1",
  server_port: 3306,
  database: "trojan",
  username: "trojan",
  password: "",
};

const CLIENT = "client";
const FORWARD = "forward";
const SERVER = "server";

// const common = {
//   run_type: "client",
//   local_addr: "127.0.0.1",
//   local_port: 1080,
//   remote_addr: "",
//   remote_port: 443,
//   password: [],
//   log_level: 1,
//   ssl: {
//     cert: "",
//     cipher:
//       "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305-SHA256:ECDHE-RSA-CHACHA20-POLY1305-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-RSA-AES256-SHA:RSA-AES128-GCM-SHA256:RSA-AES256-GCM-SHA384:RSA-AES128-SHA:RSA-AES256-SHA:RSA-3DES-EDE-SHA",
//     sni: "",
//     alpn: ["http/1.1"],
//     reuse_session: true,
//     session_ticket: false,
//     curves: "",
//   },
//   tcp: {
//     no_delay: true,
//     keep_alive: true,
//     fast_open: false,
//     fast_open_qlen: 20,
//   },
// };

// const CLIENT = deepAssign(Object.assign({}, common), {
//   ssl: {
//     verify: true,
//     verify_hostname: true,
//   },
// });

// const FORWARD = deepAssign(Object.assign({}, common), {
//   run_type: "forward",
//   udp_timeout: 60,
//   target_addr: "127.0.0.1",
//   target_port: 5901,
//   ssl: {
//     verify: true,
//     verify_hostname: true,
//   },
// });

// const SERVER = deepAssign(Object.assign({}, common), {
//   run_type: "server",
//   ssl: {
//     key: "",
//     key_password: "",
//     prefer_server_cipher: true,
//     session_timeout: 600,
//     plain_http_response: "",
//     dhparam: "",
//   },
//   tcp: {
//     prefer_ipv4: false,
//   },
//   mysql: {
//     enabled: false,
//     server_addr: "127.0.0.1",
//     server_port: 3306,
//     database: "trojan",
//     username: "trojan",
//     password: "",
//   },
// });

const CATEGOTE_SELECT = [
  "run_type",
  "verify",
  "verify_hostname",
  "prefer_server_cipher",
  "reuse_session",
  "session_ticket",
  "prefer_ipv4",
  "no_delay",
  "keep_alive",
  "fast_open",
  "enabled",
];

module.exports = {
  CATEGOTE_SELECT,
  CLIENT,
  FORWARD,
  SERVER,
  BASIC,
  SSL,
  TCP,
  MYSQL,
};
