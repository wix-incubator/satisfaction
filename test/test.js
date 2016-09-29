'use strict'

const fs = require('fs')
const test = require('tape')
const path = require('path')
const satisfaction = require('../main.js')

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

test('this package', t => {
  t.ok(satisfaction.status())
  t.ok(satisfaction.exact())
  t.end()
})

const tests = fs.readdirSync('test').filter(f => /^[pf][pf]_/.test(f))

tests.forEach(dir => {
  test(dir, t => {
    t.equals(statusForDir(dir), /^p./.test(dir))
    t.equals(exactForDir(dir), /^.p/.test(dir))
    t.end()
  })
})
