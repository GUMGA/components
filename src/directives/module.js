(function(){
	'use strict';

	angular.module('gumga.directives',
		[
		'gumga.directives.address',
		// 'gumga.directives.queries',
		'gumga.directives.alert',
		'gumga.directives.breadcrumb',
		'gumga.directives.counter',
		'gumga.directives.menu',
		'gumga.directives.nav',
		'gumga.directives.onetomany',
		'gumga.directives.search',
		'gumga.directives.table',
		'gumga.directives.upload',
		'gumga.directives.form',
		'gumga.directives.mask',
		'gumga.directives.translate',
		'gumga.directives.customfields',
		// 'gumga.directives.filter',
		'gumga.translate.filter',
		])
		.config(['$provide', function ($provide) {

		  $provide.decorator('uibDatepickerPopupDirective', ['$delegate','VanillaMasker', function ($delegate, VanillaMasker) {
		    var directive = $delegate[0];
		    var link = directive.link;

		    directive.compile = function () {
		      return function (scope, element, attrs) {
		        link.apply(this, arguments);
						let pattern = attrs.uibDatepickerPopup.length == 0 ? '9999-99-99' : attrs.uibDatepickerPopup.replace(/d|D|m|M|y|Y/g, '9')
						VanillaMasker(element[0]).maskPattern(pattern)
		      };
		    };

		    return $delegate;
		  }]);
		}]);
})();
