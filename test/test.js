'use strict'

const fs = require('fs')
const test = require('tape')
const satisfaction = require('../main.js')

const getTestingOptions = dir => ({
  packageJsonName: 'pkg.json',
  nodeModulesName: 'n_m',
  dir: require('path').join(process.cwd(), 'test', dir)
})

const statusForDir = dir => satisfaction.status(getTestingOptions(dir))
const exactForDir = dir => satisfaction.exact(getTestingOptions(dir))

test('this package', t => {
  t.ok(satisfaction.status())
  t.ok(satisfaction.exact())
  t.end()
})

fs
  .readdirSync('test')
  .filter(f => /^[pf][pf]_/.test(f))
  .forEach(dir => {
    test(dir, t => {
      t.equals(statusForDir(dir), /^p./.test(dir))
      t.equals(exactForDir(dir), /^.p/.test(dir))
      t.end()
    })
  })
