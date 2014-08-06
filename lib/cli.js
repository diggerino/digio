var path = require('path')

var cli = (function () {
    
    var _commands = {}
    var _version = ''
    var _self = process.argv[0]

    return {
        register: function (mod, cmd, args, desc, func) {
            if (!mod || !cmd || !desc || !func)
              return tools.error('Missing argument(s) in cli.register')
            if (!_commands[mod])
              _commands[mod] = {}
            _commands[mod][cmd] = {args: args, desc: desc, exec: func}
        },

        version: function (ver) {
            _version = ver
        },

        parse: function () {
            var args = process.argv
            if (args.length <= 2 || args[1] === 'help') return cli.help(args[2])
            console.log(args)
            console.log(_commands)
        },

        help: function (mod) {
            console.log('Digio v' + _version + '\n')
            console.log('  Usage: ' + _self + ' <module> <command> [args]\n')
            if (mod) {
              console.log('  Commands:\n')
            }
            else {
              console.log('  Modules:\n')
            }
            console.log('Type ' + _self + ' help <module> for available commands')
        }
    }
})()

module.exports = cli
