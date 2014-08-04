var api = require('../api')
var tools = require('../tools')

var droplets = {
  list_droplets: function () {

    var conf = null;

    tools.load_conf(function (err, conf) {
        if (err) return tools.error('Could not load config file.')
        if (conf.keys.length === 0) {
            return tools.error('You have not added any API keys. Please use "digio addkey <name> <key>"')
        }

        var options = {
          action: 'droplets',
          token: conf['keys'][conf.used]
        }

        api.call(options, function (err, res) {
          if (err) {
            tools.error(err.message)
            return
          }

          var json = JSON.parse(res)

          tools.success('\nDroplets: ' + json.meta.total)

          var result = []
          json.droplets.forEach(function (droplet) {
            result.push(droplet.name + ' ('+droplet.id+')\n')
          })
          tools.print_list(result)

        })
    })
  }
}

module.exports = droplets
