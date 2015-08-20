(function(){
	'use strict';

	Notification.$inject =['$http','$q'];
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaNotification
	 * @description
	 */
	function Notification($http,$q){
		var token = window.sessionStorage.getItem('token');
		var url = 'http://192.168.25.201/security-api/notifications/source?gumgaToken=' + token;
		var eventSource;

		this.getEvent = getEvent;
		this.newMessages = newMessages;
		this.newMessagesCount = newMessagesCount;

		function setUrl(url) {
			url = url;
		}
		function setToken(token) {
			token = token;
		}
		function getEvent() {
			if (token) url.concat('?gumgaToken=' + token);
			return new EventSource(url);
		}
		function newMessages() {
			getEvent().addEventListener('message', function(event) {
				var data = JSON.parse(event.data);
				console.log(data.newMessages);
				return data.newMessages;
			}, false);
		}
		function newMessagesCount() {
			getEvent().addEventListener('message', function(event) {
				var data = JSON.parse(event.data);
				console.log(data.newMessagesCount);
				return data.newMessagesCount;
			}, false);
		}
	}
	angular.module('gumga.services.notification',[])
	.service('GumgaNotification',Notification);
})();
