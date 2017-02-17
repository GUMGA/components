(function(){
	'use strict';
	DateService.$inject = [];
	function DateService(){
		return {
			formats: {
				DMY: /^(\d{1,2})\-(\d{1,2})\-(\d{4})$/,
				YMD: /^(\d{4})\-(\d{1,2})\-(\d{1,2})$/
			},
			validateFormat: function(format, date) {
				if (!this.formats.hasOwnProperty(format)) {
					console.error('Formato não suportado');
				}
				var regex = new RegExp(this.formats[format]);
				if (!regex.test(date)) {
					console.error('A data ' + date + ' não confere com o formato ' + format + '.');
				}
				return regex.test(date);
			}
		}
	}
	angular.module('gumga.services.date',[])
	.factory('GumgaDateService',DateService);
})();
