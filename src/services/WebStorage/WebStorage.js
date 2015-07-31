(function(){
	'use strict';

	WebStorage.$inject = [];
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaWebStorage
	 * @description 
	 * 
	 * 	O service GumgaWebStorage é utilizado para ajudar o desenvolvedor a trabalhar com o storage do Browser.
	 *
	 * 	#Métodos
	 *
	 *	---
	 * 
	 *  `GumgaWebStorage.setSessionStorageItem(key,value)`
	 *  
	 *  O método setSessionStorageItem aceita dois parâmetros `key` e `value`.
 	 *  
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">key</label> Qual o identificador do valor que será salvo.
	 *  - <label class="label label-warning" style="margin-right: 1%">[String|Number|Object]</label> <label class="label label-info">value</label> Valor que será salvo no sessionStorage.
	 *  ---
 	 * 
	 *  `GumgaWebStorage.getSessionStorageItem(key)`
	 *  
	 *  O método setSessionStorageItem aceita um parâmetro `key`.
 	 *  
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">key</label> Qual o identificador do valor que será salvo.
	 *
	 *  ### Retorno
	 *  - <label class="label label-warning" style="margin-right: 1%">[String|Number|Object]</label> <label class="label label-info">key</label> Retorna o valor que estiver na sessionStorage daquela key específica. Caso não encontre,
	 *  o valor retornado é null.
	 *  ---
	 *
 	 *  `GumgaWebStorage.removeSessionStorageItem(key)`
	 *  
	 *  O método removeSessionStorageItem aceita um parâmetro `key`.
 	 *  
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">key</label> Qual o identificador do valor que será removido da sessionStorage.
	 *
	 *  --- 
	 *
	 *  `GumgaWebStorage.clearSessionStorage()`
	 *  
	 *  O método clearSessionStorage não aceita nenhum parâmetro e limpa a sessionStorage.
 	 *  
	 *  --- 
	 *
 	 *
	 *  `GumgaWebStorage.getNumberOfItemsInSessionStorage()`
	 *  
	 *  O método getNumberOfItemsInSessionStorage não aceita nenhum parâmetro, e retorna o número de itens no localStorage.
 	 *  
	 *  --- 
	 *
 	 * 
	 *  `GumgaWebStorage.setLocalStorageItem(key,value)`
	 *  
	 *  O método setLocalStorageItem aceita dois parâmetros `key` e `value`.
 	 *  
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">key</label> Qual o identificador do valor que será salvo.
	 *  - <label class="label label-warning" style="margin-right: 1%">[String|Number|Object]</label> <label class="label label-info">value</label> Valor que será salvo no LocalStorage.
	 *  ---
 	 * 
	 *  `GumgaWebStorage.getLocalStorageItem(key)`
	 *  
	 *  O método setLocalStorageItem aceita um parâmetro `key`.
 	 *  
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">key</label> Qual o identificador do valor que será salvo.
	 *
	 *  ### Retorno
	 *  - <label class="label label-warning" style="margin-right: 1%">[String|Number|Object]</label> <label class="label label-info">key</label> Retorna o valor que estiver na LocalStorage daquela key específica. Caso não encontre,
	 *  o valor retornado é null.
	 *  ---
	 *
 	 *  `GumgaWebStorage.removeLocalStorageItem(key)`
	 *  
	 *  O método removeLocalStorageItem aceita um parâmetro `key`.
 	 *  
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label> <label class="label label-info">key</label> Qual o identificador do valor que será removido da LocalStorage.
	 *
	 *  --- 
	 *
	 *  `GumgaWebStorage.clearLocalStorage()`
	 *  
	 *  O método clearLocalStorage não aceita nenhum parâmetro e limpa o localStorage.
 	 *  
	 *  --- 
 	 *
	 *  `GumgaWebStorage.getNumberOfItemsInLocalStorage()`
	 *  
	 *  O método getNumberOfItemsInLocalStorage não aceita nenhum parâmetro, e retorna o número de itens no localStorage.
 	 *  
	 *  --- 
	 */
	function WebStorage(){
		return {
			setSessionStorageItem: function(key,value){
				var _value = value;
				if(typeof value == 'object'){
					_value = angular.toJson(value);
				}
				window.sessionStorage.setItem(key,_value);
			},
			getSessionStorageItem: function(key){
				var g = window.sessionStorage.getItem(key);
				if(!g){
					return null;
				}
				try {
					angular.fromJson(g);
				}catch(e){
					return g;
				}
				return angular.fromJson(g);
			},
			removeSessionStorageItem: function(key){
				window.sessionStorage.removeItem(key);
			},
			clearSessionStorage: function(){
				window.sessionStorage.clear();
			},
			getNumberOfItemsInSessionStorage: function(){
				return window.sessionStorage.length;
			},
			setLocalStorageItem: function(key,value){
				window.localStorage.setItem(key,angular.toJson(value));
			},
			getLocalStorageItem: function(key){
				var g = window.localStorage.getItem(key);
				try {
					angular.fromJson(g);
				}catch(e){
					return g;
				}
				return angular.fromJson(g);
			},
			removeLocalStorageItem: function(key){
				window.localStorage.removeItem(key);
			},
			clearLocalStorage: function(){
				window.localStorage.clear();
			},
			getNumberOfItemsInLocalStorage: function(){
				return window.localStorage.length;
			}
		}
	}

	angular.module('gumga.services.webstorage',[])
	.factory('GumgaWebStorage',WebStorage)
})();