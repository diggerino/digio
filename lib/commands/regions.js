var api = require('digio-api')
, tools = require('../tools')


var regions = function (cmd) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'regions',
    'list',
    [],
    'List all regions',
    function () {
      api.regions.list(function (err, data) {
        if (err) return tools.error(err.message)
          console.log('\nTotal regions: ' + data.meta.total + '\n')
          data.regions.forEach(function (reg) {
            console.log('- Slug:          ' + reg.slug)
            console.log('    Name:        ' + reg.name)
            console.log('    Sizes:       ' + reg.sizes.join())
            console.log('    Available:   ' + reg.available)
            console.log('    Features:    ')
            reg.features.forEach(function (feature) {
              console.log('      - ' + feature)
            })
            console.log('')
        })
      })
    }
  )
}

module.exports = regions
