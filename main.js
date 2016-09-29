'use strict'

var semver = require('semver')
var path = require('path')
var _ = require('lodash')

var DEFAULTS = {
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
  var packageJsonPath = path.join(options.dir, options.packageJsonName)
  var nodeModulesPath = path.join(options.dir, options.nodeModulesName)

  function log() {
    if (options.verbose) {
      console.log.apply(console, Array.prototype.slice.apply(arguments))
    }
  }

  function getInstalledPackageVersion(pkg) {
    var pkgJson = getJson(path.join(nodeModulesPath, pkg, options.packageJsonName))
    return pkgJson && pkgJson.version
  }

  function getViolationsInDependenciesObject(obj) {
    obj = obj || {}
    return Object.keys(obj).map(function(dep) {
      var neededVersion = obj[dep].replace(/^.*#/, '') // gets the tag if using non-npm git repo
      var currentVersion = getInstalledPackageVersion(dep)

      log(dep + ' requires ' + neededVersion + ', has ' + currentVersion)
      if (!currentVersion) {
        return 'package ' + dep + ' is not installed'
      }
      if (!semver.satisfies(currentVersion, neededVersion)) {
        return 'package ' + dep + ' installed with ' + currentVersion + ' but required ' + neededVersion
      }
    }).filter(Boolean)
  }

  var packageJson = getJson(packageJsonPath)
  if (!packageJson) {
    throw new Error('package.json is not at ' + packageJsonPath + ' (or invalid json)')
  }

  var dependenciesObjects = [packageJson.dependencies, packageJson.devDependencies]

  var result = [].concat.apply([], dependenciesObjects.map(getViolationsInDependenciesObject))

  return result
}

var violations = _.memoize(_violations, JSON.stringify)

function status(options) {
  return violations(options).length === 0
}

function _exactViolations(options) {
  options = Object.assign({}, DEFAULTS, options)
  var packageJsonPath = path.join(options.dir, options.packageJsonName)

  function getViolationsInDependenciesObject(obj) {
    obj = obj || {}
    return Object.keys(obj).map(function(dep) {
      var version = obj[dep].replace(/^.*#/, '') // gets the tag if using non-npm git repo
      if (!/^v?\d+\.\d+\.\d+$/.test(version)) {
        return 'package ' + dep + ' installed with non-exact version ' + version
      }
    }).filter(Boolean)
  }

  var packageJson = getJson(packageJsonPath)
  if (!packageJson) {
    throw new Error('package.json is not at ' + packageJsonPath + ' (or invalid json)')
  }

  var dependenciesObjects = [packageJson.dependencies, packageJson.devDependencies]

  var result = [].concat.apply([], dependenciesObjects.map(getViolationsInDependenciesObject))

  return result
}

var exactViolations = _.memoize(_exactViolations, JSON.stringify)

function exact(options) {
  return exactViolations(options).length === 0
}

module.exports = {
  status: status,
  violations: violations,
  exact: exact,
  exactViolations: exactViolations
}
