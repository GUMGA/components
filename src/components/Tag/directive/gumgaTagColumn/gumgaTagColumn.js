'use strict';

gumgaTagColumn.$inject = [];

function gumgaTagColumn(){

  controller.$inject = ['$scope', '$element', '$attrs', '$compile', 'GumgaKeyboard', '$rootScope'];

  function controller($scope, $element, $attrs, $compile, GumgaKeyboard, $rootScope){
    let tagController   = $element.parent().controller('gumgaTag') || {},
        context         = this;

    const searchString  =`
          <div class="input-group">
            <input  type="text" class="form-control input-inside-tag-column"
                    ng-model="gumgaTagColumn.searchText${$element[0].id}" ng-model-options="gumgaTagColumn.ngModelOptions"
                    ng-blur="gumgaTagColumn.search(gumgaTagColumn.searchText${$element[0].id})"/>
              <span class="input-group-btn">
                <button class="btn btn-default btn-inside-tag-column" ng-disabled="!gumgaTagColumn.searchText${$element[0].id}.length" type="button"
                        ng-click="gumgaTagColumn.search(gumgaTagColumn.searchText${$element[0].id})">
                  <span class="glyphicon glyphicon-search"></span>
                </button>
            </span>
          </div>`;

    // O template de busca será compilado apenas se o atributo has-search estiver  no componente gumgaTagColumn.
    let template  =`
      <div class="col-sm-3 col-md-3">
        <label class="control-label">{{gumgaTagColumn.label}}</label>
        <div class="panel panel-default panel-from-tag-column">
          ${(!!$attrs.hasSearch) ? searchString : ' '}
          <div class="panel-body body-column" style="display: inline-block;">
            <div class='col-md-12'>
              <span ng-repeat="tag in gumgaTagColumn.tags">
                <gumga-unity-tag  name="{{::tag.definition.name}}" attributes="tag.definition.attributes" >
                </gumga-unity-tag>
              </span>
            </div>
          </div>
        </div>
      </div>`;

    function handleDragStart(e){
      tagController.setDragElement($element[0].id);
    }

    function handleDragEnd(e){
      e.preventDefault();
      if(tagController.getDragElement() != $element[0].id){
        let tag                       = e.srcElement.innerText.split('(')[0].trim();
        tagController.addTo(tagController.getDragElement(), tag)(' ');
      }
    }

    function handleDragEnter(e){
      e.preventDefault();
      tagController.setDragElement($element[0].id);
    }


    function cleanPopovers(){
      let popovers = document.querySelectorAll('[popover]');
      angular.forEach(popovers, function( popover ){
        angular.element(popover).isolateScope().tt_isOpen = false;
      });

      let popoversClasses = document.querySelectorAll('.popover');
      angular.forEach(popoversClasses, popover => {
        angular.element(popover).remove();
      })
    }

    function setActive(name = null){
      tagController.activeTag = name;
    }

    function getActive(){
      return tagController.activeTag;
    }

    function on(tag, cb){
      tagController.on(tag, cb);
    }

    $element[0].addEventListener('dragstart', handleDragStart, false);
    $element[0].addEventListener('dragend', handleDragEnd, false);
    $element[0].addEventListener('dragenter', handleDragEnter, false);

    function search($text = ' '){
      tagController.searchAvailable($text)
        .then((data) => {
          tagController.updateAvailable(data.data ? data.data.values : data);
        });
    }

    function removeMe(tag){
      tagController.addTo('left', tag)(' ');
    }

    this.ngModelOptions = { updateOn: 'default blur', debounce: { 'default': 150, 'blur': 0 } };
    this.removeMe       = removeMe;
    this.search         = search;
    this.id             = $attrs.id;
    this.cleanPopovers  = cleanPopovers;
    this.setActive      = setActive;
    this.getActive      = getActive;
    this.on             = on;

    $element.append($compile(angular.element(template))($scope));

    GumgaKeyboard.bindToElement($element[0],'mod+enter',val =>  this.search(this[`searchText${$element[0].id}`]))
    GumgaKeyboard.bindToElement($element[0],'enter',val =>  this.search(this[`searchText${$element[0].id}`]))

  }

  return {
    restrict: 'E',
    controller,
    controllerAs: 'gumgaTagColumn',
    bindToController: true,
    scope: {
      tags: '=array',
      label: '@'
    }
  }
}

angular.module('gumga.tag.column', [])
  .directive('gumgaTagColumn', gumgaTagColumn);
