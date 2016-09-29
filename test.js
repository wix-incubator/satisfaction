'use strict'

const satisfaction = require('./main.js')

const options = {}

const status = satisfaction.status(options)

console.log(status)

if (!status) {
  console.log(satisfaction.violations({}))
}
