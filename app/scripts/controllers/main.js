'use strict';

/**
 * @ngdoc function
 * @name tojoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tojoApp
 */
angular.module('tojoApp')
  .controller('MainCtrl', function ($scope) {

    $scope.todos = [{
    	content: 'Do thing 1'
    }, {
    	content: 'Do thing 2'
    }, {
    	content: 'http://vitalets.github.io/angular-xeditable/'
    }];

    $scope.output = function() {
    	$scope.todos.forEach(function(todo){
    		console.log(todo.content);
    	});
    };

    $scope.newTodo = {
    	content: ''
    };
    $scope.addNewTodo = function(e) {
    	// enter key pressed w/o shift key
    	// => add the todo
    	if (e.keyCode === 13 && !e.shiftKey) {
    		e.preventDefault();
    		$scope.todos.push($scope.newTodo);
    		$scope.newTodo = {
    			content: ''
    		};
	    }
    };

    $scope.things = ['1','2','3','4'];


  });
