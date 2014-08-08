var api = require('digio-api')
, print = require('../print')
, tools = require('../tools')

var images = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'images',
    'delete',
    ['<id>'],
    'Delete an image',
    function (id) {
      api.images.delete(id, function(err, data) {
        if (err) return print error(err.message)
        print.success('image deleted')
      })
    }
  )

}

module.exports = images
