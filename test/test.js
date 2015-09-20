'use strict'

var fs = require('fs')
var test = require('tape')
var path = require('path')
var satisfaction = require('../main.js')

function statusForDir(dir) {
  return satisfaction.status({
    packageJsonName: 'pkg.json',
    nodeModulesName: 'n_m',
    dir: path.join(process.cwd(), 'test', dir)
  })
}

test('this package', function(t) {
  t.ok(satisfaction.status())
  t.end()
})

var tests = fs.readdirSync('test').filter(function(f) { return ~f.indexOf('_') })

tests.forEach(function(dir) {
  test(dir, function(t) {
    t.equals(statusForDir(dir), dir.indexOf('passing') === 0)
    t.end()
  })
})
