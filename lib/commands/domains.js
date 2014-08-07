var api = require('digio-api')
, tools = require('../tools')

var domains = function (cmd) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'domains',
    'list',
    [],
    'List all domains',
    function () {
      api.domains.list(function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    }
  )

  cmd.register(
    'domains',
    'create',
    ['<domain>', '<ip>'],
    'Create a new domain',
    function (domain, ip_address) {
      api.domains.create(domain, ip_address, function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    }
  )
}

module.exports = domains
