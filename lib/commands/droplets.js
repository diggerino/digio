var api = require('digio-api')
, tools = require('../tools')


var droplets = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

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
