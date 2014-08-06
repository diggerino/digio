var api = require('digio-api')
, tools = require('../tools')

var _config = tools.load_config()
if (!_config) return

api = new api(tools.get_active_key())

var droplets = function (cmd) {

  cmd
    .command('droplets')
    .description('List all droplets')
    .action(function () {
      api.droplets.list(function (err, data) {
        console.log(data)
      })
    })

}

module.exports = droplets
