'use strict';

HQLFactory.$inject = [];

function HQLFactory(){
  /*
    Regex de URL foi retirada do código-fonte do AngularJS, utilizado por eles para validar input[type="url"].
    LINK: https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L26
   */
  const CPF_REGEX   = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}'/,
        CNPJ_REGEX  = /[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}'/,
        DATE_REGEX  = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}'/,
        URL_REGEX   = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
        IP_REGEX    = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}'/

  let SUPPORTED_TYPES = {}

  SUPPORTED_TYPES['string'] = {
    validator: (string) => (typeof string === 'string' || string instanceof String),
    conditions: hqlObjectCreator(['eq', 'ne', 'ge', 'le', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['number'] = {
    validator: (number) => (isFinite(number) && number === +number),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['float'] = {
    validator: (number) => (number === +number && number !== (number|0)),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['money'] = {
    validator: (number) => (this['float'].validator(number)),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['cpf'] = {
    validator: (cpf) => (CPF_REGEX.test(cpf)),
    conditions: hqlObjectCreator(['eq', 'ne', 'ge', 'le', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['cnpj'] = {
    validator: (cnpj) => (CNPJ_REGEX.test(cnpj)),
    conditions: hqlObjectCreator(['eq', 'ne', 'ge', 'le', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['boolean'] = {
    validator: (boolean) => (boolean === true || boolean === false),
    conditions: hqlObjectCreator(['eq']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['date'] = {
    validator: (date) => (DATE_REGEX.test(date)),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['select'] = {
    validator: (value) => (!!value),
    conditions: hqlObjectCreator(['eq', 'ne']),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['enum'] = {
    validator: (enumList) => (Array.isArray(enumList)),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['email'] = {
    validator: (emailAddress) => (this['String'].validator(emailAddress)),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['url'] = {
    validator: (url) => (URL_REGEX.test(url)),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }

  SUPPORTED_TYPES['ip'] = {
    validator: (ip) => (IP_REGEX.test(ip)),
    template: ` <input type="text" ng-model="$value" required class="form-control input-sm"/> `
  }
  
  function useType(type) {
      return SUPPORTED_TYPES[type] || null;
  }

  function hqlObjectCreator(hqls = [], hqlObjects = {}){
    hqlObjects['contains']      = { hql: ` contains `     , label:  ` contém `        , before: ` like '% `     , after:  ` %' ` }
    hqlObjects['not_contains']  = { hql: ` not_contains ` , label:  ` não contém `    , before: ` not like '% ` , after:  ` %' ` }
    hqlObjects['starts_with']   = { hql: ` starts_with `  , label:  ` começa com `    , before: ` like ' `      , after:  `%'` }
    hqlObjects['ends_with']     = { hql: ` ends_with `    , label:  ` termina com `   , before: ` like '%`      , after:  `'` }
    hqlObjects['eq']            = { hql: ` eq `           , label:  ` igual `         , before: ` =' `          , after:  `'` }
    hqlObjects['ne']            = { hql: ` ne `           , label:  ` diferente de `  , before: ` !=' `         , after:  `'` }
    hqlObjects['ge']            = { hql: ` ge `           , label:  ` maior igual `   , before: ` >=' `         , after:  `'` }
    hqlObjects['gt']            = { hql: ` gt `           , label:  ` maior que `     , before: ` > '`          , after:  `'` }
    hqlObjects['le']            = { hql: ` le `           , label:  ` menor igual `   , before: ` <=' `         , after:  ` ' ` }
    hqlObjects['lt']            = { hql: ` lt `           , label:  ` menor que `     , before: ` < '`          , after:  ` ' ` }
    return hqls.map(value => hqlObjects[value])
  }

  return {
      useType: useType,
      hqlObjectCreator: hqlObjectCreator
  };

}

angular.module('gumga.query.factory', [])
  .factory('HQLFactory', HQLFactory);
