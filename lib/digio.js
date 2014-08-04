var cmd = require('commander')
, _package = require('../package.json')

var domains = require('./modules/domains')
var droplets = require('./modules/droplets')


var digio = {
  init: function () {
    cmd
      .version('Digio v' + _package.version)
      .option('domains [token]', 'List all domains', domains.list_all_domains)
      .option('createdomain [token] [domain] [ip]', 'Create new domain record', domains.create_domain_record, process.argv)
      .option('droplets [token]', 'List all droplets', droplets.list_droplets)
      .parse(process.argv)

    if (process.argv.length < 3) cmd.help()
  }
}

module.exports = digio
