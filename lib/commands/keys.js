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
        console.log('\nTotal keys: ' + data.meta.total)
        data.ssh_keys.forEach(function (key) {
          console.log('[' + key.name + ']')
          console.log('    ID:          ' + key.id)
          console.log('    Fingerprint: ' + key.fingerprint)
          console.log('    Public Key:  ' + key.public_key)
          console.log('')
        })
      })
    }
  )

  cmd.register(
    'keys',
    'get',
    ['<id/fingerprint>'],
    'Get details of an ssh key by ID or fingerprint',
    function (id) {
      api.keys.get(id, function (err, data) {
        if (err) return print.error(err.message)
        console.log('')
        console.log('[' + key.name + ']')
        console.log('    ID:          ' + key.id)
        console.log('    Fingerprint: ' + key.fingerprint)
        console.log('    Public Key:  ' + key.public_key)
        console.log('')
      })
    }
  )

  cmd.register(
    'keys',
    'delete',
    ['<id/fingerprint>'],
    'Delete an ssh key by ID or fingerprint',
    function (id) {
      api.keys.delete(id, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Deleted key ' + id)
      })
    }
  )

  cmd.register(
    'keys',
    'update',
    ['<id/fingerprint>', '<name>'],
    'Update the name of an SSH key by ID or fingerprint',
    function (id, name) {
      api.keys.update(id, name, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Changed name of SSH key ' + id + ' to ' + name)
      })
    }
  )

  cmd.register(
    'keys',
    'create',
    ['<name>', '<pub_key>'],
    'Create a new SSH key',
    function (name, pub_key) {
      api.keys.create(name, pub_key, function (err, data) {
        if (err) return print.error(err.message)
        print.success('Created SSH key "' + name + '"')
      })
    }
  )
}

module.exports = keys
