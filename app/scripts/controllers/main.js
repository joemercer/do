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

		$scope.update = function(e, todo) {
			// enter key pressed with no shift
		  // => focus on insert new
			if (e.keyCode === 13 && !e.shiftKey) {
				e.preventDefault();
				// $(e.target).blur();
				// $('.add-new-todo').focus();
			}
			// back key pressed with no content
		  // => remove the todo
		  else if (e.keyCode === 8 && !todo.content) {
				e.preventDefault();
				// $(e.target).blur();
				// $('.add-new-todo').focus();
				todo.deleteRecord();
				$scope.todos.syncDown();
		  }
		  else {
				// update content
		  	todo.set('content', todo.content);
		  }
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
