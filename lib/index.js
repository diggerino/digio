#!/usr/bin/env node

var cmd = require('commander')
, fs = require('fs')
, inquirer = require('inquirer')
, _package = require('../package.json')
, request = require('request')

var digio = (function () {

  var exec = function (options, callback) {
    options.url = 'https://api.digitalocean.com/v2/' + options.action
    options.headers = {
      json: true,
      Authorization: 'Bearer ' + options.token
    }

    delete options.action
    delete options.token

    request(options, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode === 401) return callback(JSON.parse(body))

      callback(null, body)
    })
  }

  var list_droplets = function (token) {
    var options = {
      action: 'droplets',
      token: token
    }

    exec(options, function (err, res) {
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

  return {
    init: function () {
      cmd
        .version('Digio v' + _package.version)
        .option('droplets [token]', 'List all droplets', list_droplets)
        .parse(process.argv)

      if (process.argv.length < 3) cmd.help()
    }
  }

})()

digio.init()
