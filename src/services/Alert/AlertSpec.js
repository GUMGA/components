describe('PROVIDER: GumgaAlert', function() {
	var scope
	,		controller
	,		Alert;

	beforeEach(module('gumga.services.alert'));

	angular.module('myOtherApp',[]);

	beforeEach(function(){
		inject(function ($rootScope,GumgaAlert) {
			Alert = GumgaAlert;
			scope = $rootScope.$new();
			spyOn(Alert,'_notify');
		})
		angular.module('testApp',[])
		.config(function(GumgaAlertProvider){})
		angular.module('myOtherApp','testApp');
	})
	it('Should call notify with danger and without any options',function(){
		Alert.createDangerMessage('Error','404');
		expect(Alert._notify).toHaveBeenCalledWith('danger','Error','404',{});
	})
	it('Should call notify with danger and with options',function(){
		Alert.createDangerMessage('Error','404',{offset: 30,timer: 500});
		expect(Alert._notify).toHaveBeenCalledWith('danger','Error','404',{offset: 30,timer: 500});
	})

	it('Should call notify with info and without any options',function(){
		Alert.createInfoMessage('Info','You have some pending updates');
		expect(Alert._notify).toHaveBeenCalledWith('info','Info','You have some pending updates',{});
	})

	it('Should call notify with warning and with options',function(){
		Alert.createInfoMessage('Info','You have some pending updates',{offset: 30,timer: 500,delay: 500, alowDismiss: false});
		expect(Alert._notify).toHaveBeenCalledWith('info','Info','You have some pending updates',{offset: 30,timer: 500,delay: 500, alowDismiss: false});
	})

	it('Should call notify with warning and without any options',function(){
		Alert.createWarningMessage('Warning','You have some pending updates');
		expect(Alert._notify).toHaveBeenCalledWith('warn','Warning','You have some pending updates',{});
	})

	it('Should call notify with info and with options',function(){
		Alert.createWarningMessage('Warning','You have some pending updates',{offset: 30,timer: 500,delay: 500, alowDismiss: false});
		expect(Alert._notify).toHaveBeenCalledWith('warn','Warning','You have some pending updates',{offset: 30,timer: 500,delay: 500, alowDismiss: false});
	})

	it('Should call success with warning and without any options',function(){
		Alert.createSuccessMessage('Yes!','It worked!');
		expect(Alert._notify).toHaveBeenCalledWith('success','Yes!','It worked!',{});
	})

	it('Should call success with info and with options',function(){
		Alert.createSuccessMessage('Yes!','It worked!',{offset: 30,timer: 500,delay: 500, alowDismiss: false});
		expect(Alert._notify).toHaveBeenCalledWith('success','Yes!','It worked!',{offset: 30,timer: 500,delay: 500, alowDismiss: false});
	})
});
