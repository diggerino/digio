var print = require('../print')
, tools = require('../lib/tools')

print.list(['Tihi', 'hoho', 'haha'])
print.success('So i guess you could say things are getting pretty serious...')
print.warning('Oioi!')
print.error('Oh shit.')
print.debug('prints.js', 'test debug', 'LA-8-PV')
print.debug('prints.js', 'test debug array', ['LA-8-PV', 'Moar linez', '<EOF>'])
