# Directive - gumgaSearch

### Descrição
O componente **gumgaSearch**


### Atributos

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **fields**              | `String`    | Nome dos campos da busca normal separados por virgula. |
| **search-method**       | `Function`  | Função que será executada para realizar a busca. |
| **on-search**           | `Function`  | Função que será executada após a busca realizada. |
| **advanced**            | `Boolean`   | Atributo booleano para indicar que será usada a busca avançada |
| **advanced-method**     | `Function`  | Função que será executada para realizar a busca avançada |
| **on-advanced-search**  | `Function`  | Função que será executada após a busca avançada realizada. |
| **translate-entity**    | `String`    | String que representará a tradução

### Uso:
```html
<gumga-search fields="nome,ativo" search-method="search()" on-search="afterSearch()">
</gumga-search>

<!-- ou -->

<gumga-search advanced="true" advanced-method="advancedSearch()" on-advanced-search="afterAdvancedSearch()" translate-entity="pessoa">
  <advanced-field name="empresa.nomeFantasma" type="string" translate="empresa.nome"></advanced-field>
  <advanced-field name="ativo" type="boolean"></advanced-field>
</gumga-search>

```


### Advanced field

  Caso queira criar um campo avançado que possua tradução diferente do nome passado ao atributo "name", adicione o atributo `translate`.
A tradução será uma combinação dos atributos `translate-entity` com `translate`, ao invés do default que é `translate-entity` e `name`.


Caso queria passar também um array no type, passar um atributo `data` que irá conter o nome da variável no $scope externo da directive e array-item-content, que vai simbolizar qual atributo do objeto que vai aparecer no select. Ou seja, é **necessário** passar um array de objetos.
