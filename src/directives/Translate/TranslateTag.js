(function(){
	'use strict';
	TranslateTag.$inject = ['GumgaTranslateHelper','$compile'];
	function TranslateTag(GumgaTranslateHelper,$compile){
		var child;
		return {
			restrict: 'A',
			link: function(scope,elm,attrs){
				if(!attrs.gumgaTranslateTag) throw 'You must pass a valid value to gumgaTranslateTag';
				scope.__valueToTranslate = attrs.gumgaTranslateTag;
				if(GumgaTranslateHelper.getTranslate(scope.__valueToTranslate)){
					if(elm[0].childNodes.length > 0){
						scope.child = elm[0].childNodes[0];
						elm[0].innerHTML =  GumgaTranslateHelper.getTranslate(scope.__valueToTranslate);
						elm.append($compile(scope.child)(scope));
					} else {
						elm[0].innerHTML = GumgaTranslateHelper.getTranslate(scope.__valueToTranslate);
					}
				}
			}

		};
	}

	angular.module('gumga.directives.translatetag',['gumga.services.translate.helper','gumga.services.translate'])
		.directive('gumgaTranslateTag',TranslateTag);
})();