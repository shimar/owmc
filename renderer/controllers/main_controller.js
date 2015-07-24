'use strict';

var app = angular.module('OwmcApp');
var ctrl = function($scope) {

  console.log('MainController loaded');

};
app.controller(
  'MainController',
  [
    '$scope',
    ctrl
  ]);
