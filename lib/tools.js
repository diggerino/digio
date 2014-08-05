#!/usr/bin/env node

var clc = require('cli-color')
var fs = require('fs')
var os = require('os')
var path = require('path')

var homedir = (process.env.HOME) ? process.env.HOME : process.env.HOMEPATH;
var default_config = {
    "used": -1,
    "names" : [],
    "keys": [],
    "version": 1
}

var tools = {

    /*
        Console output functions
    */

    print_table: function (tbl) {},
    print_list: function (list) {
        for (var i = 0; i < list.length; i++) {
            console.log('    ' + (i + 1) + '.\t' + list[i])
        }
    },
    info: function (txt) {
        console.log(clc.cyan('Info: ') + txt)
    },
    success: function (txt) {
        console.log(clc.green('Success: ') + txt)
    },
    warning: function (txt) {
        console.log(clc.yellow('Warning: ') + txt)
    },
    error: function (txt) {
        console.error(clc.red('Error: ') + txt)
    },
    debug: function (file, func, txt) {
        console.log('========')
        console.log(clc.cyan('DEBUG:'))
        console.log('--------')
        console.log('File:\t\t' + clc.yellow(file))
        console.log('Function:\t' + clc.yellow(func))
        console.log('--------')
        if (txt instanceof Array) {
            txt.forEach(function (line) {
                console.log(line)
            })
        }
        else if (typeof txt == 'string') {
            console.log(txt)
        }
        else {
            tools.error('Unknown input format in debug-print.')
        }
        console.log('')
    },

    /*
        Config file handling
    */

    // Synchronous load / create if non-existant
    load_config: function () {
        try {
            return JSON.parse(fs.readFileSync(path.normalize(homedir + '/.digio'))
                              .toString())
        } catch (ex) {
            try {
                tools.info('Detected first use, creating default config file in ' +
                    path.normalize(homedir + '/.digio'))
                fs.writeFileSync(path.normalize(homedir + '/.digio'),
                    JSON.stringify(default_config, null, 4))
                return default_config
            } catch (exe) {
                tools.error('Unable to create config file!')
                return null
            }
        }
    },

    write_config: function (conf, callback) {
        fs.writeFile(
            path.normalize(homedir + '/.digio'),
            JSON.stringify(conf, null, 4),
            function (err) {
                if (err) return callback(err)
                callback(null, conf)
            }
        )
    },

    verify_config: function () {
        var conf = tools.load_config()
        if (conf) {
            if (conf.keys.length === 0) {
                tools.error('You have not added any API-keys to your config file yet. See "digio -h" for help.')
                return false
            }
            if (conf.used === -1) {
                tools.error('You have not specified which API-key to use yet. See "digio -h" for help.')
                return false
            }
            return true
        }
        else {
            return false
        }
    },

    add_key: function (name, key) {
        var conf = tools.load_config()
        if (!conf) return
        if (!name || !key) return tools.error('Insufficient parameters. See "digio -h" for help.')
        if (conf.names.indexOf(name) != -1) {
            return tools.error('A key with that name already exists. Please try another name')
        }
        conf.names.push(name)
        conf.keys.push(key)
        conf.used = conf.names.indexOf(name)

        tools.write_config(conf, function (err, c) {
            if (err) return tools.error('Unable to update config file!')
            tools.success('Added key "' + name + '" with id ' +
                (c.names.indexOf(name) + 1) + ' and set it to active.')
        })
    },

    use_key: function (name) {
        var conf = tools.load_config()
        if (!conf) return
        if (conf.names.indexOf(name) > -1) {
            conf.used = conf.names.indexOf(name)
            tools.write_config(conf, function (err, c) {
                if (err) return tools.error('Unable to update config file!')
                tools.success('Active API-key changed to "' +
                    name + '" ('+
                    conf.keys[conf.used] +
                    ')')
            })
        }
        else return tools.error('No key named "' + name + '". See "digio keys" for a complete list.')
    },

    list_keys: function () {
        var conf = tools.load_config()
        if (!conf) return
        if (conf.keys.length === 0) return tools.info('You have not added any API-keys to your config file yet. See "digio -h" for help.')

        keys = []
        for (var i = 0; i < conf.keys.length; i++) {
            var line = conf.names[i] + ' - ' + conf.keys[i]
            if (conf.used === i) line += ' (Active)'
            keys.push(line)
        }
        console.log('\nTotal API-keys: ' + conf.keys.length + '\n')
        tools.print_list(keys)
        console.log('')
    },

    delete_key: function (name) {
        var conf = tools.load_config()
        if (!conf) return

        var i = conf.names.indexOf(name)
        if (i < 0) return tools.error('No such key "' + name + '"')
        if (conf.used === i) conf.used = 0
        conf.keys.splice(i, 1)
        conf.names.splice(i, 1)
        tools.write_config(conf, function (err, c) {
            if (err) return tools.error('Unable to update config file!')
            tools.success('Removed key "' + name + '"')
        })
    },
}

module.exports = tools
