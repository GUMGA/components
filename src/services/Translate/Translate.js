(function(){
	'use strict';


		Translate.$inject= [];
		function Translate(){
			return {
				$get: function($http){
					var self = this;
					$http.get('/i18n/'+self._language + '.json')
						.success(function SuccessGet(values){
							localStorage.setItem('GUMGA'+ self._language,JSON.stringify(values));
							localStorage.setItem('GUMGACurrent',self._language);
						})
					return self;
				},
				setLanguage: function(language){
					if(!language) throw 'You must pass a language to GumgaTranslate';
					this._language.toLowerCase() !== language.toLowerCase() ? this._language = language : function(){};
				},
				_language: 'pt-br'
			}
		}

		angular.module('gumga.services.translate',['gumga.services.translate.helper'])
		.provider('$gumgaTranslate',Translate)
})();