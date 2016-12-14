#!/usr/bin/env node

'use strict'

const errors = require('.').checkStatus({ dir: process.cwd() })

if (errors.length) {
  console.log(`satisfaction: node_modules does not satisfy package.json:\n${errors.join('\n')}\n`)
  process.exit(1)
}
