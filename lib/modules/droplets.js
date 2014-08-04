var api = require('../api')

var droplets = {
  list_droplets: function (token) {
    var options = {
      action: 'droplets',
      token: token
    }

    api._call(options, function (err, res) {
      if (err) {
        console.log('Something went terribly wrong!')
        return
      }

      var json = JSON.parse(res)

      console.log('\nDroplets: ' + json.meta.total)

      json.droplets.forEach(function (droplet) {
        var result = '- ' + droplet.name + ' ('+droplet.id+')\n'
        console.log(result)
      })
    })
  }
}


module.exports = droplets
