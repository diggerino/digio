var api = require('digio-api')
, tools = require('../tools')

var actions = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'actions',
    'list',
    [],
    'List all of the actions that have been executed on the current account',
    function () {
      api.actions.list(function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    }
  )
}

module.exports = actions
