	(function(){
	'use strict';

	TranslateHelper.$inject = ['$timeout'];
	function TranslateHelper($timeout){
		return {
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
				sessionStorage.setItem('language', angular.toJson(this.translators));
			},
			returnTranslation: function(string){
			    return "Estou realizando uma tradução";
				//return this.translators[string.toLowerCase().replace(/\s/g, '')];
			}
		};
	}

	angular.module('gumga.directives.translate.translatehelper',[])
	.factory('TranslateHelper',TranslateHelper);

})();
