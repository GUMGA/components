(function(){
	'use strict';
	Translate.$inject = ['$http','TranslateHelper', '$timeout'];
	function Translate($http,TranslateHelper, $timeout){
		var ch = 0;
		return {
			restrict: 'AEC',
			scope: false,
			priority: 9999,
			link: function($scope,$elm,$attrs){
				var language = $attrs.gumgaTranslate.toLowerCase() || navigator.language.toLowerCase();
				$http.get('./i18n/' + language + '.json')
				.then(function(values){
					TranslateHelper.setTranslators(language,values.data);
				});
			}
		};
	}

	angular.module('gumga.directives.translate.translate',['gumga.directives.translate.translatehelper'])
	.directive('gumgaTranslate',Translate);
})();
