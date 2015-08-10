// describe('Gumga.core:directives:formErrors', function() {
//
//   var compile, mockBackend, element, scope, rootScope, isolated;
//   beforeEach(module('gumga.directives.form.max.length'));
//   beforeEach(inject(function($compile, $rootScope) {
//     scope = $rootScope.$new();
//     rootScope = $rootScope;
//     scope.pessoa;
//
//     element = angular.element(
//       '<form name="myForm" gumga-form="form" novalidate>' +
//       '<input type="text" name="nome" ng-model="pessoa.nome" gumga-min-length="0" gumga-max-length="10">' +
//       '<gumga-errors></grumga-errors>' +
//       '</form>'
//     );
//     $compile(element)(scope);
//     scope.$digest();
//     isolated = angular.element(element.find('gumga-errors')).isolateScope();
//     console.log(isolated);
//   }));
//
//     it('should valid input value',function() {
//       form.nome.$setViewValue('Guilhermealksdj');
//       // console.log(element);
//
//     });
//     it('should invalid input value',function() {
//       // form.nome.$setViewValue('Guilherme');
//       // expect(scope.pessoa.nome).toEqual('Guilherme');
//       // expect(form.nome.$valid).toBe(false);
//     });
// });
