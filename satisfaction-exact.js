#!/usr/bin/env node

'use strict'

const satisfaction = require('.')

const ops = {
  dir: process.cwd()
}

const violations = satisfaction.exactViolations(ops)
if (violations.length) {
  throw new Error(`Dependencies are not exact versions:\n${violations.join('\n')}\n`)
}
