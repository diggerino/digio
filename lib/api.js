var request = require('request')

module.exports = (function () {

    var API_URL = 'https://api.digitalocean.com/v2/'

    return {
        _call: function (options, callback) {
            options.url = API_URL + options.action
            options.headers = {
                json: true,
                Authorization: 'Bearer ' + options.token
            }

            delete options.action
            delete options.token

            request(options, function (err, res, body) {
                if (err) return callback(err)
                if (res.statusCode >= 400) return callback(JSON.parse(body))

                callback(null, body)
            });
        }
    }

})()
