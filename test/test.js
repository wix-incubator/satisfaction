'use strict'

const _ = require('lodash')
const test = require('tape')
const satisfaction = require('../main.js')

test('this package', t => {
  t.deepEqual(satisfaction.checkStatus(), [])
  t.deepEqual(satisfaction.checkExact(), [])
  t.end()
})

_.forEach(require('./testCases.json'), (testCase, dir) => {
  const ops = Object.assign({
    packageJsonName: 'pkg.json',
    nodeModulesName: 'n_m',
    dir: require('path').join(process.cwd(), 'test', dir)
  }, testCase.ops || {})
  test(dir, t => {
    t.deepEquals(satisfaction.checkStatus(ops), testCase.errorsOnStatus)
    t.deepEquals(satisfaction.checkExact(ops), testCase.errorsOnExact)
    t.end()
  })
})
