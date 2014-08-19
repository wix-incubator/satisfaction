# Satisfaction

### Verifies that a `node_modules` dir satisfies a `package.json` file.

[![Build Status](https://travis-ci.org/danyshaanan/satisfaction.png?branch=master)](https://travis-ci.org/danyshaanan/satisfaction)

* * *
### Installation
```bash
$ npm install --save-dev satisfaction
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

Satisfaction uses
[the Semver package](https://github.com/npm/node-semver)
(that is used by NPM) to verify that the version listed in `node_modules/a/package.json`
satisfies the requirement defined in your `package.json`.

If you use git urls, like such:
```
"byRepo": "git+ssh://git@example.com:repo.git#3.5.3"
```
then they must have a tag (like the `3.5.3`) which corresponds
to the version of said package.

* * *
### Feedback
* If you enjoyed this package, please star it [on Github](https://github.com/danyshaanan/satisfaction).
* You are invited to [Open an issue on Github](https://github.com/danyshaanan/satisfaction/issues).
* For other matters, my email address can be found on my [NpmJS page](https://www.npmjs.org/~danyshaanan), my [Github page](https://github.com/danyshaanan), or my [website](http://danyshaanan.com/).
