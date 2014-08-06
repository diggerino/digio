var api = require('digio-api')
, tools = require('../tools')

var _config = tools.load_config()
if (!_config) return

api = new api(tools.get_active_key())

var domains = function (cmd) {

  cmd
    .command('domains')
    .description('List all domains')
    .action(function () {
      api.domains.list(function (err, data) {
        console.log(data)
      })
    })

  cmd
    .command('createdomain <domain> <ip>')
    .description('Create new domain record')
    .action(function (domain, ip_address) {
      api.domains.create(domain, ip_address, function (err, data) {
        console.log(data)
      })
    })
}

module.exports = domains
