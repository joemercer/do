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
    this._snapshot = [{
    	get: function() {
    		return 'Do thing 1';
    	}
    }, {
    	get: function() {
    		return 'Do thing 2';
    	}
    }, {
    	get: function() {
    		return 'http://vitalets.github.io/angular-xeditable/';
    	}
    }];

    this.snapshot = function() {
    	return this._snapshot;
    };

    this.data = null;
    this.backlog = [];

    this.insert = function(todo) {
    	if (this.data) {
    		this.data.insert(todo);
    		this.syncDown();
    	}
    	else {
    		this.backlog.push(todo);
    	}
    };

    // syncs from dropbox -> snapshot
    this.syncDown = function() {
    	// if no data, then can't do a sync
    	if (!this.data) {
    		return;
    	}

    	this._snapshot = this.data.query();

    // 	this._snapshot = this.data.query().map(function(t){
    // 		// !!! does not work for arrays,
				// // instead use ._array()
				// // but does work if the array is a value of part of the object
				// var toReturn = t._rawFieldValues();
				// toReturn.raw = t;
				// return toReturn;
    // 	});
    };

    // syncs from backlog -> dropbox
    this.syncUp = function() {
    	// if no data, then can't do a sync
    	if (!this.data) {
    		return;
    	}

    	for (var i=0; i<this.backlog.length; ++i) {
	    	this.data.insert(this.backlog[i]);
	    }
	    this.backlog = [];
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

		    console.log('do sync');
		    this.syncUp();
		    this.syncDown();
			}));
		}

  });
