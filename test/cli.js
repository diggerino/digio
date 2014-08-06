var fjas = require('../lib/cli')

var blabla = function (a,b,c,d,e,f,g,h,i,j,k,l) {
    console.log(a,b,c,d,e,f,g,h,i,j,k,l)
}

fjas.register(
    'domains',
    'create',
    ['<domain>', '<ip>'],
    'Retrieves RateLimit information',
    blabla
)
fjas.register(
    'actions',
    'list',
    [],
    'List all actions',
    blabla
)
fjas.register(
    'domains',
    'list',
    [],
    'List all domains',
    blabla
)
fjas.version('0.0.1')

fjas.parse()
