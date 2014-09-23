/*global Dropbox:false */
'use strict';

/**
 * @ngdoc service
 * @name tojoApp.todos
 * @description
 * # todos
 * Service in the tojoApp.
 */
angular.module('tojoApp')
  .service('todos', function todos() {
    // AngularJS will instantiate a singleton by calling "new" on this function
  
  	// the default values are initialized here
    this.snapshot = [{
    	content: 'Do thing 1'
    }, {
    	content: 'Do thing 2'
    }, {
    	content: 'http://vitalets.github.io/angular-xeditable/'
    }];

    this.backlog = [];

    this.syncDown = function() {
    	// if this fails 
    };

    this.syncUp = function() {

    };

    this.dropbox = new Dropbox.Client({
  		key: 'dg7kh1gl7wv9gj2',
  		secret: 'hp1rh6n8ia9fabr',
  		token: '05PF-9qnGb8AAAAAAAAABEI3DKas5jHeRJcOMxH_U-I4a-JLcDkTS-ww3tTiEkWu'
  	});

		if (this.dropbox.isAuthenticated()) {
		  var datastoreManager = this.dropbox.getDatastoreManager();
			datastoreManager.openDefaultDatastore(angular.bind(this, function (error, datastore) {
		    if (error) {
		      console.log('Error opening the datastore: ' + error);
		    }

		    this.data = datastore.getTable('todos');



		    // immediately fill it with stuff from the backlog
		    // !!! this can be replaced with immediately call a syncUp, or syncDown
		    for (var i=0; i<this.backlog.length; ++i) {
		    	this.data.insert(this.backlog[i]);
		    }
		    this.backlog = [];
			}));
		}

  });
