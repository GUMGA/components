'use strict';

controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$q'];

function controller($scope, $element, $attrs, $transclude, $q){
  const DATASELECTEDSEARCH_ERR     = 'É necessário o atributo ngModel para a directive gumgaTag',
        DATAAVAILABLESEARCH_ERR  = 'É necessário uma função no atributo dataSearch no seguinte formato: [data-search="foo($text)"]';

  if(!$attrs.selectedSearch) console.error(DATASELECTEDSEARCH_ERR);
  if(!$attrs.availableSearch) console.error(DATAAVAILABLESEARCH_ERR);

  this.filterReference  = {};
  this.selectedText     = (!!$attrs.selectedText) ? $attrs.selectedText : 'Selecionados';
  this.availableText    = (!!$attrs.availableText) ? $attrs.availableText : 'Disponíveis';
  this.tagContent       = getContent();
  this.searchAvailable  = searchAvailable;
  this.searchSelected   = searchSelected;
  this.updateObject     = updateObject;

  function getContent(){
    let content = '{{$value.definition}}';
    $transclude((clone) => {
      angular.forEach(clone, (cloneElement) => {
        const node = angular.element(cloneElement);
        if(node[0].nodeName == 'TAG-CONTENT') content = node[0].innerText;
      })
    })
    return content;
  }

  function searchSelected(){
    console.log(this.dataAvailableSearch());
    return $q.when(this.dataSelectedSearch());
  }

  function searchAvailable($text){
    console.log(this.dataSelectedSearch());
    return $q.when(this.dataAvailableSearch({$text}));
  }

  function updateObject(){
    this.filterReference = {};
  }

  $q.all([this.searchSelected(), this.searchAvailable()])
    .then((data) => {
      console.log(data);
    })
}

gumgaTag.$inject = [];

function gumgaTag(){
  let template = `
    <gumga-tag-column has-search="true"></gumga-tag-column>
    <gumga-tag-column></gumga-tag-column>
  `
  return {
    restrict: 'E',
    scope: {
      dataSelectedSearch: '&',
      dataAvailableSearch: '&'
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
