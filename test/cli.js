var fjas = require('../lib/cli')

var blabla = function (arg, arger, argest) {
    console.log(arg, arger, argest)
}

fjas.register(
    'domains',
    'create',
    ['domain', 'ip'],
    'Retrieves RateLimit information',
    blabla)

fjas.parse()
