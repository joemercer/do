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

		$scope.newTodo = {
		  content: ''
		};
		$scope.addNewTodo = function(e) {
		  // enter key pressed w/o shift key
		  // => add the todo
		  if (e.keyCode === 13 && !e.shiftKey) {
				e.preventDefault();
				todos.insert($scope.newTodo);
				// $scope.todos.push($scope.newTodo);
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
