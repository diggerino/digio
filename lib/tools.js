#!/usr/bin/env node

var clc = require('cli-color')

var tools = {
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
    }
}

module.exports = tools
