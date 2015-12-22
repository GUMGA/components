(function(){
	'use strict';

	Keyboard.$inject = [];
	function Keyboard(){
		return {
			addBind: function(key,fn,event){
				if(key && fn){
					Mousetrap.bind(key,fn,event? event : '');
					this.__binds.push(key);
					return true;
				}
				return false;
			},removeBind: function(key){
				if(key){
					Mousetrap.unbind(key);
					this.__binds.splice(this.__binds.indexOf(key),1);
				}
			},
			triggerBoundedEvent: function(key){
				if(key){
					Mousetrap.trigger(key);
				}
			},
			bindToElement: function(element,key,fn,event){
				if(element && key && fn){
					Mousetrap(element).bind(key,fn,event ? event: '');
					this.__binds.push(key);
					return true;
				}
				return false;
			},
			unbindFromElement: function(element,key){
				if(element && key) {
					Mousetrap(element).unbind(key);
				}
			},
			bindToMultipleElements: function(arrayOfElements,key,fn,event){
				for(var i = 0, len = arrayOfElements.length; i < len; i++) if(key && fn){
					Mousetrap(arrayOfElements[i]).bind(key,fn,event? event: '');
					this.__binds.push(key);
				}
			},
			getBinds: function(){
				return this.__binds;
			},
			__binds: []
		}
	}
	angular.module('gumga.services.keyboard',[])
		.factory('GumgaKeyboard',Keyboard);
})();
