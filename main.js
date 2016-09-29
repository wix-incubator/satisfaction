'use strict'

const semver = require('semver')
const path = require('path')
const _ = require('lodash')

const DEFAULTS = {
  dir: process.cwd(),
  packageJsonName: 'package.json', // for testing
  nodeModulesName: 'node_modules', // for testing
  verbose: false
}

function getJson(jsonPath) {
  try {
    return require(jsonPath)
  } catch (e) {
    return null
  }
}

function _violations(options) {
  options = Object.assign({}, DEFAULTS, options)
  const packageJsonPath = path.join(options.dir, options.packageJsonName)
  const nodeModulesPath = path.join(options.dir, options.nodeModulesName)

  function log() {
    if (options.verbose) {
      console.log.apply(console, Array.prototype.slice.apply(arguments))
    }
  }

  function getInstalledPackageVersion(pkg) {
    const pkgJson = getJson(path.join(nodeModulesPath, pkg, options.packageJsonName))
    return pkgJson && pkgJson.version
  }

  function getViolationsInDependenciesObject(obj) {
    obj = obj || {}
    return Object.keys(obj).map(dep => {
      const neededVersion = obj[dep].replace(/^.*#/, '') // gets the tag if using non-npm git repo
      const currentVersion = getInstalledPackageVersion(dep)

      log(`${dep} requires ${neededVersion}, has ${currentVersion}`)
      if (!currentVersion) {
        return `package ${dep} is not installed`
      }
      if (!semver.satisfies(currentVersion, neededVersion)) {
        return `package ${dep} installed with ${currentVersion} but required ${neededVersion}`
      }
    }).filter(Boolean)
  }

  const packageJson = getJson(packageJsonPath)
  if (!packageJson) {
    throw new Error(`package.json is not at ${packageJsonPath} (or invalid json)`)
  }

  const dependenciesObjects = [packageJson.dependencies, packageJson.devDependencies]

  const result = [].concat.apply([], dependenciesObjects.map(getViolationsInDependenciesObject))

  return result
}

const violations = _.memoize(_violations, JSON.stringify)

function status(options) {
  return violations(options).length === 0
}

function _exactViolations(options) {
  options = Object.assign({}, DEFAULTS, options)
  const packageJsonPath = path.join(options.dir, options.packageJsonName)

  function getViolationsInDependenciesObject(obj) {
    obj = obj || {}
    return Object.keys(obj).map(dep => {
      const version = obj[dep].replace(/^.*#/, '') // gets the tag if using non-npm git repo
      if (!/^v?\d+\.\d+\.\d+$/.test(version)) {
        return `package ${dep} installed with non-exact version ${version}`
      }
    }).filter(Boolean)
  }

  const packageJson = getJson(packageJsonPath)
  if (!packageJson) {
    throw new Error(`package.json is not at ${packageJsonPath} (or invalid json)`)
  }

  const dependenciesObjects = [packageJson.dependencies, packageJson.devDependencies]

  const result = [].concat.apply([], dependenciesObjects.map(getViolationsInDependenciesObject))

  return result
}

const exactViolations = _.memoize(_exactViolations, JSON.stringify)

function exact(options) {
  return exactViolations(options).length === 0
}

module.exports = {
  status,
  violations,
  exact,
  exactViolations
}
