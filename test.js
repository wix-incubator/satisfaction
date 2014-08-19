'use strict'

var satisfaction = require('./main.js')

var options = {verbose: true}

var status = satisfaction.status(options)

console.log(status)

if (!status) {
  console.log(satisfaction.violations({verbose: true}))
}



//
