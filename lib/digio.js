var homedir = (process.env.HOME) ? process.env.HOME : process.env.HOMEPATH;

var api = require('digio-api')
, cmd = require('commander')
, _package = require('../package.json')
, tools = require('./tools')

var digio = {
  init: function () {

    var _config = tools.load_config()
    if (!_config) return

    cmd
      .version('Digio v' + _package.version)

    cmd
      .command('keys')
      .description('List all available API keys')
      .action(tools.list_keys)

    cmd
      .command('addkey <name> <key>')
      .description('Add a new API-key to the config file')
      .action(tools.add_key)

    cmd
      .command('usekey <name>')
      .description('Set key with <name> as active')
      .action(tools.use_key)

    cmd
      .command('deletekey <name>')
      .description('Delete key with <name>')
      .action(tools.delete_key)

    cmd
      .command('droplets')
      .description('List all droplets')
      .action(droplets.list_droplets)

    cmd
      .command('domains')
      .description('List all domains')
      .action(domains.list_all_domains)

    cmd
      .command('createdomain <domain> <ip>')
      .description('Create new domain record')
      .action(domains.create_domain_record)

    cmd.parse(process.argv)

    if (process.argv.length < 3) {
        console.log('Digio - DigitalOcean API v2.0 CLI')
        cmd.help()
    }
  }
}

module.exports = digio
