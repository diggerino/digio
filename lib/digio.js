var cmd = require('commander')
, _package = require('../package.json')
, tools = require('./tools')

var domains = require('./modules/domains')
var droplets = require('./modules/droplets')


var digio = {
  init: function () {
    cmd
      .version('Digio v' + _package.version)
      .option('domains [token]', 'List all domains', domains.list_all_domains)
      .option('createdomain [token] [domain] [ip]', 'Create new domain record', domains.create_domain_record, process.argv)
      .option('droplets', 'List all droplets', droplets.list_droplets)

      .option('addkey <name> <key>', 'Add a new API key to the config file.', tools.add_key)
      .option('usekey <name>', 'Use key with <name>', tools.use_key)
      .option('keys', 'List all available API keys', tools.list_keys)
      .parse(process.argv)

    if (process.argv.length < 3) cmd.help()
  }
}

module.exports = digio
