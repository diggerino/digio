var api = require('digio-api')
, print = require('../print')
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
        if (err) return print.error(err.message)
        console.log();
        console.log('[REMAINING:' + data['ratelimit-remaining'] + ']')
        console.log('    Limit:       ' + data['ratelimit-limit'])
        console.log('    Expires:     ' + new Date(data['ratelimit-reset'] * 1000))
        console.log('')
      })
    }
  )
}

module.exports = extras
