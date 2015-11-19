'use strict';
describe('Componente: GumgaTag', () => {
  let scope,
      $compile,
      templateSimple            = `<gumga-tag></gumga-tag>`,
      elementSimple             = angular.element(templateSimple),
      templateWithContent       = `<gumga-tag><tag-content>{{$value.definition | uppercase}}</tag-content></gumga-tag>`,
      elementWithContent        = angular.element(templateWithContent),
      templateWithngModel       = `<gumga-tag ng-model="entity.tags"></gumga-tag>`,
      elementWithngModel        = angular.element(templateWithngModel),
      templateWithdataSearch    = `<gumga-tag data-search="search($text)"></gumga-tag>`,
      elementWithdataSearch     = angular.element(templateWithdataSearch),
      templateWithnoSearch      = `<gumga-tag no-search="{{entity.age > 10}}"></gumga-tag>`,
      elementWithnoSearch       = angular.element(templateWithnoSearch),
      templateWithSelectedText  = `<gumga-tag selected-text="Tags que foram Selecionadas"></gumga-tag>`,
      elementWithSelectedText   = angular.element(templateWithSelectedText),
      templateWithAvailableText = `<gumga-tag available-text="Tags que estão disponíveis"></gumga-tag>`,
      elementWithAvailableText  = angular.element(templateWithAvailableText);

  beforeEach(module('gumga.tag.tag'));

  beforeEach(inject(($rootScope, _$compile_, _$httpBackend_) => {
      scope                     = $rootScope.$new();
      scope.entity              = {};
      scope.entity.tags         = {};
      scope.entity.age          = 9;
      scope.searchDigDinDigDin  = function(){};
      $compile                  = _$compile_;
      spyOn(console, 'error')
  }))

  describe('Testing incoming variables', () => {
    describe('Should return the right value depending on the tag-content', () => {
      it('Should return the default content', () => {
        $compile(elementSimple)(scope);
        expect(elementSimple.controller('gumgaTag').tagContent).toEqual('{{$value.definition}}');
      })
      it('Should return the content inside of the tagContent', () => {
        $compile(elementWithContent)(scope);
        expect(elementWithContent.controller('gumgaTag').tagContent).toEqual('{{$value.definition | uppercase}}');
      })
    })
    describe('Should throw an error if there is no ngModel', () => {
      it('Should not log the error', () => {
        $compile(elementWithngModel)(scope);
        expect(console.error).not.toHaveBeenCalledWith('É necessário o atributo ngModel para a directive gumgaTag');
      })
      it('Should log the error', () => {
        $compile(elementSimple)(scope);
        expect(console.error).toHaveBeenCalledWith('É necessário o atributo ngModel para a directive gumgaTag');
      })
    })
    describe('Should throw an error if there is no dataSearch', () => {
      it('Should not log the error', () => {
        $compile(elementWithdataSearch)(scope);
        expect(console.error).not.toHaveBeenCalledWith('É necessário uma função no atributo dataSearch no seguinte formato: [data-search="foo($text)"]');
      })
      it('Should log the error', () => {
        $compile(elementSimple)(scope);
        expect(console.error).toHaveBeenCalledWith('É necessário uma função no atributo dataSearch no seguinte formato: [data-search="foo($text)"]');
      })
    })
    describe('Should evaluate the given expression on attribute noSearch', () => {
      it('Should assume the right value when $attrs changes', () => {
        $compile(elementWithnoSearch)(scope);
        let controller = elementWithnoSearch.controller('gumgaTag');
        (scope.entity.age = 11) && scope.$digest();
        expect(controller.noSearch).toBeTruthy();
        (scope.entity.age = 8) && scope.$digest();
        expect(controller.noSearch).toBeFalsy();
      })
      it('Should be falsy if theres no noSearch attribute', () => {
        $compile(elementSimple)(scope);
        let controller = elementSimple.controller('gumgaTag');
        expect(controller.noSearch).toBeFalsy();
      })
    })
    describe('Should get the correct labels(selected and available)', () => {
      it('Should get the right value at [selectedText]', () => {
        $compile(elementSimple)(scope);
        let controller = elementSimple.controller('gumgaTag');
        expect(controller.selectedText).toEqual('Selecionados');
      })
      it('Should get the configured param value at [selectedText]', () => {
        $compile(elementWithSelectedText)(scope);
        let controller = elementWithSelectedText.controller('gumgaTag');
        expect(controller.selectedText).toEqual('Tags que foram Selecionadas');
      })

      it('Should get the right value at [availableText]', () => {
        $compile(elementSimple)(scope);
        let controller = elementSimple.controller('gumgaTag');
        expect(controller.availableText).toEqual('Disponíveis');
      })
      it('Should get the configured param value at [availableText]', () => {
        $compile(elementWithAvailableText)(scope);
        let controller = elementWithAvailableText.controller('gumgaTag');
        expect(controller.availableText).toEqual('Tags que estão disponíveis');
      })
    })
  })
})
