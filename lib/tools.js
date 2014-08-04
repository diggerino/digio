#!/usr/bin/env node

var clc = require('cli-color')

var tools = {
    print: function (txt) {
        console.log('[i] ' + txt)
    },
    print_table: function (tbl) {},
    success: function (txt) {
        console.log('[i] ' + clc.green(txt))
    },
    warning: function (txt) {
        console.log('[!] ' + clc.yellow(txt))
    },
    error: function (txt) {
        console.log('[X] ' + clc.red(txt))
    },
    debug: function (file, func, txt) {
        console.log('[i] ' + clc.cyan('DEBUG:'))
        console.log('')
        console.log('File:\t\t' + clc.yellow(file))
        console.log('Function:\t' + clc.yellow(func))
        console.log('')
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
    }
}

module.exports = tools
