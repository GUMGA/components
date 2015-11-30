(function(){
	'use strict';

	SearchHelper.$inject = [];
	function SearchHelper(){
		var types ={
			"string": {
				"HQLPossibilities": [
				{hql:"eq",label: "igual" , before: "='",after:"'"},
				{hql:"ne",label: "diferente de" , before: "!='",after:"'"},
				{hql: "contains",label: "contém" , before: " like '\%",after:"\%'"},
				{hql: "not_contains",label:"não contém" , before: " not like '\%",after:"\%'"},
				{hql: "starts_with",label:"começa com" , before: " like '",after:"\%'"},
				{hql: "ends_with",label: "termina com" , before: " like '\%",after:"'"},
				{hql: "ge",label:"maior igual" , before: ">='",after:"'"},
				{hql: "le",label: "menor igual" , before: "<='",after:"'"}]
			},
			"number": {
				"HQLPossibilities": [
				{hql:"eq",label: "igual", before: "=",after:""},
				{hql:"ne",label: "diferente de", before: "!=",after:""},
				{hql: "gt",label:"maior que", before: ">",after:""},
				{hql: "ge",label:"maior igual", before: ">=",after:""},
				{hql: "lt",label:"menor que", before: "<",after:""},
				{hql: "le",label:"menor igual", before: "<=",after:""}]
			},
			"money": {
				"HQLPossibilities": [
				{hql:"eq",label: "igual", before: "=",after:""},
				{hql:"ne",label: "diferente de", before: "!=",after:""},
				{hql: "gt",label:"maior que", before: ">",after:""},
				{hql: "ge",label:"maior igual", before: ">=",after:""},
				{hql: "lt",label:"menor que", before: "<",after:""},
				{hql: "le",label:"maior igual", before: "<=",after:""}]

			},
			"boolean": {
				"HQLPossibilities": [{hql:"eq",label: "igual" , before: "='",after:"'"}]
			},
			"date": {
				"HQLPossibilities": [
				{hql: "eq", label: "igual", before: "='", after: "'"},
				{hql: "ge", label: "maior igual", before: ">='", after: "'"},
				{hql: "le", label: "menor igual", before: "<='", after: "'"}]
			}
		};
		return {
			getTypeListOfHQLPossibilities: function(type){
				if(angular.isDefined(types[type]))
					return types[type].HQLPossibilities;
				throw 'Type doesn\'t exist';
			},
			translateArrayToHQL: function(array){
				return array
				.map(function(element) {
					return (
						(angular.isDefined(element.attribute) ? 'obj.' + element.attribute.name : '*')
						+ '' +
						(angular.isDefined(element.hql) ? element.hql.before : ' *')
						+ '' +
						element.value
						+ (angular.isDefined(element.hql) ? element.hql.after : ' *') );
				}).map(function(element){
					if(element.indexOf('*') != -1){
						return element.replace(/\*/g,'');
					}
					return element;
				}).join("");
			}
		};
	}
	angular.module('gumga.directives.search.searchhelper',[])
	.factory('GumgaSearchHelper',SearchHelper)
})();
