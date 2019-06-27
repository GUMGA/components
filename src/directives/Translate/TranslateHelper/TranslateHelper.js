	(function(){
	'use strict';

	TranslateHelper.$inject = ['$timeout', '$translate'];
	function TranslateHelper($timeout, $translate) {
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
			returnTranslation: function(string) {
			    return $translate.instant(string);
			}
		};
	}

	angular.module('gumga.directives.translate.translatehelper',[])
	.factory('TranslateHelper',TranslateHelper);

})();
