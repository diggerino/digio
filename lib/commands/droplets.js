var api = require('digio-api')
, tools = require('../tools')

var _config = tools.load_config()
if (!tools.verify_config(_config)) return

api = new api(tools.get_active_key(_config))

var droplets = function (cmd) {

  cmd.register(
    'droplets',
    'list',
    [],
    'List all droplets',
    function () {
      api.droplets.list(function (err, data) {
        if (err) return tools.error(err.message)
        console.log(JSON.stringify(data, null, 4))
      })
    }
  )
}

module.exports = droplets
