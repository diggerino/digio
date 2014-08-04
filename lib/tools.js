#!/usr/bin/env node

var clc = require('cli-color')
var fs = require('fs')
var os = require('os')
var path = require('path')

var homedir = (process.env.HOME) ? process.env.HOME : process.env.HOMEPATH;
var default_config = {
    "keys": {}
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
    }
}

module.exports = tools
