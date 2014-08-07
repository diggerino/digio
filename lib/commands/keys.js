var api = require('digio-api')
, print = require('../print')
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
        if (err) return print.error(err.message)
        console.log(data)
      })
    }
  )
}

module.exports = keys
