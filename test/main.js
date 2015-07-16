/*global describe, it*/
"use strict";

var fs = require("fs"),
	es = require("event-stream"),
	should = require("should");

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
	cssany = require("../");

describe("gulp-css-any", function () {

	var expectedFile = new gutil.File({
		path: "test/expected/hello.any.css",
		cwd: "test/",
		base: "test/expected",
		contents: fs.readFileSync("test/expected/hello.any.css")
	});

	it("should produce expected file via buffer", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/hello.css",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.readFileSync("test/fixtures/hello.css")
		});

		var stream = cssany("World");

		stream.on("error", function(err) {
			should.exist(err);
			done(err);
		});

		stream.on("data", function (newFile) {

			should.exist(newFile);
			should.exist(newFile.contents);
			console.log(newFile.contents.toString())
			String(newFile.contents).trim().should.equal(String(expectedFile.contents).trim());
			done();

		});

		stream.write(srcFile);
		stream.end();
	});

	it("should error on stream", function (done) {

		var srcFile = new gutil.File({
			path: "test/fixtures/hello.css",
			cwd: "test/",
			base: "test/fixtures",
			contents: fs.createReadStream("test/fixtures/hello.css")
		});

		var stream = cssany("World");

		stream.on("error", function(err) {
			should.exist(err);
			done();
		});

		stream.on("data", function (newFile) {
			newFile.contents.pipe(es.wait(function(err, data) {
				done(err);
			}));
		});

		stream.write(srcFile);
		stream.end();
	});

});
