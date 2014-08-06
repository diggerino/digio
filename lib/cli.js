var path = require('path')

var cli = (function () {
    
    var _commands = {}
    var _version = ''

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
            var arg = process.argv.splice(1, 10)
            arg[0] = path.basename(arg[0])
            console.log(arg)
            console.log(_commands)
        }
    }
})()

module.exports = cli
