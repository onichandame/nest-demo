export default {
  keys: `asdf`,
  security: { csrf: { enable: false } },
  httpProxy: {
    "/api/user": {
      target: `http://localhost:3001`,
    },
    "/api/org": {
      target: `http://localhost:3002`,
    },
  },
};
