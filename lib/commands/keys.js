var api = require('digio-api')
, tools = require('../tools')

var keys = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'keys',
    'list',
    [],
    'List all keys',
    function () {
      api.keys.list(function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    }
  )
}

module.exports = keys
