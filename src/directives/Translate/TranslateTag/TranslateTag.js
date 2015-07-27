(function(){
	'use strict';
	TranslateTag.$inject = ['GumgaTranslateHelper','$compile'];
	function TranslateTag(GumgaTranslateHelper,$compile){
		var child;
		return {
			restrict: 'A',
			scope: {
				gumgaTranslateTag: '@'
			},
			link: function(scope,elm,attrs){
				if(GumgaTranslateHelper.returnTranslation(scope.gumgaTranslateTag.split('.'))){
					if(elm[0].childNodes.length > 1){
						scope.child = elm[0].childNodes[1];
						elm[0].innerHTML =  GumgaTranslateHelper.returnTranslation(scope.gumgaTranslateTag.split('.'));
						elm.append($compile(scope.child)(scope));
					} else {
						elm[0].innerHTML = GumgaTranslateHelper.returnTranslation(scope.gumgaTranslateTag.split('.'));
					}
				}
			}

		};
	}

	angular.module('gumga.directives.translate.translatetag',['gumga.directives.translate.translatehelper'])
		.directive('gumgaTranslateTag',TranslateTag);
})();