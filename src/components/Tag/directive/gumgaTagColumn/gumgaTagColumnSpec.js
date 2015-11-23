'use strict';
describe('Componente: GumgaTagColumn', () => {
  let scope,
      $httpBackend,
      controller;

  beforeEach(module('gumga.tag.tag'));
  beforeEach(module('gumga.tag.column'));
  beforeEach(module('gumga.services.keyboard'));

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

  beforeEach(inject(($compile, $rootScope, _$httpBackend_, $http) => {
    scope = $rootScope.$new();
    scope.entity = {};
    $httpBackend = _$httpBackend_;

    scope.searchAvailable     = function($text){ return $http.get('/available') };
    scope.searchSelected      = function(){ return $http.get('/selected') };

    $httpBackend.when('GET', '/available')
      .respond(availableObject)
    $httpBackend.when('GET', '/selected')
      .respond(selectedObject)

    let template  = `
    <gumga-tag ng-model="entity.data" available-search="searchAvailable($text)" selected-search="searchSelected($text)">
      <gumga-tag-column array=""></gumga-tag-column>
    </gumga-tag>`,
        element   = angular.element(template);

    $compile(element)(scope);
    controller  = element.find('gumga-tag-column').controller('gumgaTagColumn');
    $httpBackend.flush();
  }))


  describe(' ', () => {
    it('  ', () => {

    })
  })

})
