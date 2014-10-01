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

		$scope.complete = function(todo) {
			todo.set('completed', true);
			todo.set('completedAt', (new Date()).getTime());
			console.log(todo, 'completed');
			$scope.todos.syncDown();
		};

		$scope.snooze = function(todo) {
			todo.set('snoozed', true);
			// unsnooze in 5 minutes
			todo.set('unsnoozeAt', (new Date()).getTime() + (5*60*1000));
			// todo.set('unsnoozeAt', (new Date()).getTime() + (15*1000));
			console.log(todo, 'snoozed');
			$scope.todos.syncDown();
		};

		$scope.newTodo = {
		  content: '',
		  timeAdded: (new Date().getTime()),
		  completed: false,
		  completedAt: null,
		  snoozed: false,
		  unsnoozeAt: (new Date().getTime())
		};
		$scope.addNewTodo = function(e) {
		  // enter key pressed w/o shift key
		  // => add the todo
		  if (e.keyCode === 13 && !e.shiftKey) {
				e.preventDefault();
				todos.insert($scope.newTodo);
				$scope.newTodo = {
				  content: '',
				  timeAdded: (new Date().getTime()),
				  completed: false,
				  completedAt: null,
				  snoozed: false,
		  		unsnoozeAt: (new Date().getTime())
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
