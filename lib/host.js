var _ = require('lodash-contrib');
var request = require('request');

var initScript = require('./init.js');
var consolelogger = require('./consolelogger.js');

module.exports = function host(cb) {
  var url = 'http://' + process.env.FH_MILLICORE + '/box/srv/1.1/ide/apps/app/hosts';
  var data = {
    "guid": process.env.FH_INSTANCE,
    "env": process.env.FH_ENV
  }

  var logLevel = parseInt(process.env.MBAAS_LOG_LEVEL) || 2;
  var logger = new consolelogger.ConsoleLogger(logLevel);
  initScript(logger);

  logger.info(url);
  //logger.info(JSON.stringify(data));
  //logger.info(JSON.stringify(process.env.FH_ENV));
  logger.info(JSON.stringify(process.env));

  request.post({
    url: url,
    json: true,
    body: data
  }, function (err, res, body) {
    if (err) return cb(err);

    return cb(err, _.getPath(body, "hosts.url"));
  });
}
