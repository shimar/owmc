'use strict';

var app = angular.module('OwmcApp');
app.constant('OWMImageURL', 'http://openweathermap.org/img/w');

var directive = function(OWMImageURL) {
    return {
      restrict: 'E',
      replace:  true,
      template: '<img>',
      scope: {
        icon: '=icon'
      },
      link: function(scope, element, attrs) {
        scope.$watch('icon', function(val) {
          element[0].src = OWMImageURL + '/' + scope.icon + '.png';
        });
      }
    };
};
app.directive('weatherIcon', ['OWMImageURL', directive]);
