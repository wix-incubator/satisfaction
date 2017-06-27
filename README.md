# Satisfaction

[![Build Status](https://travis-ci.org/wix/satisfaction.png)](https://travis-ci.org/wix/satisfaction)
[![NPM Version](https://img.shields.io/npm/v/satisfaction.svg?style=flat)](https://npmjs.org/package/satisfaction)
[![License](http://img.shields.io/npm/l/satisfaction.svg?style=flat)](LICENSE)
[![Dependency Status](https://david-dm.org/wix/satisfaction.svg)](https://david-dm.org/wix/satisfaction)
[![devDependency Status](https://david-dm.org/wix/satisfaction/dev-status.svg)](https://david-dm.org/wix/satisfaction#info=devDependencies)

### Verifies that a `package.json` file is satisfied by its `node_modules` dir.

Satisfaction uses
[the Semver package](https://github.com/npm/node-semver)
(which is used by NPM) to verify that the versions installed in your `node_modules`
satisfy the requirement defined in your `package.json`,
and can also verify that all of your dependencies are required with specific versions,
(no `~`, `^`, `>=`, etc).


* * *
### Installation
```bash
$ npm i satisfaction
```

or globally:
```bash
$ npm i -g satisfaction
```


* * *
### Usage

#### As a dependency

```js
const satisfaction = require('satisfaction')

const statusErrors = satisfaction.checkStatus()
if (statusErrors.length) {
  throw new Error(`node_modules does not satisfy package.json:\n${statusErrors.join('\n')}`)
}

const exactErrors = satisfaction.checkExact()
if (exactErrors.length) {
  throw new Error(`Dependencies are not exact versions:\n${exactErrors.join('\n')}`)
}
```

Likely use in Grunt:
```js
grunt.registerTask('verify-npm', () => {
  const satisfaction = require('satisfaction')

  const statusErrors = satisfaction.checkStatus()
  if (statusErrors.length) {
    grunt.fail.warn(`node_modules does not satisfy package.json:\n${statusErrors.join('\n')}`)
  }

  const exactErrors = satisfaction.checkExact()
  if (exactErrors.length) {
    grunt.fail.warn(`Dependencies are not exact versions:\n${exactErrors.join('\n')}`)
  }
})
```

Both `statusErrors` and `exactErrors` accept an options object:
```js
console.log(require('satisfaction').statusErrors({
  dir: someDir // containing folder of package.json and node_modules, defaults to process.cwd()
}).join('\n'))
```

#### As a global

The `satisfaction-status` and `satisfaction-exact` global binaries will throw errors listing which violations were found.

Running `satisfaction-status || npm i` will be prevent `npm i` from running when everything is already installed with compliant versions.

Example errors for running `satisfaction-status`:
```bash
Error: node_modules does not satisfy package.json:
package eslint installed with 3.6.1 but required 3.6.2
package ava is not installed
```

Example errors for running `satisfaction-exact`:
```bash
Error: Dependencies are not exact versions:
package lodash is required with a non-exact version ^4.16.2
```


* * *
### Notes / Caveats
* When using git urls in dependencies, (like `"byRepo": "git+ssh://git@example.com:repo.git#3.5.3"` or like `"byRepo": "githubuser/githubrepo#3.5.3"`), it must be done with a tag (`3.5.3` or `v3.5.3`) that corresponds to the version of said package (`3.5.3`), or it will be considered an error.
* Checks the `"dependencies"` and `"devDependencies"` fields of `package.json`.


* * *
### Feedback
* You are invited to [Open an issue on Github](https://github.com/wix/satisfaction/issues).
