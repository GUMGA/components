'use strict';

GenericFilter.$inject = ['$filter'];

function GenericFilter($filter){
  return function (value, type){
    if(value == 'valor') return value
    if(type == 'date'){
      let date = value.split('')
      date.splice(2, 0, '/')
      date.splice(5, 0, '/')
      return date.join('')
    }
    if(type == 'cpf'){
      let cpf = value.split('')
      cpf.splice(3, 0, '.')
      cpf.splice(7, 0, '.')
      cpf.splice(11, 0, '-')
      return cpf.join('')
    }
    if(type == 'cnpj'){
      let cnpj = value.split('')
      cnpj.splice(2, 0, '.')
      cnpj.splice(6, 0, '.')
      cnpj.splice(10, 0, '/')
      cnpj.splice(15, 0, '-')
      return cnpj.join('')
    }

    return value
  }
}

angular.module('gumga.genericfilter', [])
  .filter('gumgaGenericFilter', GenericFilter);
