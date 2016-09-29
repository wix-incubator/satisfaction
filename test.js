'use strict'

const satisfaction = require('./main.js')

const options = {verbose: true}

const status = satisfaction.status(options)

console.log(status)

if (!status) {
  console.log(satisfaction.violations({verbose: true}))
}
