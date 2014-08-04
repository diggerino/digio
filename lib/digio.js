var cmd = require('commander')
, _package = require('../package.json')

var droplets = require('./modules/droplets')


var digio = {
  init: function () {
    cmd
      .version('Digio v' + _package.version)
      .option('droplets', 'List all droplets', droplets.list_droplets)
      .parse(process.argv)

    if (process.argv.length < 3) cmd.help()
  }
}

module.exports = digio
