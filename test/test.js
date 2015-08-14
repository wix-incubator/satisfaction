'use strict'

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
  t.plan(1)
  t.equal(satisfaction.status(), true)
})

test('passing for dep, devdep, and git url with semver-like tag', function(t) {
  t.plan(1)
  t.equal(statusForDir('passing'), true)
})

test('failing on wrong version', function(t) {
  t.plan(1)
  t.equal(statusForDir('failing1'), false)
})

test('failing on missing dependency', function(t) {
  t.plan(1)
  t.equal(statusForDir('failing2'), false)
})

test('failing on missing dev dependency', function(t) {
  t.plan(1)
  t.equal(statusForDir('failing3'), false)
})

test('failing on git url with non semver-like tag', function(t) {
  t.plan(1)
  t.equal(statusForDir('failing4'), false)
})

test('failing on missing git url dependency', function(t) {
  t.plan(1)
  t.equal(statusForDir('failing5'), false)
})
