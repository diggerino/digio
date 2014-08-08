var api = require('digio-api')
, print = require('../print')
, tools = require('../tools')

var actions = function (cmd, _config) {
  api = new api(tools.get_active_key(_config))

  cmd.register(
    'actions',
    'get',
    ['<id>'],
    'Retrieve a specific action object',
    function (id) {
      api.actions.get(id, function (err, data) {
        if (err) return print.error(err.message)
        console.log('')
        console.log('- Action:        ' + data.action.id)
        console.log('    Status:      ' + data.action.status)
        console.log('    Type:        ' + data.action.type)
        console.log('    Started:     ' + data.action.started_at)
        console.log('    Completed:   ' + data.action.completed_at)
        console.log('    ResourceID:  ' + data.action.resource_id)
        console.log('    ResourceType:' + data.action.resource_type)
        console.log('    Region:      ' + data.action.region)
        console.log('')
      })
    }
  )

  cmd.register(
    'actions',
    'list',
    [],
    'List all of the actions that have been executed on the current account',
    function () {
      api.actions.list(function (err, data) {
        if (err) return print.error(err.message)
        console.log('')
        console.log('Total actions: ' + data.meta.total)
        console.log('')
        data.actions.forEach(function (a) {
          console.log('- Action:        ' + a.id)
          console.log('    Status:      ' + a.status)
          console.log('    Type:        ' + a.type)
          console.log('    Started:     ' + a.started_at)
          console.log('    Completed:   ' + a.completed_at)
          console.log('    ResourceID:  ' + a.resource_id)
          console.log('    ResourceType:' + a.resource_type)
          console.log('    Region:      ' + a.region)
          console.log('')
        })
      })
    }
  )
}

module.exports = actions
