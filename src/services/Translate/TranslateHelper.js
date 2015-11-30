(function(){
	'use strict';

	TranslateHelper.$inject = [];

	function TranslateHelper() {
		return {
			_translation: {},
			__getFromLocalStorage: function(){
				var language = localStorage.getItem('GUMGACurrent')
				,		self = this;
				function iterate(obj,string){
					for(var key in obj) if(obj.hasOwnProperty(key)){
						(typeof obj[key] == 'object') ?
							iterate(obj[key], string + '.' + key) : self._translation[(string + '.' + key).substring(1)] = obj[key];
					}
				}
				if(language && localStorage.getItem('GUMGA' + language)){
					iterate(JSON.parse(localStorage.getItem('GUMGA' + language)),'');
					return true;
				}

			},
			getTranslate: function(toTranslate){
				var self = this;
				if (Object.getOwnPropertyNames(self._translation).length === 0)
					self.__getFromLocalStorage();
				if(!toTranslate || typeof toTranslate != 'string')
					throw 'The value passed to GumgaTranslate is Wrong!';
				if(self._translation[toTranslate])
					return self._translation[toTranslate];
				return toTranslate;
			}
		}
	}

	angular.module('gumga.services.translate.helper',[])
	.factory('GumgaTranslateHelper',TranslateHelper)

})();
