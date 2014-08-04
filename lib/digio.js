var cmd = require('commander')
, _package = require('../package.json')
, tools = require('./tools')

var droplets = require('./modules/droplets')


var digio = {
  init: function () {
    cmd
      .version('Digio v' + _package.version)
      .option('addkey <name> <key>', 'Add a new API key to the config file.', tools.add_key)
      .option('usekey <name>', 'Use key with <name>', tools.use_key)
      .option('keys', 'List all available API keys', tools.list_keys)
      .option('droplets', 'List all droplets', droplets.list_droplets)
      .parse(process.argv)

    if (process.argv.length < 3) cmd.help()
  }
}

module.exports = digio
