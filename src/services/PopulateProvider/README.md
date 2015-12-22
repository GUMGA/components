# Service - $populate

### Descrição
O service **$populate** é utilizado para adicionar funções básicas de CRUD, que já fazem a conexão com o Service (*Melhor utilizado com o service [GumgaRest](../Rest)*), possibilitando assim que o $scope fique limpo. É possível também criar uma configuração nova para ser utilizada, extender as já criadas e recuperar o objeto de controle da configuração.

As funções criam um objeto com o nome do ID passado para armazenar os dados. Além disso, o identificador é utilizado para nomear as funções. Caso o Identificador passado seja `User` e a função seja `get`, o nome da função será `userGet`, para evitar colisão de nomes.
Todas as funções possuem eventos que são disparados antes e depois da execução da função, para ajudar o desenvolvedor a extender as funcionalidades das funções sem precisar sobrescrever-las. Para utilizar estes eventos, basta adicionar um listener no $scope, como por exemplo:

```js
$scope.$on('beforeGet',function(){
  console.log('Antes do Get!');
})
$scope.$on('afterGet',function(values){
  // values é retorno da função asíncrona.
})
```

### Uso
Para utilizar o assistente, é necessário injetar como dependência no bloco de configuração do módulo:

```js
angular.module('sample',['gumga.core'])
  .config(function($populateProvider){
    $stateProvider
    .state('crud.list', {
      url: '/list',
      templateUrl: 'app/modules/crud/views/list.html',
      controller: 'CrudController',
      resolve:  {
        populateScope: function(){
          return $populateProvider.populateScope;
        }
      }
    })
  })
```

E depois no controller, utilizar ele executando a função populateScope que foi passada através do resolve:

```js
angular.module('sample')
  .controller('SampleController',
  ['$scope','populateScope','UserService',function($scope,populateScope,UserService){
    populateScope($scope,UserService,'User','base-list');
  }])
```

Pode-se optar também por não incluir no módulo de configuração, mas direto no controller:

```js
angular.module('sample')
  .controller('SampleController',
  ['$scope','$populate','UserService',function($scope,$populate,UserService){
    $populate.populateScope($scope,UserService,'User','base-list');
  }])
```

### Configurações:

- `base-list`: A configuração `base-list` serve para incluir funções gerais que são necessárias em páginas de listagem, que são:
  - `get`
  - `resetAndGet`
  - `getById`
  - `update`
  - `saveQuery`
  - `getQuery`
  - `delete`
  - `sort`
  - `search`
  - `advancedSearch`


- `base-form`: A configuração `base-form` serve para incluir funções gerais que são necessárias em páginas de formulário, que são:
  - `getNew`
  - `getById`
  - `save`
  - `update`
  - `saveImage`
  - `deleteImage`

- `many-to-many`: A configuração `many-to-many` serve para incluir funções que comumente são utilizadas em relações muitos para muitos, que são:
  - `search`
  - `save`
  - `searchAsync`
  - `saveAsync`

- `many-to-one`: A configuração `many-to-one` serve para incluir funções que comumente são utilizadas em relações muitos para um, que são:
  - `search`
  - `save`
  - `saveAsync`

### Métodos
`setConfig(name, value);`

O método setConfig aceita dois parâmetros `name` e `value`, o nome da configuração e o objeto que irá fazer a configuração.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**name** | `String` | Usado para identificar o objeto que será criado.
**value** | `Object` | Configuração que será usada.

Para adicionar a função, coloque o nome da função e o valor dele como `true`

---

`getConfig(name);`

O método getConfig aceita um parâmetro `name`, que é o nome da configuração desejada.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**name** | `String` | Usada para identificar o objeto que será recuperado.

#### Retorno
`Object` Configuração que será recuperada da função.

---
`setMethod(name, config, function);`

O método setMethod aceita três parâmetros: `name`,`config`, `function`. Este método é utilizado para extender as funcionalidades de uma configuração.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**name** | `String` | String que será usada para identificar como será o nome da função a ser adicionada. Para adicionar a função, coloque o nome da função e o valor dele como `true`.
**config** | `String` | String que será usada para identificar qual objeto de configuração esta função será adicionada. Para adicionar a função, coloque o nome da função e o valor dele como `true`.
**function** | `Function` | Função que será adicionada ao $scope. *Ao passar a função, o desenvolvedor tem acesso a 4 parâmetros que serão utilizados para definir a função no scope: `Scope`, `Service`,`Id`*.

---

`populateScope(scope, service, id, config);`

O método populateScope aceita quatro parâmetros: `scope`,`service`, `id` e `config`. Este método é utilizado para popular o $scope do controlador com as funções da configuração.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**name** | `String` | Objeto onde as funções são colocadas, caso sejam num controlador, no *$scope*.
**service** | `Object` | Service que será usado para as ações do controlador.
**id** | `String` | Identificador que será utilizado para armazenar os dados no $scope, além de nomear as funções.
**config** | `String` | String que será utilizada para definir qual configuração será utilizada.
