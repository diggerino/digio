#!/usr/bin/env node

var clc = require('cli-color')

var tools = {
    print: function (txt) {
        console.log('[i] ' + txt)
    },
    print_table: function (tbl) {},
    warning: function (txt) {
        console.log('[!] ' + clc.yellow(txt))
    },
    error: function (txt) {
        console.log('[X] ' + clc.red(txt))
    },
    debug: function (file, func, txt) {
        console.log('[i] ' + clc.cyan('DEBUG:'))
        console.log(clc.yellow(file))
        console.log(clc.yellow(func))
        console.log('\n')
        console.log(txt)
        console.log('\n')
    }
}

module.exports = tools
