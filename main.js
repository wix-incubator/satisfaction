'use strict'

const semver = require('semver')
const path = require('path')
const _ = require('lodash')

const errorNotInstalled = dep => `package ${dep} is not installed`
const errorMisMatch = (dep, cur, req) => `package ${dep} installed with ${cur} but required ${req}`
const errorNonExact = (dep, req) => `package ${dep} installed with non-exact version ${req}` // should be 'required'

const clean = ver => ver.replace(/^.*#/, '')
const exactVersion = ver => /^v?\d+\.\d+\.\d+$/.test(ver)

const defaults = ops => Object.assign({
  dir: process.cwd(),
  packageJsonName: 'package.json', // for testing
  nodeModulesName: 'node_modules' // for testing
}, ops)

const getJson = jsonPath => {
  try {
    return require(jsonPath)
  } catch (e) {
    return null
  }
}

const getPackageJson = packageJsonPath => {
  const packageJson = getJson(packageJsonPath)
  if (!packageJson) {
    throw new Error(`package.json is not at ${packageJsonPath} (or invalid json)`)
  }
  return packageJson
}

const getDepsObjs = ops => {
  const pkgJsonPath = path.join(ops.dir, ops.packageJsonName)
  const pkg = getPackageJson(pkgJsonPath)
  return ['dependencies', 'devDependencies'].map(k => pkg[k])
}

const getErrors = (ops, cb) => _.flatten(getDepsObjs(ops).map(cb)).filter(Boolean)

//

const _violations = options => {
  const ops = defaults(options)

  return getErrors(ops, obj => _.map(obj, (ver, dep) => {
    const pkgJson = getJson(path.join(ops.dir, ops.nodeModulesName, dep, ops.packageJsonName))
    const cur = pkgJson && pkgJson.version
    if (!cur) return errorNotInstalled(dep)
    const req = clean(ver)
    if (!semver.satisfies(cur, req)) return errorMisMatch(dep, cur, req)
  }))
}

const _exactViolations = options => {
  const ops = defaults(options)

  return getErrors(ops, obj => _.map(obj, (ver, dep) => {
    const req = clean(ver)
    if (!exactVersion(req)) return errorNonExact(dep, req)
  }))
}

//

const violations = _.memoize(_violations, JSON.stringify)
const exactViolations = _.memoize(_exactViolations, JSON.stringify)

const status = options => violations(options).length === 0
const exact = options => exactViolations(options).length === 0

module.exports = { status, violations, exact, exactViolations }
