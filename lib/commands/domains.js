var api = require('digio-api')
, tools = require('../tools')

var _config = tools.load_config()
if (!tools.verify_config(_config)) return

api = new api(tools.get_active_key(_config))

var domains = function (cmd) {

  cmd
    .command('domains')
    .description('List all domains')
    .action(function () {
      api.domains.list(function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    })

  cmd
    .command('createdomain <domain> <ip>')
    .description('Create new domain record')
    .action(function (domain, ip_address) {
      api.domains.create(domain, ip_address, function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    })
}

module.exports = domains
