describe("DIRECTIVE: GumgaForm",function(){
  let scope, controller;

  beforeEach(module('gumga.directives.form.form1'));

  beforeEach(
    inject(($rootScope,$compile) => {
      scope = $rootScope.$new();
      scope.entity = {};
      let template = `
      <form novalidate gumga-form name="Teste" class="col-md-6 col-md-offset-6">
      <input type="date" ng-model="teste" name="name" gumga-error ng-model="entity.foo" gumga-max-date="1995-09-16" gumga-error/>
      <input type="text" ng-model="teste" name="name1" gumga-error ng-model="entity.foo" gumga-error/>
      <select name="teste" ng-model="foo" required gumga-error></select>
      </form>`

      let elm = angular.element(template);
      $compile(elm)(scope);
      controller = elm.controller('gumgaForm');
      scope.$digest();
    })
  )

  describe('When i call changeInputMessage:', () => {

    it('Should throw an error if the first parameter is undefined', () => {
      let err = 'É necessário passar o nome do input [changeInputMessage(inputName, messages)]';
      expect(x => controller.changeInputMessage(undefined, {})).toThrow(err);
      expect(x => controller.changeInputMessage(null, {})).toThrow(err);
      expect(x => controller.changeInputMessage(0, {})).toThrow(err);
      expect(x => controller.changeInputMessage('', {})).toThrow(err);
      expect(x => controller.changeInputMessage(false, {})).toThrow(err);
    })

    it('Should not throw an error if the first parameter is a valid value', () => {
      let err = 'É necessário passar o nome do input [changeInputMessage(inputName, messages)]';
      expect(x => controller.changeInputMessage('josiclaudo', {})).not.toThrow(err);
      expect(x => controller.changeInputMessage('nome', {})).not.toThrow(err);
    })

    it('Should throw an error if the second parameter attributes doesn\'t exist in the defaultMessages', () => {
      expect(x => controller.changeInputMessage('name', {
        'errKhalifa': 'throwing an young, wild and free error'
      })).toThrow('O tipo de validação errKhalifa não existe.');
      expect(x => controller.changeInputMessage('name', {
        'errKhalifa': 'throwing an young, wild and free error',
        'michaelError': 'Error, are you ok? So, Error are you ok? Are you ok, Error?'
      })).toThrow('Os tipos de validação errKhalifa,michaelError não existem.');
      expect(x => controller.changeInputMessage('name', {
        'errKhalifa': 'throwing an young, wild and free error',
        'michaelError': 'Error, are you ok? So, Error are you ok? Are you ok, Error?',
        'maxlength': 'O texto especificado no campo {0} não deve ultrapassar o limite de: {1}.'
      })).toThrow('Os tipos de validação errKhalifa,michaelError não existem.');
    })

    it('Should change the default messages if the second parameter is valid', () => {
      controller
      .changeInputMessage('name', {
        'maxlength': 'O campo {0} tem um limite máximo de {1} caracteres.',
        'minlength': 'O campo {0} tem um limite mínimo de {1} caracteres.'
      }).changeInputMessage('name1', {
        'maxlength': 'O campo {0} necessita ter no máximo {1} caracteres.',
        'minlength': 'O campo {0} necessita ter no mínimo {1} caracteres.'
      })
      expect(controller.customMessage['name'].maxlength).toEqual('O campo {0} tem um limite máximo de {1} caracteres.');
      expect(controller.customMessage['name'].minlength).toEqual('O campo {0} tem um limite mínimo de {1} caracteres.');
      expect(controller.customMessage['name1'].maxlength).toEqual('O campo {0} necessita ter no máximo {1} caracteres.');
      expect(controller.customMessage['name1'].minlength).toEqual('O campo {0} necessita ter no mínimo {1} caracteres.');
    })
  })

  describe('When i call getDefaultMessages', () => {
    it('Should return a new object that contains the same values', () => {
      const value = {
        maxdate: 'A data especificada no campo {0} não deve ultrapassar o limite de: {1}.',
        maxlength: 'O texto especificado no campo {0} não deve ultrapassar o limite de: {1}.',
        maxnumber: 'O número especificado no campo {0} não deve ultrapassar o limite de: {1}.',
        mindate: 'A data especificada no campo {0} não deve ser menor que o limite mínimo de: {1}.',
        minlength: 'O texto especificado no campo {0} não deve ser menor que o limite mínimo de: {1}.',
        minnumber: 'O número especificado no campo {0} não deve ser menor que o limite mínimo de: {1}.',
        pattern: 'O texto especificado no campo {0} deve estar dentro do padrão: {1}.',
        rangedate:'A data especificada no campo {0} deve estar dentro do intervalo: {1}.',
        rangenumber: 'O número especificado no campo {0} deve estar dentro do intervalo: {1}.',
        validatetype: 'O valor digitado no campo {0} deve ser do tipo: {1}',
        required: 'O campo {0} é obrigatório.'
      };
      let newValue = controller.getDefaultMessages();
      expect(value).toEqual(newValue)
    })
  })

  describe('When i call changeStateOfInput', () => {
    it('Should throw errors if the entries are incorrect', () => {
      let err1  = 'É necessário passar um valor válido como primeiro parâmetro [changeStateOfInput(inputName, validationType, inputIsValid, value)]',
          err2  = 'É necessário passar um valor válido como segundo parâmetro [changeStateOfInput(inputName, validationType, inputIsValid, value)]',
          err3  = 'É necessário passar um booleano como terceiro parâmetro [changeStateOfInput(inputName, validationType, inputIsValid, value)]';

      expect(x => controller.changeStateOfInput(undefined,'maxdate',true, 10)).toThrow(err1);
      expect(x => controller.changeStateOfInput('name',undefined,true, 10)).toThrow(err2);
      expect(x => controller.changeStateOfInput('name','maxdate',undefined, 10)).toThrow(err3);

    })

    it('Should emit the events right', () => {
      spyOn(scope, '$emit');
      controller.changeStateOfInput('name','maxlength',true, 10);
      expect(scope.$emit).toHaveBeenCalledWith('name-valid', {validationType: 'maxlength'});
      controller.changeStateOfInput('name','maxlength', false, 10);
      expect(scope.$emit).toHaveBeenCalledWith('name-invalid', {
        validationType: 'maxlength',
        message: 'O texto especificado no campo name não deve ultrapassar o limite de: 10.'
      });
      controller.changeStateOfInput('name1','required', false, 10);
      expect(scope.$emit).toHaveBeenCalledWith('name1-invalid', {
        validationType: 'required',
        message: 'O campo name1 é obrigatório.'
      });
    })
  })
})
