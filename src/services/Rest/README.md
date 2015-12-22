# Service - gumgaRest

### Descrição
O service GumgaRest é uma evolução do service [gumgaBase](../Base), pois sua configuração não necessita de nenhuma outra configuração adicional no service que irá chamá-lo.

```js
angular.module('sample',['gumga.core'])
  .service('GumgaRest',function(GumgaRest){
    //Exemplo de utilização.
    var service = new GumgaRest('http://www.gumga.com.br/api');
    // Ou, caso não queira adicionar nenhum método, utilizar:
    // return new GumgaRest('http://www.gumga.com.br/api');

    service.get = function(page){
      console.log('Modifiquei um método da service e chamei o padrão!');
      return GumgaRest.prototype.get.call(this,page);
    }
    return service;
  })
```

### Métodos

`get(params);`

O método get aceita um parâmetro `url` e retorna uma promise de uma chamada HTTP do tipo GET.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**params** | `Object` | Parâmetros da query que será feita.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`resetAndGet();`

O método resetAndGet reseta a query atual e performa uma chamada HTTP do tipo GET.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP GET.

---

`getById(id);`

O método getById aceita um parâmetro `id` e retorna uma promise de uma chamada HTTP do tipo GET.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**id** | `Number/String` | Identificador do registro que será buscado.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`getNew();`

#### Retorno
O método getNew retorna uma promise de uma chamada HTTP do tipo GET contendo o modelo do objeto com valores vazios.

---

`delete(data);`

O método delete recebe como parâmetro um objeto que será deletado. O objeto deve ter um parâmetro ID, que será passado para a url da chamada.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**data** | `Object` | Registro que será deletado.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP DELETE.

---

`sort(field, way);`

O método sort recebe dois parâmetros para fazer a ordenação: `field` e `way`, que determinarão qual campo será ordenado e se será 'asc' ou 'desc'.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**field** | `String` | Qual campo será feita a ordenação.
**way** | `String` | Em que sentido a ordenação será feita, se será ascendente `asc` ou descendente `desc`.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP GET.

---

`deleteCollection(array);`

O método deleteAll aceita um parâmetro `url`  e retorna uma promise de uma série de chamadas http do tipo DELETE que serão resolvidas ao mesmo tempo.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**array** | `Array` | Registros que serão deletados.

#### Retorno
`HttpPromise` Retorna uma promise após todas as chamadas terem sido resolvidas.

---

`saveImage(attribute, data);`

O método saveImage aceita dois parâmetros `attribute` e `data` e retorna uma promise de de uma chamada HTTP POST FORM-DATA.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**attribute** | `String` | Atributo no qual a imagem será feito o bind após o form ter sido enviado completo.
**data** | `Object` | Dados da imagem que foi selecionada.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP POST. Nesta promise, será retornado o valor de uma String que deverá ser atribuída ao atributo onde estava a imagem. Esta string é um identificador para quando o registro for enviado através de um post.

---

`deleteImage(attribute, data)`

O método deleteImage aceita dois parâmetros `url` e `data` e retorna uma promise de de uma chamada HTTP DELETE FORM-DATA.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**attribute** | `String` | Atributo no qual a imagem será feito o bind após o form ter sido enviado completo.
**data** | `Object` | Dados da imagem que foi selecionada.

`HttpPromise` Retorna uma promise da chamada HTTP DELETE.

---

`getSearch(field, param);`

O método getSearch aceita dois parâmetros `field` e `param` e retorna uma promise de uma chamada HTTP do tipo GET.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**field** | `String` | Qual campo a busca será feita. Caso queira fazer a busca em mais de um campo, passar uma string com os nomes separados por vírgula.
**param** | `Object` | Objeto que irá conter os parâmetros da busca.

---

`getAdvancedSearch(param);`

O método getAdvancedSearch aceita um parâmetro `param` e retorna uma promise de uma chamada HTTP do tipo GET.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**param** | `Object` | Objeto que irá conter os parâmetros da busca.

`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`resetDefaultState();`

O método resetDefaultState retorna o objeto de query ao seu estado padrão.

---

`saveQuery(query);`

O método saveQuery aceita um parâmetro `query` e retorna uma promise de uma chamada HTTP do tipo POST.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**query** | `Object` | Objeto que irá conter três atributos necessários para salvar a query. Os atributos são: `page`, `data` e `name`. Onde `page` é o nome da página atual, `data` é a busca e `name` é o nome da query a ser salva.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP POST.

---

`getQuery(page);`

O método getQuery aceita um parâmetro `page` e retorna uma promise de uma chamada HTTP do tipo GET. Este Parâmetro `page` é o valor de retorno do objeto `location.hash` disponível através do browser.

Exemplo:
```js
GumgaRest.getQuery(location.hash);
```

É necessário este atributo para pegar apenas as queries relacionadas a página. As informações do usuário já são passadas através do token.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**page** | `String` | String que será utilizada para fazer a pesquisa das queries relacionadas com a página.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`getSelectedTags(id);`

O método getSelectedTags aceita um parâmetro `id` e retorna uma promise de uma chamada HTTP do tipo GET. Este Parâmetro `id` é o identificador da entidade que está sendo editada.

Exemplo:
```js
GumgaRest.getSelectedTags(entity.);
```

Este atributo é necessário para buscar apenas as tags que estão ligadas aquele registro.

#### Parâmetros
Parâmetro | Tipo     | Detalhes
---       | ---      | ---
**id**    | `Number` | Number que será o identificador do registro

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`getAvailableTags();`

O método getSelectedTags não necessita de parâmetros e retorna uma promise de uma chamada HTTP do tipo GET.

Exemplo:
```js
GumgaRest.getAvailableTags();
```

Este método retorna todas as tags que estão disponíveis para a seleção.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.


---

`postTags(objectId, values);`

O método postTags é utilizado para salvar as tags que foram selecionadas pelo usuário para este registro

Exemplo:
```js
GumgaRest.postTags(entity.id, selectedTags);
```

#### Parâmetros
Parâmetro       | Tipo      | Detalhes
---             | ---       | ---
**objectId**    | `Number`  | Number que será o identificador do registro
**values**      | `Array`   | Array que irá conter uma lista das tags que foram selecionadas pelo usuário.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP POST.

---

`extend(method, url,config);`

O método `extend` permite ao programador extender a url que foi construída. O programador pode escolher o método, a url que será adicionada depois da url que foi passada para o construtor e quaisquer configurações necessárias

Exemplo:
```js
GumgaRest.extend('get', '/extended', {
  params: {
    foo: 'bar'
  }
});
```

#### Parâmetros
Parâmetro       | Tipo      | Detalhes
---             | ---       | ---
**method**      | `String`  | Qual método que será usado para criar a chamada. Ex: `'get','post'`.
**url**         | `String`  | O que será adicionado ao fim da url que foi passada como parâmetro no construtor do GumgaRest.
**config**      | `Object`  | Objeto de configuração utilizado nas chamadas [http do Angular](https://docs.angularjs.org/api/ng/service/$http)

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP POST.
