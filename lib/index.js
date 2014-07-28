var cmd = require('commander')
, fs = require('fs')
, inquirer = require('inquirer')
, pjson = require('../package.json')
, request = require('request')


var API_URL = 'https://api.digitalocean.com/v2/'

var digio = (function () {

  var check_droplet = function () {
    console.log('check');
  }

  return {
    init: function () {
      cmd
        .version('Digio v' + pjson.version)
        .option('-c, --check', 'Check droplet', check_droplet)
        .parse(process.argv)
    }
  }

})()

digio.init()
