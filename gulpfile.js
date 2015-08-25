"use strict";

var gulp = require('gulp'),
  util = require('gulp-util'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  eslint = require('gulp-eslint'),
  browserify = require('browserify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify');

gulp.task('lint', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint({
      rules: process.env.NODE_ENV === 'development' ? {
        "no-console": 0,
        "no-debugger": 0
      }
      : {}
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('bundle', ['lint'], function () {
  var isDev = process.env.NODE_ENV === 'development';
  // for NODE_ENV=development, add sourcemaps, don't minify
  return browserify({
    //entries: path.join(__dirname, 'src/js/app.js'),
    entries: './src/js/app.js',
    // sourcemaps
    debug: isDev
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(isDev ? util.noop() : buffer())
    .pipe(isDev ? util.noop() : uglify())
    .pipe(gulp.dest('build/public/js/'));
});


gulp.task('default', ['lint']);
