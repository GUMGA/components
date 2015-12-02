'use strict';

TranslateFilter.$inject = ['TranslateHelper'];

function TranslateFilter(TranslateHelper){
  return function translate(value, entity){
    if(value) {
      if(!angular.isString(value)) throw 'É necessário passar uma string para o filtro gumgaTranslate';
      let stringToTranslate = entity ?
          entity.toLowerCase().concat('.').concat(value ? value.toLowerCase() : ' ')
        : (value ? value.toLowerCase() : ' ');
      return TranslateHelper.returnTranslation(stringToTranslate) || value;
    }
    return value;
  };
}

angular.module('gumga.translate.filter.filter', ['gumga.directives.translate.translatehelper'])
  .filter('gumgaTranslate', TranslateFilter);
