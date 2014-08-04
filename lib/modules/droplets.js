var api = require('../api')
var tools = require('../tools')

var droplets = {
  list_droplets: function (token) {
    var options = {
      action: 'droplets',
      token: token
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
  }
}

module.exports = droplets
