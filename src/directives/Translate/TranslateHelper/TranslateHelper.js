(function(){
	'use strict';

	function TranslateHelper(){
		return {
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
				this.translators = angular.fromJson(angular.fromJson(g));
				return angular.fromJson(angular.fromJson(g));
			},
			translators: {},
			setTranslators: function(language,obj){
				this.translators = obj;
				this.setSessionStorageItem(language,JSON.stringify(obj));
			},
			setSessionStorageItem: function(key,value){
				window.sessionStorage.setItem(key,angular.toJson(value));
			},
			returnTranslation: function(array){
				try {
					return this.translators[array[0].toLowerCase().trim()][array[1].toLowerCase().trim()];
				} catch(e){}
			}
		};
	}

	angular.module('gumga.directives.translate.translatehelper',[])
	.factory('TranslateHelper',TranslateHelper);

})();