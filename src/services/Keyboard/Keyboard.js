(function(){
	'use strict';

	Keyboard.$inject = [];
	/**
	 * @ngdoc service
	 * @name gumga.core:GumgaKeyboard
	 * @description 
	 * 	A directive GumgaKeyboard é um Wrapper de uma biblioteca chamada [Mousetrap](https://craig.is/killing/mice) 
	 * 	que é utilizada para adicionar funcionalidades quando determinadas teclas são pressionadas.
	 *
	 * 	# Métodos
	 *
	 *  `GumgaKeyboard.addBind(key,function,event)`
	 *  
	 * 	O método `addBind` adiciona uma função a combinação de teclas passada como parâmetro. Ele recebe três parâmetros, `key` e `function` e `event`.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">key</label> Quais teclas serão clicadas para que a função seja executada.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label> <label class="label label-info">function</label> Função que será executada quando sequência de teclas especificadas for digitada pelo usuário.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">event</label> Em qual evento de teclado será disparado, como por exemplo `keypress` ou`keydown`
	 *  ### Retorno
	 *  - <label class="label label-warning">Boolean</label> Retona um boolean. Se o bind foi feito, retorna true, caso ao contrário retorna false.
	 *  ---
 	 *  `GumgaKeyboard.removeBind(key)`
	 *  
	 * 	O método `removeBind` remove as funções que estão atribuídas a `key` que foi passada . Ele recebe um parâmetro `key`.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">key</label> Quais teclas que o desenvolvedor deseja remover o bind.
	 *  
	 *  ---
	 *  
 	 *  `GumgaKeyboard.triggerBoundedEvent(key)`
	 *  
	 * 	O método `triggerBoundedEvent` dispara o evento atribuído a `key` que foi passada.
	 * 	
	 *  ###Parâmetros
	 *  
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">key</label> Quais teclas que o desenvolvedor deseja remover o bind.
	 *  
	 *  ---
	 *
	 * 	`GumgaKeyboard.bindToElement(element,key,function,event)`
 	 *  
	 * 	O método `bindToElement` adiciona uma função a combinação de teclas passada como parâmetro em um elemento específico. Ele recebe quatro parâmetros,`element`, `key` e `function` e `event`.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">Element</label><label class="label label-info">element</label> Elemento no qual a sequência de teclas deve ser executada para disparar o evento.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">key</label> Quais teclas serão clicadas para que a função seja executada.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label> <label class="label label-info">function</label> Função que será executada quando sequência de teclas especificadas for digitada pelo usuário.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">event</label> Em qual evento de teclado será disparado, como por exemplo `keypress` ou`keydown`
	 *  ### Retorno
	 *  - <label class="label label-warning">Boolean</label> Retona um boolean. Se o bind foi feito, retorna true, caso ao contrário retorna false.
	 *  ---
	 *
 	 * 	`GumgaKeyboard.unbindFromElement(element,key)`
 	 *  
	 * 	O método `unbindFromElement` remove as teclas do elemento passado como parâmetro. Ele recebe dois parâmetros,`element` e `key`.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">Element</label><label class="label label-info">element</label> Elemento no qual a sequência de teclas vai ser retirada.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">key</label> Quais teclas serão removidas do element.
	 *  ---
	 *  
	 * 	`GumgaKeyboard.bindToMultipleElement(array,key,function,event)`
 	 *  
	 * 	O método `bindToElement` adiciona uma função a combinação de teclas passada como parâmetro em um elemento específico. Ele recebe quatro parâmetros,`element`, `key` e `function` e `event`.
	 *  ### Parâmetros
	 *  - <label class="label label-warning" style="margin-right: 1%">Array</label><label class="label label-info">array</label> Lista dos elementos que serão adicionados a sequência de teclas.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">key</label> Quais teclas serão clicadas para que a função seja executada.
	 *  - <label class="label label-warning" style="margin-right: 1%">Object</label> <label class="label label-info">function</label> Função que será executada quando sequência de teclas especificadas for digitada pelo usuário.
	 *  - <label class="label label-warning" style="margin-right: 1%">String</label><label class="label label-info">event</label> Em qual evento de teclado será disparado, como por exemplo `keypress` ou`keydown`
	 *  ### Retorno
	 *  - <label class="label label-warning">Boolean</label> Retona um boolean. Se o bind foi feito, retorna true, caso ao contrário retorna false.
	 *  ---
	 *
 	 * 	`GumgaKeyboard.getBinds()`
 	 *  
	 * 	O método `getBinds` retorna todos os binds que foram adicionados.
	 *
	 * 
	 *  ### Retorno
	 *  - <label class="label label-warning">Array</label> Retorna uma lista de todos os binds já feitos.
	 *  
	 *  ---
	 */
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