# gulp-css-any ![https://travis-ci.org/dhoko/gulp-css-any](https://secure.travis-ci.org/dhoko/gulp-css-any.svg?branch=master)

> css-any plugin for [gulp](https://github.com/wearefractal/gulp)

![lay CSS cay kool](http://media.giphy.com/media/5pxnxdzdZfXFK/giphy.gif)

## What it does

Sometimes, you need to override all css declarations with ``*`` (e.g. for the lulz). 
gulp-css-any automatically adds to all your css declarations automatically, so you don't have to. 

## Usage

First, install `gulp-css-any` as a development dependency:

```shell
npm install --save-dev gulp-css-any
```

Then, add it to your `gulpfile.js`:

```javascript
var cssAny = require("gulp-css-any");

gulp.src("./src/*.ext")
	.pipe(cssAny())
	.pipe(gulp.dest("./dist"));
```
## Thanks

* [gdavidgorges/gulp-css-vip](https://github.com/davidgorges/gulp-css-vip) Original Gulp plugin

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
