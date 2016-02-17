"use strict";

var _ = require('underscore'),
  gulp = require('gulp'),
  util = require('gulp-util'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  eslint = require('gulp-eslint'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  babelify = require('babelify'),
  uglify = require('gulp-uglify'),
  config = require('./config.json'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  cssModulesify = require('css-modulesify'),
  merge = require('merge-stream'),
  livereload = require('gulp-livereload'),
  nodemon = require('nodemon');

gulp.task('lint', function () {
  return gulp.src(['**/*.js', '!node_modules/**', '!server/index.js', '!build/**'])
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

gulp.task('assets', function () {
  return merge(
    gulp.src('assets/**')
      .pipe(gulp.dest('build/')),
    gulp.src('node_modules/normalize.css/normalize.css')
      .pipe(gulp.dest('build/css/'))
  );
});

gulp.task('bundle', ['lint'], function () {
  var isDev = process.env.NODE_ENV === 'development',
    bundle = browserify({
      entries: './app/app.js',
      // sourcemaps
      debug: isDev
    });

  bundle.plugin(cssModulesify, {
    rootDir: './app',
    output: './build/css/app.css'
  });

  // for NODE_ENV=development, add sourcemaps, don't minify
  return bundle
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(isDev ? util.noop() : buffer())
    .pipe(isDev ? util.noop() : uglify())
    .pipe(gulp.dest('build/js/'));
});

gulp.task('firebase', function () {
  return merge(
    gulp.src('firebase-security.tmpl')
      .pipe(template({adminUser: config.adminUser}))
      .pipe(rename('firebase-security.json'))
      .pipe(gulp.dest('.')),
    gulp.src('firebase.tmpl')
      .pipe(template({firebaseApp: config.firebaseApp}))
      .pipe(rename('firebase.json'))
      .pipe(gulp.dest('.'))
  );
});

gulp.task('serve', ['assets', 'bundle'], function () {
  var bundle = browserify({
      entries: './app/app.js',
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    }),
    bundler,
    isJs,
    update = function (files) {
      if (files) {
        isJs = files.some(function (file) {
          return file.match(/\.js$/);
        });
        gulp.src(files)
          .pipe(isJs ? eslint({
            rules: {
              "no-console": 0,
              "no-debugger": 0
            }
          }) : util.noop())
          .pipe(isJs ? eslint.format() : util.noop())
          .pipe(util.buffer(function (err, bufferedFiles) {
            var hadErrors = bufferedFiles.some(function (file) {
              return file.eslint && (file.eslint.errorCount || file.eslint.warningCount);
            });

            if (hadErrors) {
              util.beep();
            } else {
              util.log(util.colors.blue('app.js') + ' was bundled.');
            }

            // pass the files through the watchify stream even if there were errors to update internal watchify cache
            return bundler.bundle()
              .on('error', util.log.bind(util, 'Browserify Error'))
              .pipe(source('app.js'))
              // don't distribute the new code if there were errors
              .pipe(hadErrors ? util.noop() : gulp.dest('build/js/'));

          }));
      }
    };

  bundle.plugin(cssModulesify, {
    rootDir: './app',
    output: './build/css/app.css'
  });

  bundler = watchify(bundle.transform(babelify));

  // prime watchify cache
  bundler.bundle().pipe(source('app.js'));

  bundler.on('update', update);

  gulp.watch('assets/**', ['assets']);

  livereload.listen();
  gulp.watch('build/**').on('change', _.throttle(livereload.changed, 500));

  nodemon({
    script: 'server/index.js',
    stdout: false
  }).on('stdout', function (s) {
    util.log(util.colors.gray(s.toString().trim()));
  }).on('stderr', function (s) {
    util.log(util.colors.red(s.toString().trim()));
  });

});


gulp.task('default', ['firebase', 'assets', 'bundle']);
