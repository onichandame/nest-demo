const egg = require('egg');

egg.startCluster({
  workers: 1,
  baseDir: __dirname,
});
