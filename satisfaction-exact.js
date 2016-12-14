#!/usr/bin/env node

'use strict'

const errors = require('.').checkExact({ dir: process.cwd() })

if (errors.length) {
  console.log(`satisfaction: Dependencies are not exact versions:\n${errors.join('\n')}\n`)
  process.exit(1)
}
