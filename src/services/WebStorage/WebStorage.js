(function(){
	'use strict';

	WebStorage.$inject = [];
	function WebStorage(){
		return {
			setSessionStorageItem: function(key,value){
				var _value = value;
				if(typeof value == 'object'){
					_value = angular.toJson(value);
				}
				window.sessionStorage.setItem(key,_value);
			},
			getSessionStorageItem: function(key){
				var g = window.sessionStorage.getItem(key);
				if(!g){
					return null;
				}
				try {
					angular.fromJson(g);
				}catch(e){
					return g;
				}
				return angular.fromJson(g);
			},
			removeSessionStorageItem: function(key){
				window.sessionStorage.removeItem(key);
			},
			clearSessionStorage: function(){
				window.sessionStorage.clear();
			},
			getNumberOfItemsInSessionStorage: function(){
				return window.sessionStorage.length;
			},
			setLocalStorageItem: function(key,value){
				window.localStorage.setItem(key,angular.toJson(value));
			},
			getLocalStorageItem: function(key){
				var g = window.localStorage.getItem(key);
				try {
					angular.fromJson(g);
				}catch(e){
					return g;
				}
				return angular.fromJson(g);
			},
			removeLocalStorageItem: function(key){
				window.localStorage.removeItem(key);
			},
			clearLocalStorage: function(){
				window.localStorage.clear();
			},
			getNumberOfItemsInLocalStorage: function(){
				return window.localStorage.length;
			}
		}
	}

	angular.module('gumga.services.webstorage',[])
	.factory('GumgaWebStorage',WebStorage)
})();
