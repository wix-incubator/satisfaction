# Satisfaction

[![Build Status](https://travis-ci.org/danyshaanan/satisfaction.png)](https://travis-ci.org/danyshaanan/satisfaction)
[![NPM Version](https://img.shields.io/npm/v/satisfaction.svg?style=flat)](https://npmjs.org/package/satisfaction)
[![License](http://img.shields.io/npm/l/satisfaction.svg?style=flat)](LICENSE)

### Verifies that a `package.json` file is satisfied by its `node_modules` dir.

[![Build Status](https://travis-ci.org/danyshaanan/satisfaction.png?branch=master)](https://travis-ci.org/danyshaanan/satisfaction)

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

```js
var satisfaction = require('satisfaction')
var status = satisfaction.status() //defaults to current location
if (!status) {
  console.log(satisfaction.violations())
} else {
  console.log('everythins is fine')
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
  dir: someDir, // containing folder of package.json and node_modules, defaults to process.cwd()
  verbose: true // defaults to false, prints output for every dependency checked
}

console.log(satisfaction.status(options))
```

* * *
### Notes / Caveats
* Current NPM versions satisfy `^0.x.y` with `>0.x.y`, but anything that starts with 0 is [considered by node-semver to make no stability guarantees](https://www.npmjs.org/doc/misc/semver.html) and therefore `0.1.1` does not satisfy `^0.1.0`. This [will be fixed in npm v2](https://github.com/npm/npm/issues/5695), but for the meanwhile, for Satisfaction to work, opt for using `0.x.y` rather than `^0.x.y`.
* When using git urls in dependencies, (like `"byRepo": "git+ssh://git@example.com:repo.git#3.5.3"`), it must be done with a tag (`3.5.3` or `v3.5.3`) that corresponds to the version of said package (`3.5.3`), or it will be considered a violation.
* Checks the `"dependencies"` and `"devDependencies"` fields of `package.json`.
* Does not verify that you don't have node_modules that are not in package.json.

* * *
### Feedback
* If you enjoyed this package, please star it [on Github](https://github.com/danyshaanan/satisfaction).
* You are invited to [Open an issue on Github](https://github.com/danyshaanan/satisfaction/issues).
* For other matters, my email address can be found on my [NpmJS page](https://www.npmjs.org/~danyshaanan), my [Github page](https://github.com/danyshaanan), or my [website](http://danyshaanan.com/).
