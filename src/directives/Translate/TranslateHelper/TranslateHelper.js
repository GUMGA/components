(function(){
	'use strict';

	TranslateHelper.$inject = ['$timeout'];
	function TranslateHelper($timeout){
		return {
			getSessionStorageItem: function(key){
				var g = window.sessionStorage.getItem(key);
				if(!g){ return null; }
				try { angular.fromJson(g); }catch(e){ return g; }
				let translateItems = angular.fromJson(angular.fromJson(g));
				this.setTranslators('pt-br', translateItems);
				return this.translators;
			},
			translators: {},
			setTranslators: function(language,obj){
				let self = this;
				function iterate(obj,string){
					for(var key in obj) if(obj.hasOwnProperty(key)){
						(typeof obj[key] == 'object') ?
							iterate(obj[key], string + '.' + key) : self.translators[(string + '.' + key).substring(1).toLowerCase()] = obj[key];
					}
				}
				iterate(obj, '');
			},
			returnTranslation: function(string){
				return this.translators[string];
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
