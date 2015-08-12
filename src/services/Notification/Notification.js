(function(){
	'use strict';

	angular.module('gumga.services.notifications',[])
		.factory('GumgaNotification',function(){
			return {
				_dangerMessages:{},
				_successMessages:{},
				_warningMessages:{},
				_infoMessages:{},				
				createDangerMessage: function(){

				},	
				createSuccessMessage: function(){

				},
				createWarningMessage: function(){

				},
				createInfoMessage: function(){

				}
			}
		})
})();