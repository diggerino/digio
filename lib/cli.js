var print = require('./print')
, tools = require('./tools')
, path = require('path')

var cli = (function () {
  var _commands = {}
  var _version = ''
  var _self = path.basename(process.argv[1])

  return {
    register: function (mod, cmd, args, desc, func) {
      if (!mod || !cmd || !desc || !func)
        return print.error('Missing argument(s) in cli.register')

      if (!_commands[mod])
        _commands[mod] = {}

      _commands[mod][cmd] = {args: args, desc: desc, exec: func}
    },

    version: function (ver) {
      _version = ver
    },

    parse: function () {
      var args = process.argv.splice(2)

      if (args.length < 1 ||
        args[0] === 'help' ||
        args[0] === '-h' ||
        args[0] === '--help') return cli.help(args[1])

      if (args[0] === '-v' || args[0] === '--version')
        return console.log(_version)

      var mod = args[0]
      var com = args[1]

      if (!_commands[mod]) return print.error('No such module "' + mod + '"')
      if (args.length === 1) return cli.help(mod)
      if (_commands[mod] && !_commands[mod][com])
        return print.error('No such command "' + mod + ' ' + com + '"')

      if (_commands[mod][com].args.length > args.length - 2)
        return print.error('Insufficient arguments given')

      var params = args.splice(2)

      _commands[mod][com].exec.apply(this, params)
    },

    help: function (mod) {
      if (mod && !_commands[mod])
        return print.error('No such module "' + mod + '"')

      console.log(_version + '\n')

      if (mod)
        console.log('  Usage: %s %s <command> [args]\n', _self, mod)
      else
        console.log('  Usage: %s <module> <command> [args]\n', _self)

      if (mod) {
        console.log('  Commands:\n')
        var _coms = Object.getOwnPropertyNames(_commands[mod]).sort()
        _coms.forEach(function (c) {
          console.log('  - %s %s (%s)', c, _commands[mod][c].args.join(' '), _commands[mod][c].desc)
        })
      }
      else {
        console.log('  Modules:\n')
        var _modules = Object.getOwnPropertyNames(_commands).sort()
        _modules.forEach(function (m) {
          console.log('  - ' + m)
        })
      }
      if (!mod)
        console.log('\nType "%s help <module>" for available commands', _self)
      else {
        console.log('')
      }
    }
  }
})()

module.exports = cli
