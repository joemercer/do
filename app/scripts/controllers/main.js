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

		$scope.todos = todos;
		// let the todos service be in charge of
		// notifying the view when it has data
		todos.onInitialized = function() {
			$scope.$apply();
		};

		$scope.newTodo = {
		  content: ''
		};
		$scope.addNewTodo = function(e) {
		  // enter key pressed w/o shift key
		  // => add the todo
		  if (e.keyCode === 13 && !e.shiftKey) {
				e.preventDefault();
				todos.insert($scope.newTodo);
				$scope.newTodo = {
				  content: ''
				};
		  }
		};

		// !!!
		$scope.output = function() {
		  todos.snapshot().forEach(function(todo){
				console.log(todo.get('content'));
		  });
		};

  });
