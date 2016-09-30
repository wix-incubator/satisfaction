'use strict'

const fs = require('fs')
const test = require('tape')
const satisfaction = require('../main.js')

const getTestingOptions = dir => ({
  packageJsonName: 'pkg.json',
  nodeModulesName: 'n_m',
  dir: require('path').join(process.cwd(), 'test', dir)
})

const statusForDir = dir => satisfaction.statusViolations(getTestingOptions(dir))
const exactForDir = dir => satisfaction.exactViolations(getTestingOptions(dir))

test('this package', t => {
  t.equal(satisfaction.statusViolations().length, 0)
  t.equal(satisfaction.exactViolations().length, 0)
  t.end()
})

fs
  .readdirSync('test')
  .filter(f => /^[pf][pf]_/.test(f))
  .forEach(dir => {
    test(dir, t => {
      t.equals(statusForDir(dir).length === 0, /^p./.test(dir))
      t.equals(exactForDir(dir).length === 0, /^.p/.test(dir))
      t.end()
    })
  })
