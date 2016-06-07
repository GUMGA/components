# Directive - gumgaManyToOne

### Uso:
```html
<gumga-many-to-one
    value="Object"
    list="Array"
    search-method="Function"
    post-method="Function"
    field="String"
    description="String"
    authorize-add="Boolean"
    async="Boolean"
    tab-sec="Number"
    display-info="Boolean"
    on-select="Function(value)">
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
- **`description`:** Atributo não obrigatório que irá conter o atributo de uma possível descrição.
- **`authorize-add`:** Atributo *opcional* que irá conter um booleano que irá fazer o controle para mostrar o botão de adicionar um registro caso a busca não tenha retornado nenhum registro
- **`tab-seq`** Atributo equivalente ao tabindex, foi usado tabseq para que o elemento many-to-one, não fique na lista de tabindex.
- **`disabled`** Atributo opcional que irá conter um boolean para habilitar ou desabilitar o componente.
- **`async`:** Atributo *opcional* que irá dizer caso componente fará um post chamando a função passada ou um push na lista. Por default, o valor é true.
- **`display-info`** Atributo *opcional* que irá conter um boolean informando se irá aparecer o botão agrupado ao input e ícones na lista de resultados, que mostra os dados do resultado.
- **`on-select`:** Atributo *opcional* que irá conter uma função que irá ser executada quando o usuário selecionar um resultado, o parâmetro *value* é obrigatório.


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
