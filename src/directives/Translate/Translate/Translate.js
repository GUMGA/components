(function(){
	'use strict';
	Translate.$inject = ['$http','TranslateHelper'];
	function Translate($http,TranslateHelper){
		var ch = 0;
		return {
			restrict: 'AEC',
			scope: false,
			link: function($scope,$elm,$attrs){
				var language = $attrs.gumgaTranslate.toLowerCase() || navigator.language.toLowerCase();
				if(!TranslateHelper.getSessionStorageItem(language)){
					$http.get('./i18n/' + language + '.json')
					.success(function(values){
						TranslateHelper.setTranslators(language,values);
					});
				}

			}
		};
	}

	angular.module('gumga.directives.translate.translate',['gumga.directives.translate.translatehelper'])
	.directive('gumgaTranslate',Translate);
})();
