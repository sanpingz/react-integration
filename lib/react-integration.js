'use strict';

var browserify = require('browserify');
var reactify = require('reactify');
var express = require('express');
var app = express();
var stylusDepsToCss = require('stylus-deps-to-css');

var GLOBAL_JS_DEPS = ['react'];

function bundleAll() {
  var b = browserify();
  return b.require(GLOBAL_JS_DEPS).bundle();
}

module.exports = function (moduleDir) {
  var deps = stylusDepsToCss.create();

  app.use(express.static(__dirname + '/../static'));

  // HTML
  app.get('/', function(req,res) {
    res.render('../static/index.html');
  });

  // CSS
  app.get('/bundle.css', function(req,res) {
    res.header("Content-type", "text/css");
    deps.convertStylusToCss(moduleDir, function (css) {
      res.write(css);
      res.end();
      console.log('Return bundle.css');
      console.log('');
    });
  });

  // JavaScript
  var all = '';

  app.get('/all.js', function(req,res) {
    res.header("Content-type", "text/javascript");
    res.write(all);
    res.end();
    console.log('Return all.js');
    console.log('');
  });

  app.get('/component.js', function(req,res) {
    res.header("Content-type", "text/javascript");
    var b = browserify();
    b
      .external(GLOBAL_JS_DEPS)
      .add(moduleDir + '/integration/browser.js')
      .transform(reactify)
      .bundle()
      .pipe(res);
    console.log('Return component.js');
    console.log('');
  });

  var allBundle;
  allBundle = bundleAll();

  allBundle.on('data', function (chunk) {
    all += chunk;
  });

  var port = process.env.PORT || 8000;

  allBundle.on('end', function () {
    app.listen(port);
    console.log('Listening on port ' + port);
    console.log('---');
    console.log('');
  });

  return app;
};
