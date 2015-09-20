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
  t.ok(satisfaction.status())
  t.end()
})

var passingDirectories = {
  passing1: 'passing for dep, devdep, and git url with semver-like tag',
  passing2: 'passing for githubuser/githubrepo dep with semver-like tag'
}

Object.keys(passingDirectories).forEach(function(dir) {
  test(passingDirectories[dir], function(t) {
    t.ok(statusForDir(dir))
    t.end()
  })
})

var failingDirectories = {
  failing1: 'failing on wrong version',
  failing2: 'failing on missing dependency',
  failing3: 'failing on missing dev dependency',
  failing4: 'failing on git url with non semver-like tag',
  failing5: 'failing on missing git url dependency',
  failing6: 'failing on wrong version with githubuser/githubrepo dep'
}

Object.keys(failingDirectories).forEach(function(dir) {
  test(failingDirectories[dir], function(t) {
    t.notOk(statusForDir(dir))
    t.end()
  })
})
