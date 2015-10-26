# Service - gumgaBase (Depreciado)

Depreciado - Substituido por: [gumgaRest](../Rest/README.md)

### Descrição
O service GumgaBase pode ser utilizado como helper para fazer chamadas HTTP. Ele permite que o programador não precise incluir o service $http do AngularJS e já vem com algumas funções incluídas. Para utilizar o GumgaBase, basta íncluí-lo como dependência.

### Métodos
`get(url, params);`

O método get aceita dois parâmetros `url` e `params` e retorna uma promise de uma chamada HTTP do tipo GET.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**params** | `Object` | Parâmetros da query que será feita.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`getById(url, id);`

O método getById aceita dois parâmetros `url` e `id` e retorna uma promise de uma chamada HTTP do tipo GET.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**id** | `Number` | Identificador do registro que será buscado.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`getNew(url);`

O método getNew aceita um parâmetro `url` e retorna uma promise de uma chamada HTTP do tipo GET contendo o modelo do objeto com valores vazios.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.

#### Retorno
`HttpPromise` Retona uma promise da chamada HTTP GET.

---

`deleteAll(url, array);`

O método deleteAll aceita dois parâmetros `url` e `array` e retorna uma promise de uma série de chamadas http do tipo DELETE que serão resolvidas ao mesmo tempo.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**array** | `Array` | Array com todas os registros que serão deletados

#### Retorno
`HttpPromise` Retorna uma promise após todas as chamadas terem sido resolvidas.

---

`save(url, data);`

O método save aceita dois parâmetros `url` e `data` e retorna uma promise de de uma chamada HTTP POST.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**data** | `Object` | Objeto que deseja ser salvo.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP POST.

---

`update(url, data);`

O método update aceita dois parâmetros `url` e `data` e retorna uma promise de de uma chamada HTTP PUT.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**data** | `Object` | Objeto que deseja ser atualizado.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP PUT.

---

`del(url, data);`

O método del aceita dois parâmetros `url` e `data` e retorna uma promise de uma chamada HTTP DELETE. Esta função é chamada para cada registro passado dentro do Array na função deleteAll.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**data** | `Object` | Objeto que deseja ser deletado.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP DELETE.

---

`postImage(url, attribute, data);`

O método postImage aceita três parâmetros `url`,`attribute` e `data` e retorna uma promise de de uma chamada HTTP POST FORM-DATA.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**attribute** | `Object` | Nome do atributo contendo a imagem no objeto
**data** | `Object` | Dados da imagem que foi selecionada.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP POST. Nesta promise, será retornado o valor de uma String que deverá ser atribuída ao atributo onde estava a imagem. Esta string é um identificador para quando o registro for enviado através de um post.

---

`deleteImage(url, attribute, data);`

O método del aceita três parâmetros `url`, `attribute` e `data` e retorna uma promise de uma chamada HTTP DELETE FORM-DATA.

#### Parâmetros
Parâmetro | Tipo | Detalhes
--- | --- | ---
**url** | `String` | Endereço no qual a chamada http será feita.
**attribute** | `Object` | Nome do atributo contendo a imagem no objeto
**data** | `Object` | Dados da imagem que foi selecionada.

#### Retorno
`HttpPromise` Retorna uma promise da chamada HTTP DELETE.
