#!/usr/bin/env node

'use strict'

const errors = require('.').checkExact({ dir: process.cwd() })

if (errors.length) {
  throw new Error(`Dependencies are not exact versions:\n${errors.join('\n')}\n`)
}
