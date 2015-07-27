describe('DIRECTIVE: FormButtons',function(){
	var scope
	,		isolatedScope
	,		formCtrl
	,		$modal
	,		modalInstance = {
		result: {
			then: function(confirmCallback, cancelCallback){
				this.confirmCallback = confirmCallback;
				this.cancelCallback = cancelCallback;
			}
		},
		close: function(item){
			this.result.confirmCallback(item);
		},
		dismiss: function(type){
			this.result.cancelCallback(type);
		}
	};
	beforeEach(module('gumga.directives.formbuttons'));

	beforeEach(inject(
		function($rootScope,$compile,_$modal_){
			scope = $rootScope.$new();
			$modal = _$modal_;
			scope.submitForm = angular.noop;
			var element = angular.element(
				'<form novalidate name="TestForm">'+
				'<gumga-form-buttons submit="submitForm" valid="TestForm.$valid" confirm-dirty> </gumga-form-buttons>'+
				'</form>'
				);
			$compile(element)(scope);
			formCtrl = element.find('gumga-form-buttons').scope().TestForm;
			isolatedScope = element.find('scope').scope();
		}))

	it('should initialize some variables right',function(){
		expect(isolatedScope.confirmDirty).toBeTruthy();
		expect(scope.inNew).toBeFalsy();
	})

	it('Should return the class that will tell the position of the component',function(){
		expect(isolatedScope.getPosition()).toEqual('pull-right');
	})

	it('Should work properly when confirm-dirty is on the tag',function(){
		spyOn($modal,'open');
		formCtrl.$dirty = true;

	})
})