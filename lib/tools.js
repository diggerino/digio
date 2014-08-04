#!/usr/bin/env node

var clc = require('cli-color')
var fs = require('fs')
var os = require('os')
var path = require('path')

var homedir = (process.env.HOME) ? process.env.HOME : process.env.HOMEPATH;
var default_config = {
    "used": -1,
    "names" : [

    ],
    "keys": [
        
    ],
    "version": 1
}

var tools = {

    /*
        Console output functions
    */

    print_table: function (tbl) {},
    print_list: function (list) {
        for (var i = 0; i < list.length; i++) {
            console.log('    ' + (i+1) + '.\t' + list[i])
        }
    },
    success: function (txt) {
        console.log(clc.green(txt))
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

    load_conf: function (callback) {
        fs.exists(path.normalize(homedir + '/.digio'), function (exists) {
            if (!exists) {
                fs.writeFile(
                    path.normalize(homedir + '/.digio'),
                    JSON.stringify(default_config, null, 4),
                    function (err) {
                        if (err) return tools.error('Unable to create config file!')
                        console.log('Info: Detected first use, config file created in ' +
                        path.normalize(homedir + '/.digio'))
                    }
                )
            }
            fs.readFile(path.normalize(homedir + '/.digio'), function (err, data) {
                if (err) return callback(err)
                if (JSON.parse(data.toString())['version'] != default_config['version'])
                    tools.error('Outdated config file. ' +
                        'Please remove the old config file at ' +
                        path.normalize(homedir + '/.digio'))
                return callback(null, JSON.parse(data.toString()))
            })

        })
    },

    write_conf: function (conf, callback) {
        fs.writeFile(
            path.normalize(homedir + '/.digio'),
            JSON.stringify(conf, null, 4),
            function (err) {
                if (err) return callback(err)
                callback(null, conf)
            }
        )
    },

    add_key: function (name, key) {
        tools.load_conf(function (err, conf) {
            if (err) return tools.error('Unable to load config file.')
            if (conf.names.indexOf(name) != -1) {
                return tools.error('A key with that name already exists. Please try another name')
            }
            conf.names.push(name)
            conf.keys.push(key)

            tools.write_conf(conf, function (err, c) {
                if (err) return tools.error('Unable to update config file!')
                tools.success('Successfully added key ' + name + ' with id ' +
                    c.names.indexOf(name))
            })
        })
    },

    use_key: function (name) {
        tools.load_conf(function (err, conf) {
            if (err) return tools.error('Unable to load config file.')
            if (conf.names.indexOf(name) > -1) {
                conf.used = conf.names.indexOf(name)
                tools.write_conf(conf, function (err, c) {
                    if (err) return tools.error('Unable to update config file!')
                    tools.success('API key changed to: ' + name)
                })
            }
            else return tools.error('No key named ' + name + '. See "digio keys" for a complete list.')
        })
    },

    list_keys: function () {
        tools.load_conf(function (err, conf) {
            if (err) return tools.error('Unable to load config file.')
            keys = []
            for (var i = 0; i < conf.keys.length; i++) {
                var line = conf.names[i] + ' - ' + conf.keys[i]
                if (conf.used === i) line += ' (Active)'
                keys.push(line)
            }
            console.log('API keys stored in config file:\n')
            tools.print_list(keys)
            console.log('')
        })
    }
}

module.exports = tools
