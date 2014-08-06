var tools = require('./tools')

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
      if (args[0] === 'node') args = process.argv.splice(1)
      if (args.length < 2 ||
        args[1] === 'help' ||
        args[1] === '-h' ||
        args[1] === '--help') return cli.help(args[2])
      if (args[1] === '-v' ||
        args[1] === '--version') return console.log('Digio v' + _version)

      var mod = args[1]
      var com = args[2]

      if (!_commands[mod]) return tools.error('No such module "' + mod + '"')
      if (args.length === 2) return cli.help(mod)
      if (_commands[mod] && !_commands[mod][com])
        return tools.error('No such command "' + mod + ' ' + com + '"')

      if (_commands[mod][com].args.length > args.length - 3)
        return tools.error('Insufficient arguments given')

      var params = args.splice(3)

      _commands[mod][com].exec.apply(this, params)
    },

    help: function (mod) {
      if (mod && !_commands[mod]) return tools.error('No such module "' + mod + '"')
      console.log('Digio v' + _version + '\n')

      if (mod) console.log('  Usage: ' + _self + ' '+mod+' <command> [args]\n')
      else console.log('  Usage: ' + _self + ' <module> <command> [args]\n')

      if (mod) {
        console.log('  Commands:\n')
        var _coms = Object.getOwnPropertyNames(_commands[mod]).sort()
        _coms.forEach(function (c) {
          console.log('  - ' + c + ' ' + _commands[mod][c].args.join(' ') + ' ' +
            '(' + _commands[mod][c].desc + ')')
        })
        console.log('')
      }
      else {
        console.log('  Modules:\n')
        var _modules = Object.getOwnPropertyNames(_commands).sort()
        _modules.forEach(function (m) {
          console.log('  - ' + m)
        })
        console.log('')
      }
      if (!mod)
        console.log('Type "' + _self + ' help <module>" for available commands')
    }
  }
})()

module.exports = cli
