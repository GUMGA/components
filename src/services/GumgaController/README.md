# GumgaController

O componente **GumgaController** foi desenvolvido como um substituto ao componente $populate. Sentimos que os desenvolvedores, ao utilizar o $populate, não entenderam muito bem o porquê do componente(talvez por causa do nome, também). Demos um passo atrás e chegamos neste componente que faz o que o $populate faz, porém funcionando também fora do $scope do controller, podendo ser colocado dentro de qualquer objeto.

Este componente pode ser utilizado para criar os métodos que fazem conexão com o service GumgaREST, que podem ser utilizados para fazer a comunicação com o BackEnd, respeitando o modelo MVC do Angular. Além disse, ele tem suporte a eventos próprios, não necessitando do *$scope*.

## Métodos

### createRestMethods(container, service, config/id)

A função createRestMethods é a função responsável pelo comportamento de criar os métodos do controlador. Ela cria um objeto que serve para agrupar os comportamentos. O objeto tem o seguinte formato:
```js
  {
    data: (Object|Array),
    methods: Object,
    pageSize: Number,
    count: Number
}
```

- **data:** Atributo que irá conter o valor resultante das chamadas $http feitas no GumgaRest. Este atributo pode ser tanto um Array, para quando houver mais de um resultado, quanto um objeto, quando o $http retornar apenas um objeto( como no caso do *getId* e *getNew*.)
- **methods:** Atributo que irá conter os métodos que serão criados pelo `createRestMethods`. Estes métodos podem ser encadeados e não retornam promises.
- **pageSize:** Este atributo apenas existe em métodos que retornam um Array do servidor. Contém o número de itens que será retornado de cada vez.
- **count:** Número de itens que estão disponíveis no servidor.

#### methods

No antigo componente $populate, sentimos que era trabalhoso para o desenvolvedor para escolher os métodos que seriam incluído e, como não faz muita diferença para o desenvolvedor, nesta versão decidimos incluir todos os métodos possíveis que fazem conexão com o GumgaRest. **Todas as funções emitem três eventos: `start`, `success` ou `error`**. Além disso, os métodos podem ser encadeados. Os métodos são os seguintes:

- **`get(page)`:** Função responsável para fazer o get(valor default: 1). Aceita a página que irá buscar como parâmetro. Retorna um array para o atributo `data` e popula os atributos `pageSize` e `count`.

- **`getId(id)`:** Função responsável para fazer o get de um registro específico(valor default: 0). Retorna um objeto e exclui os atributos `pageSize` e `count`.

- **`getNew()`:** Função responsável para fazer o get de um novo registro. Retorna um objeto e exclui os atributos `pageSize` e `count`.

- **`put(value)`:** Função responsável por fazer o put de um registro. O resultado da chamada é obtido apenas pelo evento `putSuccess` ou `putError`.

- **`post(value)`:** Função responsável por fazer o post de um novo registro. O resultado da chamada é obtido apenas pelo evento `postSuccess` ou `postError`.

- **`delete(values)`:** Função responsável por fazer um delete de uma lista de registros. O resultado da chamada é obtido apenas pelo evento `deleteSuccess` ou `deleteError`.

- **`sort(field, way):`** Função responsável por fazer a ordenação dos valores no servidor. Retorna um array para o atributo `data` e popula os atributos `pageSize` e `count`.

- **`search(field, param):`** Função responsável por fazer a busca dos valores no servidor. Retorna um array para o atributo `data` e popula os atributos `pageSize` e `count`.

- **`advancedSearch(param):`** Função responsável por fazer a ordenação dos valores no servidor. Retorna um array para o atributo `data` e popula os atributos `pageSize` e `count`.

- **`postQuery(query, name)`:** Função responsável por fazer um post para salvar a query do busca avançada. O resultado da chamada é obtido apenas pelo evento `postQuerySuccess` ou `postQueryError`.

- **`getQuery(query)`:** Função responsável por retornar o get de um chamada para o servidor. Esta função retorna uma promise HTTP e, quando for resolvida, emite os eventos 'getQuerySuccess' e `getQueryError`.

- **`postImage(attribute, model)`:** Função responsável por retornar o post de um chamada para o servidor. Esta função retorna uma promise HTTP e, quando for resolvida, faz o post para salvar uma imagem.

- **`deleteImage(attribute, model)`:** Função responsável por fazer um delete para deletar alguma imagem de uma entidade. O resultado da chamada é obtido apenas pelo evento `deleteImageSuccess` ou `deleteImageError`.

- **`reset()`:** Função responsável por resetar os parâmetros para o seu valor inicial. Ela emite apenas um evento, `resetStart`.

- **`getAvailableTags()`:** Função responsável por buscar as tags disponíveis para o registro. Ela emite apenas um evento, `getAvailableTagsStart`

- **`getSelectedTags()`:** Função responsável por buscar as tags que estão selecionadas para o registro. Ela emite apenas um evento, `getSelectedTagsStart`.

- **`postTag()`:** Função responsável por salvar as tags que foram selecionadas na entidade. O resultado da chamada é obtido apenas pelo evento `postTagSuccess` ou `postTagError`.


### Exemplos

```js
  define([], function(){

  SampleController.$inject = ['$scope','SampleService','gumgaController'];

  function SampleController($scope, SampleService, gumgaController){
    gumgaController.createRestMethods($scope,SampleService,'sample')
    // O objeto pode ser retornado caso queira
    // var user = gumgaController.createRestMethods({}, SampleService, {
    // noScope: true,
    // identifier: 'Sample'
    // })

    $scope
      .sample
      .methods.get(0)
      .on('getSuccess',function(data){
        // ...
      })
      .on('getError', function(data){
        // ...
      })
      .methods.post({});

    $scope
      .sample
      .on('postTagSuccess', function (data){
        $scope.sample.execute('post');
      })


  }
  return SampleController;
})
```
```html
  <div ng-controller="SampleController">
    <ul>
      <li ng-repeat="s in sample.data track by $index">
        {{s}}
        <button type="button" ng-click="sample.put(s)">
          Atualizar
        </button>
        <button type="button" ng-click="sample.delete([s])">
          Deletar
        </button>
      </li>
    </ul>
  </div>
```
---
