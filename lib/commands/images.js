var api = require('digio-api')
, tools = require('../tools')

var images = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'images',
    'list',
    [],
    'List all available images',
    function () {
      api.images.list(function (err, data) {
        if (err) return tools.error(err.message)
        console.log(data)
      })
    }
  )
}

module.exports = images
