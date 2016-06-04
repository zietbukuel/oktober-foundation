/*
 * Build project assets for development and production
 *
 * Installation (Node Package Manager):
 * > npm install --global gulp bower
 * > npm install && bower install
 *
 * Usage (GulpJS):
 * > gulp styles  [--production][--src=<filepath/filename.scss> [--dest=<path/dirname>]]
 * > gulp scripts [--production][--src=<filepath/filename.js> [--dest=<path/dirname>]]
 */
'use strict';
var // defaults
    defassets_srcdir = "assets/",
    defvendor_srcdir = defassets_srcdir+"vendor/",
    defstyles_srcdir = defassets_srcdir+"scss/",
    defstyles_srcglb = defstyles_srcdir+"*.scss",
    defscripts_srcglb = defassets_srcdir+"es6/*.js",
    defassets_destdir = defassets_srcdir,
    defstyles_destdir = defassets_destdir+"css/",
    defscripts_destdir = defassets_destdir+"js/",
    // global modules
    args = require('yargs').argv,
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename');

gulp.task('default', ['styles', 'scripts']);

gulp.task('styles', function(){
var sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    srcfiles = args.src || defstyles_srcglb,
    destdir = args.dest || defstyles_destdir;
    return gulp.src( srcfiles )
    .pipe( sourcemaps.init() )
    .pipe( sass( {
        errLogToConsole: true,
        outputStyle: 'nested',
        //sourceComments: true,
        sourceMapEmbed: false,
        includePaths: [
          defvendor_srcdir+"foundation-sites/scss",
          defvendor_srcdir+"font-awesome/scss",
          defvendor_srcdir+"motion-ui/src"
        ] } ) )
    .pipe( autoprefixer( {
        cascade: false,
        //map: true,
        browsers: ["last 2 versions", "iOS >= 7"] } ) )
    .pipe( sourcemaps.write( "./", {
        includeContent: false,
        sourceRoot: "../scss" } ) )
    .pipe( gulp.dest( destdir ) )
    .pipe( gulpif(args.production, rename( { suffix: ".min" } ) ) )
    .pipe( gulpif(args.production, minifycss() ) )
    .pipe( gulpif(args.production, gulp.dest( destdir ) ) )
});

gulp.task('scripts', function(){
var include = require('gulp-include'), // extend Javascript files with Sprockets syntax
    uglify = require('gulp-uglify'),
    srcfiles = args.src || defscripts_srcglb,
    destdir = args.dest || defscripts_destdir;
    return gulp.src( srcfiles )
    .pipe( include() )
    .pipe( gulp.dest( destdir ) )
    .pipe( gulpif(args.production, rename( function(fullname){ fullname.extname = ".min.js"; } ) ) )
    .pipe( gulpif(args.production, uglify( { preserveComments: "license" } ) ) )
    .pipe( gulpif(args.production, gulp.dest( destdir ) ) )
});

gulp.task('watch', function(){
    gulp.watch( defstyles_srcglb, ['styles'] );
    gulp.watch( defscripts_srcglb, ['scripts'] );
});
