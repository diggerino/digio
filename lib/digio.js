var api = require('digio-api')
, cmd = require('./cli')
, fs = require('fs')
, _package = require('../package.json')
, path = require('path')
, tools = require('./tools')

var digio = (function () {

    var _config = tools.load_config()
    if (!_config) return

    cmd
      .version('Digio v' + _package.version)

    var commands = fs.readdirSync(__dirname + '/commands').filter(function (e) {
      return /(\.(js)$)/i.test(path.extname(e))
    })

    console.log(commands);

    commands.forEach(function(command) {
      require('./commands/' + command)(cmd)
    });


    cmd.parse()

})()

module.exports = digio
