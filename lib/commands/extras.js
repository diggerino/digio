var api = require('digio-api')
, tools = require('../tools')

var extras = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'extras',
    'rate',
    [],
    'Display the rate limiting information',
    function () {
      api.extras.rate(function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    }
  )
}

module.exports = extras
