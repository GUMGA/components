'use strict';
describe('Componente: GumgaTagColumn', () => {
  let scope;

  beforeEach(module('gumga.tag.tag'));
  beforeEach(module('gumga.tag.column'));

  beforeEach(inject(($compile, $rootScope) => {
    scope = $rootScope.$new();
    scope.entity = {};
    scope.entity.data = [];
    scope.search = function($text){};

    let template  = ` <gumga-tag ng-model="entity.data" data-available-search="search($text)" data-selected-search="search($text)"> <gumga-tag-column></gumga-tag-column></gumga-tag>`,
        element   = angular.element(template);

    $compile(element)(scope);
  }))


  describe(' ', () => {
    it('  ', () => {

    })
  })

})
