'use strict';

var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

gulp.task('styles', function() {
  return gulp.src('renderer/styles/less/main.less')
         .pipe($.plumber())
         .pipe($.less({ paths: ['.'] }))
         .pipe(gulp.dest('renderer/styles'));
});

gulp.task('watch', function() {
  gulp.watch('renderer/styles/**/*.less', ['styles']);
});

gulp.task('run', [ 'styles', 'watch' ], function() {
  return $.run('electron .').exec();
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('default', ['clean'], function () {
  console.log('this default task.');
});
