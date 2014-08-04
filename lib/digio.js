#!/usr/bin/env node

var homedir = (process.env.HOME) ? process.env.HOME : process.env.HOMEPATH;

var cmd = require('commander')
, _package = require('../package.json')
, tools = require('./tools')

var domains = require('./modules/domains')
var droplets = require('./modules/droplets')


var digio = {
  init: function () {

    var _config = tools.load_config()
    if (!_config) return

    cmd
      .version('Digio v' + _package.version)
      .option('keys', 'List all available API keys', tools.list_keys)
      .option('addkey <name> <key>', 'Add a new API-key to the config file', tools.add_key, process.argv[4])
      .option('usekey <name>', 'Use key with <name>', tools.use_key)
      .option('deletekey <name>', 'Delete key with <name>', tools.delete_key)
      .option('domains', 'List all domains', domains.list_all_domains)
      .option('createdomain <domain> <ip>', 'Create new domain record', domains.create_domain_record, process.argv[4])
      .option('droplets', 'List all droplets', droplets.list_droplets)
      .parse(process.argv)

    if (process.argv.length < 3) {
        console.log('Digio v' + _package.version + ' - DigitalOcean API v2.0 CLI')
        cmd.help()
    }
  }
}

module.exports = digio
