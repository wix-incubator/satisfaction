#!/usr/bin/env node

'use strict'

const satisfaction = require('.')

const ops = {
  dir: process.cwd()
}

if (!satisfaction.exact(ops)) {
  throw new Error(`Dependencies are not exact versions:\n${satisfaction.exactViolations(ops).join('\n')}\n`)
}
