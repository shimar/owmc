'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('jade', function() {
  gulp.src('renderer/views/jade/**/*.jade')
  .pipe(jade({
    pretty: true
  }))
  .pipe(gulp.dest('renderer/views'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('default', ['clean'], function () {
  console.log('this default task.');
});
