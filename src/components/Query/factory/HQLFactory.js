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
    defaultCondition: 'contains',
    conditions: hqlObjectCreator(['eq', 'ne', 'ge', 'le', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="text" ng-model="query.value" class="form-control" required /> `
  }

  SUPPORTED_TYPES['number'] = {
    validator: (number) => (isFinite(number) && number === +number),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: ` <input type="number" ng-model="query.value" class="form-control" required /> `
  }

  SUPPORTED_TYPES['float'] = {
    validator: (number) => (number === +number && number !== (number|0)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: ` <input type="text" ng-model="query.value" class="form-control required "/> `
  }

  SUPPORTED_TYPES['money'] = {
    validator: (number) => (this['float'].validator(number)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: ` <input type="text" ng-model="query.value" class="form-control required "/> `
  }

  SUPPORTED_TYPES['cpf'] = {
    validator: (cpf) => (CPF_REGEX.test(cpf)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="text" ng-model="query.value" gumga-mask="999.999.999.99" class="form-control" required /> `
  }

  SUPPORTED_TYPES['cnpj'] = {
    validator: (cnpj) => (CNPJ_REGEX.test(cnpj)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: `<input type="text" ng-model="query.value" gumga-mask="99.999.999/9999-99" class="form-control" required />`
  }
  // atributo extra: true-label, false-label
  SUPPORTED_TYPES['boolean'] = {
    validator: (boolean) => (boolean === true || boolean === false),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq']),
    template: `<div class="radio"><label><input type="radio" ng-model="query.value" value="true"> <span ng-bind="query.attribute.trueLabel"></span></label></div><div class="radio"><label><input type="radio" ng-model="query.value" value="false"> <span ng-bind="query.attribute.falseLabel"></span></label></div>`
  }

  SUPPORTED_TYPES['date'] = {
    validator: (date) => (DATE_REGEX.test(date)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: `<input type="text" ng-model="query.value" gumga-mask="99/99/9999" class="form-control" required />`
  }

  // atributo extra: query.attribute.value [{label:'', field:''}]
  SUPPORTED_TYPES['select'] = {
    validator: (value) => (!!value),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne']),
    template: `<select ng-model="query.value" ng-options="attribute.label for attribute in query.attribute.value track by attribute.field" class="form-control" required /></select>`
  }
  // atributo extra: attribute.value [{label:'', field:''}]
  SUPPORTED_TYPES['enum'] = {
    validator: (enumList) => (Array.isArray(enumList)),
    defaultCondition: 'in',
    conditions: ['in'],
    template: `<div class="checkbox" ng-init="query.value = []" ng-repeat="attribute in query.attribute.value"><label><input type="checkbox" ng-checked="query.value.indexOf(attribute.field) > -1" ng-click="toggleEnum(attribute.field)"><span ng-bind="attribute.label"></span></label></div>`
  }

  SUPPORTED_TYPES['email'] = {
    validator: (emailAddress) => (this['String'].validator(emailAddress)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="email" ng-model="query.value" class="form-control" required /> `
  }

  SUPPORTED_TYPES['url'] = {
    validator: (url) => (URL_REGEX.test(url)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="url" ng-model="query.value" class="form-control" required /> `
  }

  SUPPORTED_TYPES['ip'] = {
    validator: (ip) => (IP_REGEX.test(ip)),
    defaultCondition: 'eq',
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: ` <input type="text" ng-model="query.value" class="form-control" required /> `
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
    hqlObjects['in']            = { hql: ` in `           , label:  ` em`             , before: ` ( `           , after:  ` ) ` }
    return hqls.map(value => hqlObjects[value])
  }

  return {
      useType: useType,
      hqlObjectCreator: hqlObjectCreator
  };

}

angular.module('gumga.query.factory', [])
  .factory('HQLFactory', HQLFactory);
