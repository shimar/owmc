'use strict';

var gulp = require('gulp');

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('default', ['clean'], function () {
  console.log('this default task.');
});
