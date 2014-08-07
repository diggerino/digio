var api = require('digio-api')
, tools = require('../tools')

var sizes = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'sizes',
    'list',
    [],
    'List all sizes',
    function () {
      api.sizes.list(function (err, data) {
        if (err) return tools.error(err.message)
          console.log('\nTotal sizes: ' + data.meta.total + '\n')
          data.sizes.forEach(function (size) {
            console.log('- Slug:          ' + size.slug)
            console.log('    Memory       ' + size.memory + 'MB')
            console.log('    VCPUs:       ' + size.vcpus)
            console.log('    Disk:        ' + size.disk + 'GB')
            console.log('    Transfer:    ' + size.transfer + 'GB/mo')
            console.log('    Price/mo:    $' + size.price_monthly)
            console.log('    Price/hr:    $' + size.price_hourly)
            console.log('    Regions:     ' + size.regions.join())
            console.log('')
        })
      })
    }
  )
}

module.exports = sizes
