var tools = require('../tools')
, print = require('../print')

var config = function (cmd, _config) {

  var add_key = function (name, key) {
    var tmp_config = _config

    if (!name || !key)
      return print.error('Insufficient parameters. See "digio -h" for help')

    if (tmp_config.names.indexOf(name) != -1)
      return print.error('A key with that name already exists. Please try another name')

    tmp_config.names.push(name)
    tmp_config.keys.push(key)
    tmp_config.used = tmp_config.names.indexOf(name)

    tools.write_config(tmp_config, function (err, c) {
      if (err) return print.error('Unable to update config file!')

      print.success('Added key "' + name + '" with id ' +
        (c.names.indexOf(name) + 1) + ' and set it to active.')
    })
  }

  var use_key = function (name) {
    var conf = _config
    if (conf.names.indexOf(name) > -1) {
      conf.used = conf.names.indexOf(name)
      tools.write_config(conf, function (err, c) {
        if (err) return print.error('Unable to update config file!')

        print.success('Active API-key changed to "' + name + '" ('+ conf.keys[conf.used] + ')')
      })
    }
    else return print.error('No key named "' + name + '". See "digio config list" for a complete list of keys.')
  }

  var list_keys = function () {
    if (_config.keys.length === 0) return print.info('You have not added any API-keys to your config file yet, see "digio -h" for help.')

    keys = []
    for (var i = 0; i < _config.keys.length; i++) {
      var line = _config.names[i] + ' - ' + _config.keys[i]

      if (_config.used === i)
        line += ' (Active)'

      keys.push(line)
    }

    console.log('\nTotal API-keys: ' + _config.keys.length + '\n')
    print.list(keys)
    console.log('')
  }

  var delete_key = function (name) {
    var tmp_config = _config

    var i = tmp_config.names.indexOf(name)

    if (i < 0) return print.error('No such key "' + name + '"')
    if (tmp_config.used === i) tmp_config.used = 0

    tmp_config.keys.splice(i, 1)
    tmp_config.names.splice(i, 1)

    tools.write_config(tmp_config, function (err, c) {
      if (err) print.error('Unable to update config file!')

      print.success('Deleted key "' + name + '"')
    })
  }


  cmd.register(
    'config',
    'listkeys',
    [],
    'Display a list of all saved API-keys',
    list_keys
  )

  cmd.register(
    'config',
    'addkey',
    ['<name>', '<key>'],
    'Add a new API-key and set it to active',
    add_key
  )

  cmd.register(
    'config',
    'usekey',
    ['<name>'],
    'Select which API-key to use when connecting',
    use_key
  )

  cmd.register(
    'config',
    'deletekey',
    ['<name>'],
    'Remove an API-key from the config file',
    delete_key
  )

}

module.exports = config
