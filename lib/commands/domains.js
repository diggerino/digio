var api = require('digio-api')
, print = require('../print')
, tools = require('../tools')

var domains = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'domains',
    'list',
    [],
    'List all domains',
    function () {
      api.domains.list(function (err, data) {
        if (err) return print.error(err.message)

        print.list(JSON.parse(data).domains.map(
          function (e) {
            return e.name
          })
        )
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
        if (err) return print.error(err.message)
        console.log(data)
      })
    }
  )
}

module.exports = domains
