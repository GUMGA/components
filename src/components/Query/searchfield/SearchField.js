(function(){

	SearchField.$inject = []

	function SearchField(){
		const restrict	= 'E',
					scope			=	{ field: '@?', label: '@?', 'select': '=?' },
					require		=	'^^gumgaQuery'



		const link = (scope, elm, attrs, controller) => {
			if(!attrs.field) console.error	(`É necessário passar um atributo field para o search-field`)
			
		}


		return { restrict, scope, link, require }	
	}

	angular.module('gumga.query.searchfield', [])
	.directive('searchField', SearchField)
})();