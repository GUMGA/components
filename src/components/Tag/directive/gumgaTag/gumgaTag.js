'use strict';

controller.$inject = ['$scope', '$element', '$attrs', '$transclude', '$q', '$rootScope'];

function controller($scope, $element, $attrs, $transclude, $q, $rootScope){
  const DATASELECTEDSEARCH_ERR  = 'É necessário o atributo ngModel para a directive gumgaTag',
  DATAAVAILABLESEARCH_ERR = 'É necessário uma função no atributo dataSearch no seguinte formato: [data-search="foo($text)"]';

  if(!$attrs.selectedSearch)  console.error(DATASELECTEDSEARCH_ERR);
  if(!$attrs.availableSearch) console.error(DATAAVAILABLESEARCH_ERR);

  this.filterReference        = {};
  this.selectedArray          = [];
  this.callbacks              = {};
  this.selectedText           = (!!$attrs.selectedText) ? $attrs.selectedText : 'Selecionados';
  this.availableText          = (!!$attrs.availableText) ? $attrs.availableText : 'Disponíveis';
  this.tagContent             = getContent();
  this.addTo                  = addTo;
  this.getAvailable           = getAvailable;
  this.getDragElement         = getDragElement;
  this.getSelected            = getSelected;
  this.getValueFromAvailable  = getValueFromAvailable;
  this.getIndexFromSelected   = getIndexFromSelected;
  this.searchAvailable        = searchAvailable;
  this.searchSelected         = searchSelected;
  this.setDragElement         = setDragElement;
  this.updateAvailable        = updateAvailable;
  this.updateObject           = updateObject;
  this.updateSelected         = updateSelected;

  // Custom events
  this.emit = function (ev,data){
    if(this.callbacks[ev]) this.callbacks[ev].forEach((cb)=> cb(data));
    return this;
  }
  this.on = function (ev,cb) {
    if(!this.callbacks[ev]) this.callbacks[ev] = [];
    this.callbacks[ev].push(cb);
    return this;
  }

  function addTo(panel, tag){
    let returnFunction, newArray;
    if(panel == 'right'){
      newArray        = angular.copy(this.selectedArray);
      newArray.push(this.getValueFromAvailable(tag));
      this.updateObject(newArray).updateSelected([this.getValueFromAvailable(tag)]);
      returnFunction  = (value => this.updateAvailable(this.availableArray));
      this.emit(tag);
    } else {
      this.selectedArray.splice(this.getIndexFromSelected(tag), 1 )
      this.updateObject(this.selectedArray);
      returnFunction  = (text => {
        this.searchAvailable(text)
        .then(data => this.updateAvailable(data.data ? data.data.values : data));
      })
    }
    return returnFunction;
  }

  function getAvailable(){
    return this.availableArray;
  }

  function getContent(){
    let content = '{{$value.definition}}';
    $transclude((clone) => {
      angular.forEach(clone, (cloneElement) => {
        const node = angular.element(cloneElement)[0];
        if(node.nodeName == 'TAG-CONTENT') content = node.innerText;
      })
    })
    return content;
  }

  function getDragElement(){
    return this.dragElement;
  }

  function getValueFromAvailable(name){
    return this.availableArray.filter(value => value.name == name)[0];
  }

  function getIndexFromSelected(name){
    let returnedIndex;
    for(let i = 0, len = this.selectedArray.length; i < len; i++){
      if(name == this.selectedArray[i].name){
        returnedIndex = i;
        break;
      }
    }
    return returnedIndex;
  }

  function getSelected(){
    return this.selectedArray;
  }

  function searchAvailable($text){
    return $q.when(this.availableSearch({$text}));
  }

  function searchSelected(){
    return $q.when(this.selectedSearch());
  }

  function setDragElement(id){
    this.dragElement  = id;
  }

  function updateAvailable(data = []){
    this.availableArray = data.filter(value => !this.filterReference[value.name]);
    return this;
  }

  function updateObject(data = []){
    if(!Array.isArray(data)) console.error('O objeto retornado pela chamada asíncrona [selected-search="foo()"] precisa ser um Array.');
    this.filterReference = {};
    data.forEach(value => (this.filterReference[value.name] = value));
    return this;
  }

  function updateSelected(data = [], operation = 'add'){
    data.forEach(value => this.selectedArray.push(value));
    return this;
  }

  (() => {
    $q.all([this.searchSelected(), this.searchAvailable()])
    .then((data) => {
      let selectedData  = data[0].data ? data[0].data.values : data[0],
      availableData = data[1].data ? data[1].data.values : data[1];
      this.updateObject(selectedData);
      this.updateSelected(selectedData);
      this.updateAvailable(availableData);
    })
  })();
}

gumgaTag.$inject = [];

function gumgaTag(){
  let template = `
  <gumga-tag-column has-search="true" array="gumgaTag.availableArray" id="left" label="{{::gumgaTag.availableText}}"></gumga-tag-column>
  <gumga-tag-column array="gumgaTag.selectedArray" id="right" label="{{::gumgaTag.selectedText}}" has-collapse="true"></gumga-tag-column>
  `
  return {
    restrict: 'E',
    scope: {
      selectedSearch: '&',
      availableSearch: '&',
      selectedArray: '=ngModel'
    },
    bindToController: true,
    transclude: true,
    template,
    controllerAs: 'gumgaTag',
    controller,
  }
}

angular.module('gumga.tag.tag', [])
.directive('gumgaTag', gumgaTag);
