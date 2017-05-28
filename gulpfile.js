/*
 * Build project assets for development and production
 *
 * Installation:
 * > npm install --global gulp yarn
 * > yarn install
 *
 * Usage:
 * > gulp styles  [--production][--src=<filepath/filename.scss> [--dest=<path/dirname>]]
 * > gulp scripts [--production][--src=<filepath/filename.js> [--dest=<path/dirname>]]
 * > gulp [--production]
 * > gulp watch
 */
'use strict';

// Polyfill to avoid having nasty error messages
require('es6-promise').polyfill();

// defaults
var assets_dir = "assets/",
    src_dir = "src/",
    node_dir = "node_modules/",
    scss_dir = src_dir + "scss/",
    scss_src = scss_dir + "*.scss",
    js_dir = src_dir + "js/",
    js_src = js_dir + "*.js",
    img_dir = src_dir + "images/",
    img_src = img_dir + "*.+(png|jpg|gif)",
    assets_css_dir = assets_dir + "css/",
    assets_js_dir = assets_dir + "js/",
    assets_img_dir = assets_dir + "images/";

// global modules
var gulp = require('gulp'),
    pump = require('pump'),
    args = require('yargs').argv,
    $ = require('gulp-load-plugins')();

// Default task
gulp.task('default', ['styles', 'scripts', 'imagemin']);

// Cleans the assets folder: gulp clean
gulp.task('clean', function() {
    var del = require('del');
    return del(assets_dir + '*');
});

// Compiles SASS code: gulp styles
gulp.task('styles', function(cb) {
    var sass = require('node-sass'),
        srcfiles = args.src || scss_src,
        destdir = args.dest || assets_css_dir;

    sass.render({
        file: scss_dir + 'style.scss',
        outputStyle: args.production ? 'compact' : 'nested'
      }, function(error, result) {
        if (error) {
          console.log('Error compiling sass: ' + error.message);
        }
        else {
          var css = result.css.toString();

          pump([
            $.file('style.css', css),
            $.autoprefixer({
              browsers: ['last 2 versions', 'ie >= 9'],
              cascade: false
            }),
            $.if(!args.production, $.sourcemaps.init()),
            $.if(args.production, $.cleanCss()),
            $.if(!args.production, $.sourcemaps.write('./')),
            gulp.dest(destdir)
          ], cb);
        }
      });
});

// Compiles Javascript: gulp scripts
gulp.task('scripts', ['jslint'], function(cb) {
    var srcfiles = args.src || js_src,
        destdir = args.dest || assets_js_dir;

    pump([
        gulp.src(srcfiles),
        $.include(),
        $.if(args.production, $.babel({
          presets: ['es2015']
        })),
        $.if(args.production, $.uglify()
        .on('error', function(e) {
          console.log(e);
        })),
        gulp.dest(destdir),
    ], cb);
});

// JS Linting Task: gulp jslint
gulp.task('jslint', function(cb) {
  pump([
    gulp.src(js_src),
    $.jshint(),
    $.jshint.reporter('default')
  ], cb);
});

// Image Optimization: gulp imagemin
gulp.task('imagemin', function(cb) {
   pump([
     gulp.src(img_src),
     $.changed(img_src),
     $.imagemin(),
     gulp.dest(assets_img_dir)
   ], cb);
});

// Watch for code modifications: gulp watch
gulp.task('watch', function() {
  gulp.watch([scss_src], ['styles']);
  gulp.watch([js_src], ['scripts']);
});
