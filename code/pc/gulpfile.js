const pkg = require('./package.json');
const gulp = require('gulp');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('module', function() {
  var files = pkg[pkg['type']] ? pkg[pkg['type']] : []
  var modules = gulp.src(files)
    .pipe(concat('module.js'))
    .pipe(gulp.dest('./resources/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./resources/js'))
    .pipe(notify({ message: '/resources/js/module.js(module.min.js)生成结束' }));
})