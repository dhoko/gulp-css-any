var through = require("through2"),
	rework = require("rework"),
	gutil = require("gulp-util");

module.exports = function () {
	"use strict";
	// Fix nested rules
	function addAnyToCssRules(rules) {
		rules.forEach(function(r) {
			if (r.selectors) {
				r.selectors = r.selectors.map(function(sel) {
					if (sel.charAt(0) !== "*") {
						sel = "* " + sel;
					}
					return sel;
				});
			}
			// console.log(r.selectors)

			if (r.rules) {
				addAnyToCssRules(r.rules);
			}
		});
	}

	// see "Writing a plugin"
	// https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/README.md
	function cssAny(file, enc, callback) {
		/*jshint validthis:true*/

		// Do nothing if no contents
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			// accepting streams is optional
			this.emit("error",
				new gutil.PluginError("gulp-css-any", "Stream content is not supported"));
			return callback();
		}

		// check if file.contents is a `Buffer`
		if (file.isBuffer()) {

			var css = rework(String(file.contents)).use(function(values) {
				addAnyToCssRules(values.rules);
			}).toString();
			// console.log(css)
			file.contents = new Buffer(css);

			this.push(file);

		}
		return callback();
	}

	return through.obj(cssAny);
};
