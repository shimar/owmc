'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

gulp.task('jade', function() {
  gulp.src('renderer/views/jade/**/*.jade')
  .pipe($.jade({
    pretty: true
  }))
  .pipe(gulp.dest('renderer/views'));
});

gulp.task('styles', function() {
  return gulp.src('renderer/styles/less/main.less')
         .pipe($.plumber())
         .pipe($.less({ paths: ['.'] }))
         .pipe(gulp.dest('renderer/styles'));
});

gulp.task('watch', function() {
  gulp.watch('renderer/views/**/*.jade',  ['jade']);
  gulp.watch('renderer/styles/**/*.less', ['styles']);
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('default', ['clean'], function () {
  console.log('this default task.');
});
