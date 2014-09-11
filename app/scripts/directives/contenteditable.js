'use strict';

/**
 * @ngdoc directive
 * @name tojoApp.directive:contenteditable
 * @description
 * # contenteditable
 */
angular.module('tojoApp')
  .directive('contenteditable', function ($sce) {
    return {
      restrict: 'A', // only activate on element attribute
      require: '?ngModel', // get a hold of NgModelController
      scope: {
			  model: '=ngModel' // bind to the parent scope
			},
      link: function(scope, element, attrs, ngModel) {
        if (!ngModel) {
        	return; // do nothing if no ng-model
        }

        // controller scope -> directive scope
        scope.$watch('model', function() {
				  scope.$eval(attrs.ngModel + ' = model');
				});

        // directive scope -> controller scope
				scope.$watch(attrs.ngModel, function(val) {
				  scope.model = val;
				});

        // view -> model
        element.bind('blur keyup change', function() {
          scope.$apply(function() {
          	var html = element.html();
          	// When we clear the content editable the browser leaves a <br> behind
	          // If strip-br attribute is provided then we strip this out
	          if ( attrs.stripBr && html === '<br>' ) {
	            html = '';
	          }
            ngModel.$setViewValue(html);
          });
        });

        // !!! on blur parse element as markdown yo

        // model -> view
        ngModel.$render = function() {
        	element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
        };

      }
    };
  });
