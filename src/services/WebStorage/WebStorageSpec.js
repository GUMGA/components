describe('SERVICE: WebStorage', function() {
	var GumgaWebStorage,
	jsonMock = {
		fields: {
			spike: 'Ambiente de Teste',
			id: 'Identificador',
			name: 'Nome',
			attributes: {
				server: 'Apache Server',
				port: '8080',
				machine: {
					name:'Computador do Munif',
					processor: 'i7'

				}
			}
		},
		identifier: 'Juca'
	};
	beforeEach(module('gumga.services.webstorage'));

	beforeEach(
		inject(
			function(_GumgaWebStorage_){
				GumgaWebStorage = _GumgaWebStorage_;
				function getV(value){
					return jsonMock;
				}

				spyOn(sessionStorage,'setItem');
				spyOn(sessionStorage,'getItem').and.callFake(getV);
				spyOn(sessionStorage,'removeItem')
				spyOn(sessionStorage,'clear');

				spyOn(localStorage,'setItem');
				spyOn(localStorage,'getItem').and.callFake(getV);
				spyOn(localStorage,'removeItem')
				spyOn(localStorage,'clear');
			})
		)
	it('Should call sessionStorage.setItem when WebStorage.setSessionStorageItem is called',
		function(){
			var item = {name: 'Igor',surname: 'Santana'};
			GumgaWebStorage.setSessionStorageItem('data',item)
			expect(sessionStorage.setItem).toHaveBeenCalledWith('data',angular.toJson(item));
		}
	)
	it('Should call sessionStorage.getItem when Webstorage.getSessionStorageItem is called',
		function(){
			var aux = GumgaWebStorage.getSessionStorageItem('data');
			expect(aux).toEqual(jsonMock);
			expect(sessionStorage.getItem).toHaveBeenCalledWith('data');

		}
	)
	it('Should call sessionStorage.removeItem when Webstorage.removeSessionStorageItem',
		function(){
			GumgaWebStorage.removeSessionStorageItem('data');
			expect(sessionStorage.removeItem).toHaveBeenCalledWith('data');
		}
	)
	it('Should call sessionStorage.clear when Webstorage.clearSessionStorage',
		function(){
			GumgaWebStorage.clearSessionStorage();
			expect(sessionStorage.clear).toHaveBeenCalled();
		}
	)

	it('Should call localStorage.setItem when WebStorage.setLocalStorageItem is called',
		function(){
			var item = {name: 'Igor',surname: 'Santana'};
			GumgaWebStorage.setLocalStorageItem('data',item)
			expect(localStorage.setItem).toHaveBeenCalledWith('data',angular.toJson(item));
		}
	)
	it('Should call localStorage.getItem when Webstorage.getLocalStorageItem is called',
		function(){
			var aux = GumgaWebStorage.getLocalStorageItem('data');
			expect(aux).toEqual(jsonMock);
			expect(localStorage.getItem).toHaveBeenCalledWith('data');

		}
	)
	it('Should call localStorage.removeItem when Webstorage.removeLocalStorageItem',
		function(){
			GumgaWebStorage.removeLocalStorageItem('data');
			expect(localStorage.removeItem).toHaveBeenCalledWith('data');
		}
	)
	it('Should call localStorage.clear when Webstorage.clearLocalStorage',
		function(){
			GumgaWebStorage.clearLocalStorage();
			expect(localStorage.clear).toHaveBeenCalled();
		}
	)



});
