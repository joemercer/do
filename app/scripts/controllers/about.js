'use strict';

/**
 * @ngdoc function
 * @name tojoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the tojoApp
 */
angular.module('tojoApp')
  .controller('AboutCtrl', function ($scope) {

    $scope.todos = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
  });
