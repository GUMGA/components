(function(){
	'use strict';
	/**
	 * @ngdoc directive
	 * @name gumga.core:gumgaSearch
	 * @restrict E
	 * @description A directive gumgaSearch pode ser utilizada para fazer montar queries de busca, sejam essas buscas normais ou avançadas. É possível escolher
	 * quais campos no qual a busca será feita, assim como na busca avançada.
	 * ## Exemplo
     * Veja um exemplo em funcionamento [aqui](http://embed.plnkr.co/ezZITh3ZfmwVao0Xz1w6/preview).
	 *
	 * O componente utiliza-se de tags que só funcionam dentro das tags do componente, que são as tags `<advanced-field></advanced-field>`. A tag de advanced-field
	 * 	recebe dois atributos como parâmetro: `name` e `type` que recebem , respectivamente, o nome do atributo a ser pesquisado e qual seu tipo.
	 * 	<pre>
	 *  		<advanced-field name="nome" type="string"></advanced-field>
	 *  		<advanced-field name="idade" type="number"></advanced-field>
	 *  </pre>
	 *
	 * @param {Function} advanced-method Parâmetro obrigatório que irá conter uma função que será utilizada para fazer a busca avançada.
	 * Para receber a query avançada, basta passar um parâmetro `param` para a função. `advanced-method="function(param)"`
	 * @param {Function} search-method Parâmetro obrigatório que irá conter uma função que será utilizada para fazer a busca simples.
	 * Para receber o campo e a pesquisa que foi feita, basta passar os parâmetros `field` e `param` para a função. `search-method="function(field,param)"`.
	 * @param {String} fields Parâmetro obrigatório que irá conter uma sequência de campos com o qual o componente irá criar a lista de atributos que serão pesquisáveis.
	 * Exemplo: `fields="id,name,company,age"`
	 * @param {Boolean} advanced Parâmetro não obrigatório que irá conter um valor booleano para controlar se o componente irá ou não fazer busca avançada
	 * @param {Function} on-search Parâmetro não obrigatório que irá conter uma função que será chamada quando uma busca simples for feita.
	 * @param {Function} on-advanced-search Parâmetro não obrigatório que irá conter uma função que será chamada quando uma busca avançada for feita.
	 *
	 *
	 */
	angular.module('gumga.directives.search',
		[
		'gumga.directives.search.search',
		'gumga.directives.search.normalsearch',
		'gumga.directives.search.advancedsearch',
		'gumga.directives.search.advancedlabel',
		'gumga.directives.search.searchhelper'
		]);

})();
