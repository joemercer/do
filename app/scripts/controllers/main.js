'use strict';

/**
 * @ngdoc function
 * @name tojoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tojoApp
 */
angular.module('tojoApp')
  .controller('MainCtrl', function ($scope, todos) {

    $scope.todos = todos.snapshot;

    $scope.removeTodoOnBackspace = function(e, todo) {
        // backspace pressed with no content
        // => remove the todo
        if (e.keyCode === 8 && !todo.content) {
            e.preventDefault();
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
        }
    };

    $scope.output = function() {
    	todos.snapshot.forEach(function(todo){
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


  });
