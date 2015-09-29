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
  sass = require('gulp-sass'),
  cssModulesify = require('css-modulesify'),
  sourcemaps = require('gulp-sourcemaps'),
  util = require('gulp-util'),
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

// TODO: remove this task and npm uninstall --save-dev gulp-sass if we no longer need preprocessing
gulp.task('css', function () {
  var isDev = process.env.NODE_ENV === 'development';
  return gulp.src('src/scss/app.scss')
    .pipe(isDev ? sourcemaps.init() : util.noop())
    .pipe(sass({
      outputStyle: isDev ? 'nested' : 'compressed'
    }))
    .pipe(isDev ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest('build/public/css/'));
});

gulp.task('bundle', ['lint'], function () {
  var isDev = process.env.NODE_ENV === 'development',
    bundle = browserify({
      entries: './src/js/app.js',
      // sourcemaps
      debug: isDev
    });

  bundle.plugin(cssModulesify, {
    rootDir: './src/css',
    output: './build/public/css/app.css'
  });

  // for NODE_ENV=development, add sourcemaps, don't minify
  return bundle
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(isDev ? util.noop() : buffer())
    .pipe(isDev ? util.noop() : uglify())
    .pipe(gulp.dest('build/public/js/'));
});

gulp.task('serve', ['public', 'css', 'bundle'], function () {
  var bundle = browserify({
      entries: './src/js/app.js',
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    }),
    bundler,
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

  bundle.plugin(cssModulesify, {
    rootDir: './src/css',
    output: './build/public/css/app.css'
  });

  bundler = watchify(bundle.transform(babelify));

  bundler.on('update', update);

  // prime watchify cache
  bundler.bundle().pipe(source('app.js'));

  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/public/**', ['public']);

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
