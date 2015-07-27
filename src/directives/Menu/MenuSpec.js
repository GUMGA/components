describe('DIRECTIVES: Menu',function(){
	var scope
	,		isolatedScope
	,		requestMenu
	,		requestKeys
	,		$httpBackend;

	beforeEach(module('gumga.directives.menu'));

	beforeEach(inject(
		function($rootScope,$compile,_$httpBackend_){
			scope = $rootScope.$new();
			scope.menuObject = {};
			$httpBackend = _$httpBackend_;
			requestMenu = 
				$httpBackend.when('GET','http://www.gumga.com.br/menu')
					.respond([
				    {
				        "label": "coisa",
				        "URL": "coisa.list",
				        "key": "CRUD-BASE",
				        "filhos": [
				            {
				            "label": "coisa 1",
				            "URL": "coisa.list",
				            "key": "CRUD-BASE",
				            "filhos": []
				            },
				            {
				            "label": "coisa 1.1",
				            "URL": "coisa.list",
				            "key": "CRUD-BASE",
				            "filhos": [
				                    {
				                        "label": "coisa 1.1.1",
				                        "URL": "coisa.list",
				                        "key": "CRUD-BASE",
				                        "filhos": []
				                    },
				                    {
				                        "label": "coisa 1.1.2",
				                        "URL": "coisa.list",
				                        "key": "CRUD-BASE",
				                        "filhos": []
				                    }
				                ]
				            }
				            ]
				    }
				])
			requestKeys = 
				$httpBackend.when('GET','http://www.gumga.com.br/keys')
					.respond(["CRUD-BASE"])


				var element = angular.element(
					'<gumga-menu menu-url="http://www.gumga.com.br/menu" keys-url="http://www.gumga.com.br/keys"></gumga-menu>'
				);
				$compile(element)(scope);
				isolatedScope = element.isolateScope();
		}	
	))

	it('Should get all needed menu',function(){
		$httpBackend.expectGET('http://www.gumga.com.br/menu');
		$httpBackend.flush();
		expect(isolatedScope.dados).toEqual([
				    {
				        "label": "coisa",
				        "URL": "coisa.list",
				        "key": "CRUD-BASE",
				        "filhos": [
				            {
				            "label": "coisa 1",
				            "URL": "coisa.list",
				            "key": "CRUD-BASE",
				            "filhos": []
				            },
				            {
				            "label": "coisa 1.1",
				            "URL": "coisa.list",
				            "key": "CRUD-BASE",
				            "filhos": [
				                    {
				                        "label": "coisa 1.1.1",
				                        "URL": "coisa.list",
				                        "key": "CRUD-BASE",
				                        "filhos": []
				                    },
				                    {
				                        "label": "coisa 1.1.2",
				                        "URL": "coisa.list",
				                        "key": "CRUD-BASE",
				                        "filhos": []
				                    }
				                ]
				            }
				            ]
				    }
				]);
	})
	it('Should get all needed keys',function(){
		$httpBackend.expectGET('http://www.gumga.com.br/keys');
		$httpBackend.flush();
		expect(isolatedScope.keys).toEqual(["CRUD-BASE"]);
	})

})