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

var tools = {
    /*
        Config file handling
    */

    load_config: function () {
      var handle_bad_config = function () {
        try {
          print.info('Detected first use, creating default config file in ' + path.normalize(homedir + '/.digio'))
          fs.writeFileSync(path.normalize(homedir + '/.digio'), JSON.stringify(default_config, null, 4))
          return default_config
        }
        catch (ex) {
          print.error('Unable to create config file!')
          return null
        }
      }

      try {
        var _config = JSON.parse(fs.readFileSync(path.normalize(homedir + '/.digio'), 'utf8'))

        if (_config) return _config

        return handle_bad_config()
      }
      catch (ex) {
        return handle_bad_config()
      }
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
      if (!_config) return false

      if (_config.keys && _config.keys.length === 0) {
        print.info('You have not added any API-keys to your config file yet. See "digio help config" for help.')
      }
      return true
    },

    get_active_key: function (_config) {
        return _config.keys[_config.used]
    }
}

module.exports = tools
