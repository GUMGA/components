(function(){
	'use strict';

	TranslateHelper.$inject = ['$timeout'];
	function TranslateHelper($timeout){
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
			returnTranslation: function(string){
				var array = string.split('.');
				try {
					return this.translators[array[0].toLowerCase().trim()][array[1].toLowerCase().trim()];
				} catch(e){}
			},
			returnTranslationFrom: function(key, word){
				var lang = window.sessionStorage.getItem(key);
				if (!lang) throw 'Linguagem chamada não foi carregada, verifique o diretório i18n do seu projeto.';
				var currentLang;
				currentLang = angular.fromJson(angular.fromJson(lang));
				var words = word.split('.');
				try {
					return currentLang[words[0].toLowerCase().trim()][words[1].toLowerCase().trim()];
				} catch(e){}
			}
		};
	}

	angular.module('gumga.directives.translate.translatehelper',[])
	.factory('TranslateHelper',TranslateHelper);

})();
