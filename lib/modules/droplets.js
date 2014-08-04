var api = require('../api')
var tools = require('../tools')

var droplets = {
  list_droplets: function () {

    var conf = tools.load_config()
    if (!conf) return

    if (conf.keys.length === 0) {
        return tools.error('You have not added any API-keys to your config file yet. See "digio -h" for help.')
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
    
      console.log('')
      console.info('Total droplets: '+json.meta.total+'\n')

      var result = []
      json.droplets.forEach(function (droplet) {
        result.push(droplet.name + ' (ID: '+droplet.id+')\n')
      })
      tools.print_list(result)

    })
  }
}

module.exports = droplets
