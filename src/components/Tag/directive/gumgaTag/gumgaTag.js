'use strict';

controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$q'];

function controller($scope, $element, $attrs, $transclude, $q){
  const NGMODEL_ERR     = 'É necessário o atributo ngModel para a directive gumgaTag',
        DATASEARCH_ERR  = 'É necessário uma função no atributo dataSearch no seguinte formato: [data-search="foo($text)"]';

  if(!$attrs.ngModel) console.error(NGMODEL_ERR);
  if(!$attrs.search) console.error(DATASEARCH_ERR);

  $attrs.$observe('noSearch', () => (this.noSearch = (this.noSearch === 'true')));

  function getContent(){
    let content = '{{$value.definition}}';
    $transclude((clone) => {
      angular.forEach(clone, (cloneElement) => {
        const node = angular.element(cloneElement);
        if(node[0].nodeName == 'TAG-CONTENT'){
          content = node[0].innerText;
        }
      })
    })
    return content;
  }

  function searchFunction($text){
    return $q.when(this.dataSearch({$text}));
  }

  this.tagContent     = getContent();
  this.searchFunction = searchFunction;
  this.noSearch       = (!!this.noSearch);
  this.selectedText   = (!!$attrs.selectedText) ? $attrs.selectedText : 'Selecionados';
  this.availableText  = (!!$attrs.availableText) ? $attrs.availableText : 'Disponíveis';
}
gumgaTag.$inject = [];

function gumgaTag(){
  let template = `
    <gumga-tag-column></gumga-tag-column>
  `
  return {
    restrict: 'E',
    scope: {
      ngModel: '=',
      dataSearch: '&',
      noSearch: '@?'
    },
    bindToController: true,
    transclude: true,
    template,
    controllerAs: 'gumgaTag',
    controller
  }
}

angular.module('gumga.tag.tag', [])
  .directive('gumgaTag', gumgaTag);
