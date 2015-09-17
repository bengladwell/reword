/*eslint-env node*/
"use strict";

var gulp = require('gulp'),
  util = require('gulp-util'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  eslint = require('gulp-eslint'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  nodemon = require('nodemon');

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

gulp.task('public', function () {
  return gulp.src('src/public/**')
    .pipe(gulp.dest('build/public/'));
});

gulp.task('bundle', ['lint'], function () {
  var isDev = process.env.NODE_ENV === 'development';
  // for NODE_ENV=development, add sourcemaps, don't minify
  return browserify({
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

gulp.task('serve', ['public', 'bundle'], function () {
  var bundler = watchify(browserify({
      entries: './src/js/app.js',
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    }).transform(babelify)),

    update = function (files) {
      if (files) {
        gulp.src(files)
          .pipe(eslint({
            rules: {
              "no-console": 0,
              "no-debugger": 0
            }
          }))
          .pipe(eslint.format())
          .pipe(util.buffer(function (err, bufferedFiles) {
            var hadErrors = bufferedFiles.some(function (file) {
              return file.eslint.errorCount || file.eslint.warningCount;
            });

            if (hadErrors) {
              util.beep();
            } else {
              util.log(util.colors.blue('src/js/app.js') + ' was bundled.');
            }

            // pass the files through the watchify stream even if there were errors to update internal watchify cache
            return bundler.bundle()
              .on('error', util.log.bind(util, 'Browserify Error'))
              .pipe(source('app.js'))
              // don't distribute the new code if there were errors
              .pipe(hadErrors ? util.noop() : gulp.dest('build/public/js/'));

          }));
      }
    };

  bundler.on('update', update);

  // prime watchify cache
  bundler.bundle().pipe(source('app.js'));

  livereload.listen();
  gulp.watch('build/public/**').on('change', livereload.changed);

  nodemon({
    script: 'src/js/server/index.js',
    stdout: false
  }).on('stdout', function (s) {
    util.log(util.colors.gray(s.toString().trim()));
  }).on('stderr', function (s) {
    util.log(util.colors.red(s.toString().trim()));
  });

});


gulp.task('default', ['public', 'bundle']);
