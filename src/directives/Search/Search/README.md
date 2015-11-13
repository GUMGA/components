# Directive - gumgaSearch

### Descrição
O componente **gumgaSearch**


### Atributos

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **fields** | `String` | Nome dos campos da busca normal separados por virgula. |
| **search-method** | `Function` | Função que será executada para realizar a busca. |
| **on-search** | `Function` | Função que será executada após a busca realizada. |
| **advanced** | `Boolean` | Atributo booleano para indicar que será usada a busca avançada |
| **advanced-method** | `Function` | Função que será executada para realizar a busca avançada |
| **on-advanced-search** | `Function` | Função que será executada após a busca avançada realizada. |

### Uso:
```html
<gumga-search fields="nome,ativo" search-method="search()" on-search="afterSearch()">
</gumga-search>

<!-- ou -->

<gumga-search advanced="true" advanced-method="advancedSearch()" on-advanced-search="afterAdvancedSearch()">
  <advanced-field name="nome" type="string"></advanced-field>
  <advanced-field name="ativo" type="boolean"></advanced-field>
</gumga-search>

```
