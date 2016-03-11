# GumgaFilter

### Uso

```html
<gumga-filter search="searchFilter(param)">
  <advanced-search-field type="string"  label="Nome"    field="nome"></advanced-search-field>
  <advanced-search-field type="number"  label="Idade"   field="idade"></advanced-search-field>
  <advanced-search-field type="float"   label="Peso"    field="peso"></advanced-search-field>
  <advanced-search-field type="money"   label="Preço"   field="preco"></advanced-search-field>
  <advanced-search-field type="cpf"     label="CPF"     field="cpf"></advanced-search-field>
  <advanced-search-field type="cnpj"    label="CNPJ"    field="cnpj"></advanced-search-field>
  <advanced-search-field type="boolean" label="Ativo"   field="ativo" true-label="True" false-label="False"></advanced-search-field>
  <advanced-search-field type="select"  label="Estados" field="id" data="selects"></advanced-search-field>
  <advanced-search-field type="enum"    label="Roles"   field="states" data="selects"></advanced-search-field>
</gumga-filter>
```

```javascript
$scope.selects = [
  {
    "field": "selectField1",
    "label": "selectLabel 1"
  },
  {
    "field": "selectField2",
    "label": "selectLabel 2"
  },
  {
    "field": "selectField3",
    "label": "selectLabel 3"
  }
];

```
### Descrição
O componente gumgaFilter é utilizado para realizar buscar avançadas, de forma desacoplada, numa tela onde estarão somente filtros avançados disponíveis, mas também pode ser usado em conjunto com o componente gumgaQuery, adicionando o atributo `advanced-search="foo(param)"`
As tags advanced-search-field são usadas para definir os atributos que serão usados para formação dos filtros.


### Parâmetros

- **search**: Parâmetro que irá conter uma função que será utilizada para executar a busca. O parâmetro `param` é obrigatórios e irá retornar os dados necessários para montar a query no backend.

#### Parâmetros da tag advanced-search-field

| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **type** | `String` | Irá conter o tipo que dado que será entrado, possibilitanto a validação ou máscara no campo para o valor. |
| **field** | `String` | Irá conter uma string que será utilizada na hora de fazer a busca. |
| **label** | `String` | Irá conter uma string que será utilizada para mostrar no componente. |
| **true-value / false-value** | `String` | No caso de um atributo do tipo `boolean`, será o valor mostrado no componente ao lado do radio button, simbolizando true ou false. |
| **data** | `Array` | No caso dos atributos dos tipos `select` ou `enum` é necessária passar ao atributo `data` um array de objetos com os atributos field e label para sua representação num select ou checkbox. |

#### Tipos permitidos da tag advanced-search-field

| Tipo | Condições | 
| --- | --- | --- |
| string | 'eq', 'ne', 'ge', 'le', 'contains', 'not_contains', 'starts_with', 'ends_with' |
| number | 'eq', 'ne', 'gt', 'ge', 'lt', 'le' |
| float | 'eq', 'ne', 'gt', 'ge', 'lt', 'le' |
| money | 'eq', 'ne', 'gt', 'ge', 'lt', 'le' |
| cpf | 'eq' |
| cnpj | 'eq' |
| boolean | 'eq' |
| date | 'eq', 'ne', 'gt', 'ge', 'lt', 'le' |
| select | 'eq', 'ne' |
| enum | 'eq' |
| email | 'eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with' |
| url | 'eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with' |
| ip | 'eq', 'ne', 'contains', 'not_contains', 'starts_with', 'ends_with' |
