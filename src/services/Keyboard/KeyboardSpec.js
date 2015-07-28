describe('SERVICE: Keyboard', function() {
	var Keyboard;

	beforeEach(module('gumga.services.keyboard'));

	beforeEach(inject(
		function (GumgaKeyboard) {
			Keyboard = GumgaKeyboard;
			spyOn(Mousetrap,'bind');
			spyOn(Mousetrap,'unbind');
			spyOn(Mousetrap,'trigger');
		}
		))

	describe('function addBind',function(){
		it('Should throw an error if key is not passed',function(){
			expect(function(){
				Keyboard.addBind(undefined,function(){});
			}).toThrow();
			expect(Mousetrap.bind).not.toHaveBeenCalled();
		})

		it('Should call bind if the parameters are right',function(){
			function Base(){}
			Keyboard.addBind('ctrl+g',Base);
			expect(Mousetrap.bind).toHaveBeenCalledWith('ctrl+g',Base,'');
		})
	})

	it('Should call unbind when removeBind is called',function(){
		Keyboard.removeBind('data');
		expect(Mousetrap.unbind).toHaveBeenCalledWith('data');
	})

	it('Should call trigger when triggerBoundedEvent is called',function(){
		Keyboard.triggerBoundedEvent('data');
		expect(Mousetrap.trigger).toHaveBeenCalledWith('data');
	})

	describe('function bindToElement',function(){
		it('Should throw an error if element is not passed',function(){
			expect(function(){
				Keyboard.bindToElement(undefined,function(){});
			}).toThrow();
			expect(Mousetrap.bind).not.toHaveBeenCalled();
		})
		it('Should throw an error if key is not passed',function(){
			expect(function(){
				Keyboard.bindToElement(new Object(),'ctrl',function(){});
			}).toThrow();
			expect(Mousetrap.bind).not.toHaveBeenCalled();
		})
		it('Should call bind if the parameters are right',function(){
			function Base(){}
			Keyboard.addBind('ctrl+g',Base);
			expect(Mousetrap.bind).toHaveBeenCalledWith('ctrl+g',Base,'');
		})
	})

});