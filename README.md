# Satisfaction

[![Build Status](https://travis-ci.org/danyshaanan/satisfaction.png)](https://travis-ci.org/danyshaanan/satisfaction)
[![NPM Version](https://img.shields.io/npm/v/satisfaction.svg?style=flat)](https://npmjs.org/package/satisfaction)
[![License](http://img.shields.io/npm/l/satisfaction.svg?style=flat)](LICENSE)
[![Dependency Status](https://david-dm.org/danyshaanan/satisfaction.svg)](https://david-dm.org/danyshaanan/satisfaction)
[![devDependency Status](https://david-dm.org/danyshaanan/satisfaction/dev-status.svg)](https://david-dm.org/danyshaanan/satisfaction#info=devDependencies)

### Verifies that a `package.json` file is satisfied by its `node_modules` dir.

Satisfaction uses
[the Semver package](https://github.com/npm/node-semver)
(that is used by NPM) to verify that the version listed in `node_modules/a/package.json`
satisfies the requirement defined in your `package.json`.


* * *
### Installation
```bash
$ npm install satisfaction
```

* * *
### Usage

### As a dependency

```js
var satisfaction = require('satisfaction')
var status = satisfaction.status() //defaults to current location
if (!status) {
  console.log(satisfaction.violations())
} else {
  console.log('everything is fine')
}
```

Likely use in Grunt:
```js
grunt.registerTask('verify-npm', function() {
  var satisfaction = require('satisfaction')

  var satisfied = satisfaction.status()
  if (!satisfied) {
    console.log('node_modules is behind package.json:\n')
    console.log(satisfaction.violations().join('\n'))
    grunt.task.run('npm-install')
  }
})
```

Both `satisfaction.status` and `satisfaction.violations` accept an options object:
```js
var satisfaction = require('satisfaction')

var options = {
  dir: someDir // containing folder of package.json and node_modules, defaults to process.cwd()
}

console.log(satisfaction.status(options))
```

### As a global

The `satisfaction` global binary will throw an error when the current directory's `node_modules` does not satisfy the `package.json`.

Running `satisfaction || npm i` will be prevent `npm i` from running when everything is already installed with compliant versions.


* * *
### Notes / Caveats
* When using git urls in dependencies, (like `"byRepo": "git+ssh://git@example.com:repo.git#3.5.3"` or like `"byRepo": "githubuser/githubrepo#3.5.3"`), it must be done with a tag (`3.5.3` or `v3.5.3`) that corresponds to the version of said package (`3.5.3`), or it will be considered a violation.
* Checks the `"dependencies"` and `"devDependencies"` fields of `package.json`.
* Does not verify that you don't have node_modules that are not in package.json.

* * *
### Feedback
* If you enjoyed this package, please star it [on Github](https://github.com/danyshaanan/satisfaction).
* You are invited to [Open an issue on Github](https://github.com/danyshaanan/satisfaction/issues).
* For other matters, my email address can be found on my [NpmJS page](https://www.npmjs.org/~danyshaanan), my [Github page](https://github.com/danyshaanan), or my [website](http://danyshaanan.com/).
