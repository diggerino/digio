#!/usr/bin/env node

var api = require('digio-api')
, fs = require('fs')
, path = require('path')
, print = require('./print')
, tools = require('./tools')

var cmd = require('./cli')
, _package = require('../package.json')

var digio = (function () {
  cmd.version('Digio v' + _package.version)

  var _config = tools.load_config()

  if (tools.verify_config(_config)) {
    var commands = fs.readdirSync(__dirname + '/commands').filter(function (e) {
      return /(\.(js)$)/i.test(path.extname(e))
    })

    commands.forEach(function(command) {
      require('./commands/' + command)(cmd, _config)
    });
  }

  cmd.parse()

  if (tools.verify_config(_config) && _config.keys.length === 0) {
    print.info('You have not added any API-keys to your config file yet. See "digio help config" for help.')
  }
})()

module.exports = digio
