# Directive - gumgaManyToOne

### Uso:
```html
<gumga-many-to-one
          value="Object"
          list="Array"
          search-method="Function"
          post-method="Function"
          field="String"
          authorize-add="Boolean"
          async="Boolean"
          on-new-value-added="Function"
          on-value-visualization-opened="Function"
          on-value-visualization-closed="Function">
</gumga-many-to-one>
```


### Descrição
A directive gumgaManyToOne pode ser utilizada para filtrar uma lista de registros dinâmicamente.  Ela também permite adicionar um registro caso a busca retorne uma lista vazia e permite também visualizar os atributos do registro selecionado.


### Atributos

- **`value`:** Atributo *obrigatório* que irá conter um objeto em que o bind será feito com o registro selecionado na lista.
- **`list`:** Atributo *obrigatório* que irá conter um array que irá conter os registros buscados.
- **`search-method`:** Atributo *obrigatório* que irá conter uma função que fará a busca na lista assíncronamente. `search-method="getSearch(param)"`
- **`post-method`:**  que irá conter uma função que dependendo do parâmetro `async`, chamará a função async com o parâmetro `post-method="post(value)"` e caso o parâmetro async não esteja presente  ou seja falso, fará um push na lista.
- **`field`:** Atributo *obrigatório* que irá conter o atributo do registro que está sendo procurado e o que estará na lista.
- **`authorize-add`:** Atributo *opcional* que irá conter um booleano que irá fazer o controle para mostrar o botão de adicionar um registro caso a busca não tenha retornado nenhum registro
- **`disabled`** Atributo opcional que irá conter um boolean para habilitar ou desabilitar o componente.
- **`async`:** Atributo *opcional* que irá dizer caso componente fará um post chamando a função passada ou um push na lista. Por default, o valor é true.
- **`on-new-value-added`:** Atributo *opcional* que irá conter uma função que irá ser executada quando o usuário adicionar um novo valor.
- **`on-value-visualization-opened`:** Atributo *opcional* que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver aberto o moda para visualização de dados.
- **`on-value-visualization-closed`:** Atributo *opcional* que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver fechado o modal para visualização de dados.


Para uma função retornar resultados assíncronamente, duas opções podem ser utilizados:

1. Retornar a chamada $http relativa a ela.
```js
$scope.getAsync = function(){
    return Service.get().then(fuction(data){
      return data.data;
    });
}
```

2. Criar uma promise
```js
$scope.getAsync = function(){
    var def = $q.defer();
      if(...){
        ...
        def.resolve([]);
      } else {
        ...
        def.reject({mesage: "Inválido"});
      }
      return def.promise;
    }
```
