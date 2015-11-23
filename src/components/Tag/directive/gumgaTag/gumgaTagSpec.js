'use strict';
describe('Componente: GumgaTag', () => {
  let scope,
      $compile,
      $httpBackend,
      templateSimple            = `<gumga-tag></gumga-tag>`,
      elementSimple             = angular.element(templateSimple),
      templateWithContent       = `<gumga-tag><tag-content>{{$value.definition | uppercase}}</tag-content></gumga-tag>`,
      elementWithContent        = angular.element(templateWithContent),
      templateWithngModel       = `<gumga-tag data-selected-search="search($text)"></gumga-tag>`,
      elementWithngModel        = angular.element(templateWithngModel),
      templateWithdataSearch    = `<gumga-tag data-available-search="search($text)"></gumga-tag>`,
      elementWithdataSearch     = angular.element(templateWithdataSearch),
      templateWithSelectedText  = `<gumga-tag selected-text="Tags que foram Selecionadas" data-selected-search="searchSelected()" data-available-search="searchAvailable($text)"></gumga-tag>`,
      elementWithSelectedText   = angular.element(templateWithSelectedText),
      templateWithAvailableText = `<gumga-tag available-text="Tags que estão disponíveis" data-selected-search="searchSelected()" data-available-search="searchAvailable($text)"></gumga-tag>`,
      elementWithAvailableText  = angular.element(templateWithAvailableText),
      templateWithFunctions     = `<gumga-tag data-selected-search="searchSelected()" data-available-search="searchAvailable($text)"></gumga-tag>`,
      elementWithFunctions      = angular.element(templateWithFunctions);

      const availableObject = [{ "id": 1, "oi": { "value": null }, "objectType": "gumga.framework.application.Car", "objectId": 1,
          "values": [{"id": 1,"oi": { "value": null },"value": "TSi Turbo","definition": {"id": 1,"oi": { "value": null},"name": "Nome"}},
          {"id": 2,"oi": { "value": null},"value": "2015","definition": {"id": 2,"oi": { "value": null}, "name": "Ano"}}],
          "definition": { "id": 1, "oi": { "value": null}, "name": "Versão", "attributes": [{"id": 1,"oi": { "value": null },"name": "Nome"}, {"id": 2,"oi": { "value": null },"name": "Ano"}]}},

          {"id": 2, "oi": { "value": null },"objectType": "gumga.framework.application.Car", "objectId": 1,
          "values": [{"id": 3, "oi": { "value": null }, "value": "180cv", "definition": { "id": 3, "oi": { "value": null }, "name": "Potência"}},
          {"id": 4, "oi": { "value": null }, "value": "6", "definition": { "id": 4, "oi": { "value": null }, "name": "Cilindros" }}],
          "definition": {"id": 2,  "oi": { "value": null},  "name": "Motorização", "attributes": [{"id": 3,"oi": { "value": null}, "name": "Potência"},{"id": 4,"oi": { "value": null },"name": "Cilindros"}]}
        }],
          selectedObject = [{ "id": 2,"oi": { "value": null }, "objectType": "gumga.framework.application.Car","objectId": 1,
          "values": [{"id": 3, "oi": { "value": null }, "value": "180cv", "definition": { "id": 3, "oi": { "value": null }, "name": "Potência"}},
            {"id": 4, "oi": { "value": null }, "value": "6", "definition": { "id": 4, "oi": { "value": null }, "name": "Cilindros" }}],
          "definition": {"id": 2, "oi": { "value": null },"name": "Motorização", "attributes": [{"id": 3,"oi": { "value": null}, "name": "Potência"},{"id": 4,"oi": { "value": null },"name": "Cilindros"}]}
        }],
          availableArray = [{"id": 2, "oi": { "value": null },"objectType": "gumga.framework.application.Car", "objectId": 1,
          "values": [{"id": 3, "oi": { "value": null }, "value": "180cv", "definition": { "id": 3, "oi": { "value": null }, "name": "Potência"}},
          {"id": 4, "oi": { "value": null }, "value": "6", "definition": { "id": 4, "oi": { "value": null }, "name": "Cilindros" }}],
          "definition": {"id": 2,  "oi": { "value": null},  "name": "Motorização", "attributes": [{"id": 3,"oi": { "value": null}, "name": "Potência"},{"id": 4,"oi": { "value": null },"name": "Cilindros"}]}}]
        ;

  beforeEach(module('gumga.tag.tag'));

  beforeEach(inject(($rootScope, _$compile_, _$httpBackend_, $http) => {
      scope                     = $rootScope.$new();
      $httpBackend              = _$httpBackend_;
      scope.entity              = {};
      scope.entity.tags         = {};
      scope.entity.age          = 9;
      $compile                  = _$compile_;
      scope.searchAvailable     = function($text){ return $http.get('/available') };
      scope.searchSelected      = function(){ return $http.get('/selected') };

      $httpBackend.when('GET', '/available')
        .respond(availableObject)
      $httpBackend.when('GET', '/selected')
        .respond(selectedObject)
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
  describe('Testing incoming rest calls', () => {
    it('Should flush calls', () => {
      $compile(elementWithFunctions)(scope);
      let controller = elementWithFunctions.controller('gumgaTag');
      spyOn(controller,'updateObject');
      $httpBackend.flush();
      expect(controller.updateObject).toHaveBeenCalled();
    })
  })

  describe('Testing updateObject', () => {
    it('Should create an object that will be used to filter available tags', () => {
      $compile(elementWithFunctions)(scope);
      let controller = elementWithFunctions.controller('gumgaTag');
      controller.updateObject(selectedObject);
      expect(controller.filterReference).toEqual({ 'Motorização': 'gumga.framework.application.Car' });
    })
  })
  describe('Testing workflow with incoming data', () => {
    it('Should create an object and update availableArray', () => {
      $compile(elementWithFunctions)(scope);
      let controller = elementWithFunctions.controller('gumgaTag');
      controller.updateObject(selectedObject);
      expect(controller.filterReference).toEqual({ 'Motorização': 'gumga.framework.application.Car' });
      controller.updateAvailable(availableObject);
      expect(controller.availableArray).not.toEqual(availableArray);
    })

    it('Should create an object and update selectedData', () => {
      $compile(elementWithFunctions)(scope);
      let controller = elementWithFunctions.controller('gumgaTag');

      controller.updateObject(selectedObject);
      expect(controller.filterReference).toEqual({ 'Motorização': 'gumga.framework.application.Car' });

      controller.updateSelected(selectedObject);
      expect(controller.selectedArray).toEqual(selectedObject);
    })

  })
})
