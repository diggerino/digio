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
        } catch (ex) {
          print.error('Unable to create config file!')
          return null
        }
      }

      try {
        var config = JSON.parse(fs.readFileSync(path.normalize(homedir + '/.digio'), 'utf8'))

        if (config)
          return config
        else
          handle_bad_config()
      }
      catch (ex) {
        handle_bad_config()
      }
    },

    write_config: function (conf, callback) {
      try {
        fs.writeFileSync(
            path.normalize(homedir + '/.digio'),
            JSON.stringify(conf, null, 4)
        )
        callback(null, conf)
      } catch (ex) {
        callback(conf)
      }
    },

    verify_config: function (conf) {
      if (!conf) return false

      if (conf.keys && conf.keys.length === 0) {
        print.info('You have not added any API-keys to your config file yet. See "digio help apikeys" for help.')
      }

      if (conf.used === -1) {
        print.error('You have not specified which API-key to use yet. See "digio -h" for help.')
      }

      return true
    },

    get_active_key: function (conf) {
        return conf.keys[conf.used]
    }
}

module.exports = tools
