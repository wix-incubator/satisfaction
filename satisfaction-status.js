#!/usr/bin/env node

'use strict'

const satisfaction = require('.')

const ops = {
  dir: process.cwd()
}

const violations = satisfaction.statusViolations(ops)
if (violations.length) {
  throw new Error(`node_modules does not satisfy package.json:\n${violations.join('\n')}\n`)
}
