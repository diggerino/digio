var api = require('digio-api')
, cmd = require('./cli')
, fs = require('fs')
, _package = require('../package.json')
, path = require('path')
, tools = require('./tools')

var digio = (function () {

    cmd
      .version('Digio v' + _package.version)

    var _config = tools.load_config()
    if (_config && tools.verify_config(_config)) {
      var commands = fs.readdirSync(__dirname + '/commands').filter(function (e) {
        return /(\.(js)$)/i.test(path.extname(e))
      })

      commands.forEach(function(command) {
        require('./commands/' + command)(cmd, _config)
      });
    }

    cmd.parse()

})()

module.exports = digio
