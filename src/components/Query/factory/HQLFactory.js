'use strict';

HQLFactory.$inject = ['$filter'];

function HQLFactory($filter){
  /*
    Regex de URL foi retirada do código-fonte do AngularJS, utilizado por eles para validar input[type="url"].
    LINK: https://github.com/angular/angular.js/blob/master/src/ng/directive/input.js#L26
   */
  const CPF_REGEX       = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/,
        CNPJ_REGEX      = /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/,
        DATE_REGEX      = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/,
        URL_REGEX       = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:/?#]+|\[[a-f\d:]+\])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
        IP_REGEX        = /(?:[0-9]{1,3}\.){3}[0-9]{1,3}/,
        NUMBER_REGEX    = /^[0-9]+$/,
        FLOAT_REGEX     = /^[0-9]+(\.[0-9]{1,2})?$/

  let SUPPORTED_TYPES = {}

  SUPPORTED_TYPES['string'] = {
    validator: (string) => (typeof string === 'string' || string instanceof String),
    defaultCondition: hqlObjectCreator(['contains']),
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: `<div class="input-group">
                  <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" class="form-control" required autofocus style=" width: 150px;height: 40px;" />
                  <div class="input-group-addon">
                      <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                      <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                  </div>
                  <div class="input-group-addon">
                      <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                  </div>
              </div>`
  }

  SUPPORTED_TYPES['number'] = {
    validator: (str) => (NUMBER_REGEX.test(str)),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: `<div class="input-group">
                    <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" ng-pattern="${NUMBER_REGEX}" class="form-control" required style=" width: 150px;height: 40px;" />
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')"  class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['float'] = {
    validator: (number) => (FLOAT_REGEX.test(number)),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: `<div class="input-group">
                    <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" ng-pattern="${FLOAT_REGEX}" class="form-control" required style=" width: 150px;height: 40px;"/>
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['money'] = {
    validator: (number) => (FLOAT_REGEX.test(number)),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: `<div class="input-group">
                    <input ng-keyup="goSearch($event)" type="text" ng-model="$value.query.value" gumga-mask="R$ " ng-pattern="${FLOAT_REGEX}" class="form-control" required style=" width: 150px;height: 40px;" />
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['cpf'] = {
    validator: (cpf) => (CPF_REGEX.test(utils.toCpf(cpf))),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: `<div class="input-group">
                    <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" gumga-mask="999.999.999.99" class="form-control" required style=" width: 150px;height: 40px;" />
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['cnpj'] = {
    validator: (cnpj) => (CNPJ_REGEX.test(cnpj)),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: `<div class="input-group">
                    <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" gumga-mask="99.999.999/9999-99" class="form-control" required style=" width: 150px;height: 40px;" />
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['boolean'] = {
    validator: (boolean) => (boolean == 'true' || boolean == 'false'),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq']),
    template: ` <div class="radio"><label><input  type="radio" ng-model="$value.query.value" value="true"> {{$value.query.attribute.extraProperties.trueLabel}}</label></div><div class="radio"><label><input type="radio" ng-model="$value.query.value" value="false"> {{$value.query.attribute.extraProperties.falseLabel}} </label></div>`
  }

  SUPPORTED_TYPES['date'] = {
    validator: (date) => (DATE_REGEX.test($filter('date')(date, 'dd/MM/yyyy'))),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'gt', 'ge', 'lt', 'le']),
    template: `<div class="input-group">
                    <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" gumga-mask="99/99/9999" class="form-control" required  style=" width: 150px;height: 40px;"/>
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['select'] = {
    validator: (value) => (!!value),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne']),
    template: `<select ng-model="$value.query.value" ng-options="d.field as d.label for d in $value.query.attribute.extraProperties.data track by d.field" class="form-control" required /></select>`
  }

  SUPPORTED_TYPES['enum'] = {
    validator: (enumList) => (Array.isArray(enumList)),
    defaultCondition: hqlObjectCreator(['in']),
    conditions: hqlObjectCreator(['eq']),
    template: `<div class="col-md-4" ng-class="{'row': $index % 3 == 0}" ng-repeat="d in $value.query.attribute.extraProperties.data"><label><input type="checkbox" ng-checked="$value.query.value.indexOf(d.field) > -1" ng-click="toggleEnum($event, $key, d.field)"></label> {{d.label}}</div>`
  }

  SUPPORTED_TYPES['email'] = {
    validator: (emailAddress) => (typeof emailAddress === 'string' || emailAddress instanceof String),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: `<div class="input-group">
                    <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" class="form-control" required  style=" width: 150px;height: 40px;" />
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['url'] = {
    validator: (url) => (URL_REGEX.test(url)),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: `<div class="input-group">
                    <input type="url" ng-keyup="goSearch($event)" ng-model="$value.query.value" class="form-control" required  style=" width: 150px;height: 40px;" />
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  SUPPORTED_TYPES['ip'] = {
    validator: (ip) => (IP_REGEX.test(ip)),
    defaultCondition: hqlObjectCreator(['eq']),
    conditions: hqlObjectCreator(['eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with']),
    template: `<div class="input-group">
                    <input type="text" ng-keyup="goSearch($event)" ng-model="$value.query.value" class="form-control" required style=" width: 150px;height: 40px;" />
                    <div class="input-group-addon">
                        <i ng-show="validator($value.query.value) && $value.query.value.length > 0" class="glyphicon glyphicon-ok" style="color:green"></i></span>
                        <i ng-show="!validator($value.query.value) || !$value.query.value" class="glyphicon glyphicon-remove" style="color:red"></i>
                    </div>
                    <div class="input-group-addon">
                        <button ng-click="callSearch($event, 'btn')" class="btn btn-default">buscar</button>
                    </div>
              </div>`
  }

  function useType(type) {
    return SUPPORTED_TYPES[type] || null;
  }

  function hqlObjectCreator(hqls = [], hqlObjects = {}){
    hqlObjects['contains']      = { hql: ` contains `     , label:  ` contém `        , before: ` like '%`     , after:  `%' ` }
    hqlObjects['not_contains']  = { hql: ` not_contains ` , label:  ` não contém `    , before: ` not like '%` , after:  `%' ` }
    hqlObjects['starts_with']   = { hql: ` starts_with `  , label:  ` começa com `    , before: ` like '`      , after:  `%'` }
    hqlObjects['ends_with']     = { hql: ` ends_with `    , label:  ` termina com `   , before: ` like '%`      , after:  `'` }
    hqlObjects['eq']            = { hql: ` eq `           , label:  ` igual `         , before: ` ='`          , after:  `'` }
    hqlObjects['ne']            = { hql: ` ne `           , label:  ` diferente de `  , before: ` !='`         , after:  `'` }
    hqlObjects['ge']            = { hql: ` ge `           , label:  ` maior igual `   , before: ` >='`         , after:  `'` }
    hqlObjects['gt']            = { hql: ` gt `           , label:  ` maior que `     , before: ` > '`          , after:  `'` }
    hqlObjects['le']            = { hql: ` le `           , label:  ` menor igual `   , before: ` <='`         , after:  `' ` }
    hqlObjects['lt']            = { hql: ` lt `           , label:  ` menor que `     , before: ` < '`          , after:  `' ` }
    hqlObjects['in']            = { hql: ` in `           , label:  ` em`             , before: ` (`           , after:  `) ` }
    return hqls.map(value => hqlObjects[value])
  }


  function createHql(mapObj = {}){
    let aqo = []
    let aq =
      Object
        .keys(mapObj)
        .filter(value => mapObj[value].active && mapObj[value].query.value)
        .map(val => {
          let attribute = 'obj.'.concat(mapObj[val].query.attribute ? mapObj[val].query.attribute.field : '*'),
              before    = mapObj[val].query.condition ? mapObj[val].query.condition.before : '*',
              value     = mapObj[val].query.value.replace(/'/g,"''"),
              after     = mapObj[val].query.condition ? mapObj[val].query.condition.after : '*';

            aqo.push({
            attribute:  mapObj[val].query.attribute,
            condition:  mapObj[val].query.condition,
            value:      mapObj[val].query.value.replace(/'/g,"''")
          })


        return (attribute.concat(before).concat(value).concat(after)).replace(/obj.\*/g,'').replace(/\*/g,'')
      }).join(' ')

    if(aq.slice(-2) === 'ND' || aq.slice(-2) === 'OR'){
      aqo.pop()
      return { hql: aq.slice(0, -3), source: JSON.stringify(aqo)  }
    }
    return { hql: aq, source: JSON.stringify(aqo) }
  }

  let utils = {}

  utils.toCpf = (input) =>  {
    let str = input+ '';
    return str.replace(/\D/g,'').replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d)/,"$1.$2").replace(/(\d{3})(\d{1,2})$/,"$1-$2");
  };

  function validator(type = ' '){
    return SUPPORTED_TYPES[type] ? SUPPORTED_TYPES[type].validator : angular.noop
  }

  return { useType , hqlObjectCreator, createHql, validator };

}

angular.module('gumga.query.factory', [])
  .factory('HQLFactory', HQLFactory);
