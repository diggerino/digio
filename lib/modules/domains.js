var api = require('../api')
var tools = require('../tools')

var domains = {
  create_domain_record: function (domain, ip_adress) {

    if (!tools.verify_config()) return

    var conf = tools.load_config()
    var options = {
      action: 'domains',
      method: 'POST',
      body: JSON.stringify({
        name: domain,
        ip_address: ip_address
      }),
      token: conf.keys[conf.used]
    }

    api.call(options, function (err, res) {
      if (err) {
        tools.error(err.message)
        return
      }

      var domain = JSON.parse(res).domain
      console.log(domain);
      var result = []
      result.push()
      tools.success(domain.name + ' successfully created!')
    })
  },

  list_all_domains: function () {

    if (!tools.verify_config()) return

    var conf = tools.load_config()
    var options = {
      action: 'domains',
      token: conf.keys[conf.used]
    }

    api.call(options, function (err, res) {
      if (err) {
        tools.error(err.message)
        return
      }

      var json = JSON.parse(res)

      console.log('\nTotal domains: ' + json.meta.total + '\n')

      var result = []
      json.domains.forEach(function (domain) {
        result.push(domain.name)
      })
      tools.print_list(result)
      console.log('')

    })
  }
}

module.exports = domains
