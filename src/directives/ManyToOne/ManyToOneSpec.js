// describe('Gumga.core:directives:ManyToOne', function () {
//     var scope;
//     var isolated;
//     var rootScope;
//     beforeEach(module('gumga.directives.manytoone'));
//     var $modal;
//     var modalInstance = {
//         result: {
//             then: function(confirmCallback, cancelCallback){
//                 this.confirmCallback = confirmCallback;
//                 this.cancelCallback = cancelCallback;
//             }
//         },
//         close: function(item){
//             this.result.confirmCallback(item);
//         },
//         dismiss: function(type){
//             this.result.cancelCallback(type);
//         }
//     },
//     controller;

//     beforeEach(inject(function ($rootScope, $compile,_$modal_,$controller,$q) {
//         scope = $rootScope.$new();
//         rootScope = $rootScope;
//         scope.pessoa;
//         var q = $q;
//         $modal = _$modal_;
//         scope.pessoas = [{nome: "Maria",idade: 10,filhos: []},{nome: "Juca",idade: 30,filhos: []},{nome: "Roberto",idade: 20,filhos: []}];
//         scope.search = function(param){
//             return scope.pessoas.filter(function(elm){
//                 return elm.nome.toLowerCase().search(param.toLowerCase());
//             })
//         };
//         scope.post = function(value){
//             var q = $q.defer();
//             q.resolve(function(){return 'oi'});
//             var a = q.promise
//             a.success(function(data){
//                  g(data);
//             })
//             return a;
//         };

//         var element = angular.element('<form><gumga-many-to-one value="pessoa" async="true" field="nome" search-method="search(param)" add-method="$parent.post(value)"></gumga-many-to-one></form>');
//         $compile(element)(scope);
//         isolated = element.find('gumga-many-to-one').isolateScope();
//         spyOn($modal, 'open').and.returnValue(modalInstance);
//     }));
//     describe('Validations of Form',function(){
//         it('Should set the form invalid if model is a string',function(){
//             isolated.model = 'Igor';
//             scope.$digest();
//             expect(isolated.formCtrl.$valid).toBeFalsy();
//         });

//         it('Should set the form valid if model is a object',function(){
//             isolated.model = {nome: 'Igor',idade: 19};
//             scope.$digest();
//             expect(isolated.formCtrl.$valid).toBeTruthy();
//         });
//     });
//     it('It should call postMethod when i call addNew',function(){
//         spyOn(isolated,'postMethod');
//         spyOn(scope,'post');
//         isolated.addNew('Freeza');
//         expect(isolated.postMethod).toHaveBeenCalledWith({value: 'Freeza'});
//         expect(scope.post).toHaveBeenCalledWith({value:'Freeza'});
//     });

//     it('It should open a modal when i call halp',function(){
//         isolated.halp({nome: "Maria",idade: 10,filhos: []});
//         expect($modal.open).toHaveBeenCalled();
//     })

// })