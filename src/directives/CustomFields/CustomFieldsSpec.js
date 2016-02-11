// describe('DIRECTIVE: GumgaCustomFields',function(){
//   let scope;
//   let isolatedScope;
//   let template;
//   let rootScope;
//   beforeEach(module('gumga.directives.customfields'));
//   beforeEach(inject(($rootScope,$compile) => {
//     rootScope = $rootScope;
//     scope = $rootScope.$new();
//
//     scope.custom = {
//   		"id":null,
//   		"oi":null,
//   		"gumgaCustomFields":{
//   			"opcoes":{
//   				"id":null,
//   				"oi":null,
//   				"field":{
//   					"id":1,
//   					"oi":null,
//   					"clazz":"br.com.empresa.piloto.domain.model.Marca",
//   					"name":"opcoes",
//   					"description":"Custom Select Field for test",
//   					"active":true,
//   					"type":"SELECTION",
//   					"validationDescription":"Not empty"
//   					,"validationScript":"true",
//   					"defaultValueScript": "",
//   					"options": {
//   						"pageSize": 10,
//   						"count": 26,
//   						"start": 0,
//   						"values": [
//   							{
//   								"id": 1,
//   								"oi": null,
//   								"name": "GUMGA",
//   								"subOrganizations": null,
//   								"mainOrganization":
//   								{
//   									"value": true
//   								},
//   								"hierarchyCode": "1.",
//   								"logo": null
//   							},
//   							{
//   								"id": 2,
//   								"oi": null,
//   								"name": "FrontEnd",
//   								"subOrganizations": null,
//   								"mainOrganization":
//   								{
//   									"value": false
//   								},
//   								"hierarchyCode": "1.2.",
//   								"logo": null
//   							}
//   						]
//   					},
//   					"visualizationOrder":2,
//   					"fieldGroup":"MAIN_FIELDS",
//   					"translateKey":"marca.tamanho",
//   					"optionValueField": "id",
//   					"optionLabelField": "name",
//   					"optionsCollection": "values"
//   				},
//   				"gumgaModelId":null,
//   				"textValue":null,
//   				"numberValue":6.5,
//   				"dateValue":null,
//   				"logicValue":null
//   			},
//   			"tamanho":{
//   				"id":null,
//   				"oi":null,
//   				"field":{
//   					"id":2,
//   					"oi":null,
//   					"clazz":"br.com.empresa.piloto.domain.model.Marca",
//   					"name":"tamanho",
//   					"description":"Custom Number Field for test","active":true,
//   					"type":"NUMBER",
//   					"validationDescription":"Not empty"
//   					,"validationScript":"true",
//   					"defaultValueScript":"13 / 2",
//   					"options":"",
//   					"visualizationOrder":2,
//   					"fieldGroup":"MAIN_FIELDS",
//   					"translateKey":"marca.tamanho"
//   				},
//   				"gumgaModelId":null,
//   				"textValue":null,
//   				"numberValue":6.5,
//   				"dateValue":null,
//   				"logicValue":null
//   			},
//   			"inicio":{
//   				"id":null,
//   				"oi":null,
//   				"field":{
//   					"id":4,
//   					"oi":null,
//   					"clazz":"br.com.empresa.piloto.domain.model.Marca",
//   					"name":"inicio",
//   					"description":"Custom Date Field for test","active":true,
//   					"type":"DATE",
//   					"validationDescription":"Not empty",
//   					"validationScript":"true",
//   					"defaultValueScript":"new Date()",
//   					"options":"",
//   					"visualizationOrder":0.0,
//   					"fieldGroup":"MAIN_FIELDS",
//   					"translateKey":"marca.inicio"
//   				},
//   				"gumgaModelId":null,
//   				"textValue":null,
//   				"numberValue":null,
//   				"dateValue":"2015-11-03T11:26:13Z",
//   				"logicValue":null
//   			},
//   		},
//   		"version":null,
//   		"nome":null,
//   		"location":null
//   	};
//
//     let element = angular.element('<gumga-custom-fields fields="custom"></gumga-custom-fields>');
//     $compile(element)(scope);
//     isolatedScope = element.isolateScope();
//   }));
//
//
//   it('Should check the type SELECTION', () => {
//     // expect(isolatedScope.ctrl.fields.gumgaCustomFields.opcoes.field.options.values.length).toEqual(2);
//   });
//
//   it('Should check the type NUMBER', () => {
//   });
//
//   it('Should check the type DATE', () => {
//   });
// })
