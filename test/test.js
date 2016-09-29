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

function exactForDir(dir) {
  return satisfaction.exact({
    packageJsonName: 'pkg.json',
    nodeModulesName: 'n_m',
    dir: path.join(process.cwd(), 'test', dir)
  })
}

test('this package', function(t) {
  t.ok(satisfaction.status())
  t.ok(satisfaction.exact())
  t.end()
})

var tests = fs.readdirSync('test').filter(function(f) { return /^[pf][pf]_/.test(f) })

tests.forEach(function(dir) {
  test(dir, function(t) {
    t.equals(statusForDir(dir), /^p./.test(dir))
    t.equals(exactForDir(dir), /^.p/.test(dir))
    t.end()
  })
})
