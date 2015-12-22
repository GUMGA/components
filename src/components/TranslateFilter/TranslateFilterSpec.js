describe('Componente: TranslateFilter', () => {
  let $filter;
  // beforeEach(module('gumga.directives.translate.helper'));
  beforeEach(module('gumga.core'));
  beforeEach(( ) => {
    module(function ($provide) {
      $provide.value('TranslateHelper', {
        returnTranslation(string){
          return 'translated';
        }
      });
    });
  });

  beforeEach(inject((_$filter_, TranslateHelper) => {
    $filter = _$filter_;
  }))

  it('Expect filter to exist', () => {
    expect($filter('gumgaTranslate')).not.toBe(null);
  })

  it('Should break if the value passed is not a string', () => {
    expect(() => {
      $filter('gumgaTranslate')([1, 2], 'mock')
    }).toThrow();
    expect(() => {
      $filter('gumgaTranslate')({a: 'mock'}, 'mock')
    }).toThrow();
  })
  it('Should not break if the value passed is a string', () => {
    expect(() => {
      $filter('gumgaTranslate')('translate', 'mock');
    }).not.toThrow();
  })
})
