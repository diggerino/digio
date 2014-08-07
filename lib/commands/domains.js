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
        console.log('\nTotal domains: ' + data.meta.total + '\n')
        data.domains.forEach(function (dom) {
          console.log('- Domain:        ' + dom.name)
          console.log('    TTL:         ' + dom.ttl)
          console.log('    Zone File:   ' + dom.zone_file + '\n')
        })
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
        print.success(domain + ' (' + ip_address + ') created')
      })
    }
  )

  cmd.register(
    'domains',
    'delete',
    ['<id>'],
    'Delete a domain with a specific ID',
    function (domain) {
      api.domains.delete(domain, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Deleted domain "' + domain + '"')
      })
    }
  )

  cmd.register(
    'domains',
    'get',
    ['<domain>'],
    'Get details of a specific domain',
    function (domain) {
      api.domains.get(domain, function (err, data) {
        console.log('\n- Domain:        ' + data.domain.name)
        console.log('    TTL:         ' + data.domain.ttl)
        console.log('    Zone File:   ' + data.domain.zone_file + '\n')
      })
    }
  )


}

module.exports = domains
