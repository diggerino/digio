var fs = require('fs')
, os = require('os')
, path = require('path')
, print = require('./print')

var homedir = (process.env.HOME) ? process.env.HOME : process.env.HOMEPATH

var default_config = {
    "used": -1,
    "names" : [],
    "keys": [],
    "version": 1
}

var handle_bad_config = function () {
  print.info('Detected first use, creating default config file in ' + path.normalize(homedir + '/.digio\n'))

  try {
    fs.writeFileSync(path.normalize(homedir + '/.digio'), JSON.stringify(default_config, null, 4))
  }
  catch (ex) {
    print.error('Unable to create config file!')
    return null
  }

  return default_config
}

var tools = {
    /*
        Config file handling
    */

    load_config: function () {
      var _config = null

      try {
        _config = JSON.parse(fs.readFileSync(path.normalize(homedir + '/.digio'), 'utf8'))
      }
      catch (ex) {
        return handle_bad_config()
      }

      return _config
    },

    write_config: function (_config, callback) {
      try {
        fs.writeFileSync(
            path.normalize(homedir + '/.digio'),
            JSON.stringify(_config, null, 4)
        )

        callback(null, _config)
      }
      catch (ex) {
        callback(_config)
      }
    },

    verify_config: function (_config) {
      if (!_config)
        return false

      if (!_config.keys)
        handle_bad_config()

      return true
    },

    get_active_key: function (_config) {
        return _config.keys[_config.used]
    }
}

module.exports = tools
