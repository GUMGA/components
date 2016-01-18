# Directive - gumgaList

### Uso:
```html
<gumga-list
sort="Function"
class="String"
data="Array"
on-click="Function"
on-sort="Function"
on-double-click="Function">
</gumga-list>
```
### Descrição
O componente gumgaList foi criado no intuito de substituir a gumgaTable. A partir de uma fonte de dados, é gerado uma tabela que é configurada através de um objeto javascript.

### Atributos

- **`sort`:** Atributo *opcional* que irá conter uma função que será chamada quando o usuário clicar no título da tabela. Os parâmetros desta função necessitam obrigatóriamente ser: **field** e **dir**, como por exemplo: `sort="sortFunction(field,dir)"`.
- **`class`:** Atributo *opcional* que irá conter uma string que será utilizada para adicionar classes a mais no componente. Por padrão, apenas a classe `table` é utilizada.
- **`data`:** Atributo *obrigatório*  que irá conter um array com o qual os dados serão mostrados na tabela.
- **`configuration`:** Atributo *obrigatório*  que irá conter um objeto com o qual os dados serão formatados para montar a tabela.
- **`onSort`:** Atributo *opcional* que irá conter uma função que será executada toda vez que o usuário ordenar alguma coluna. O padrão de parâmetros é igual ao do atributo **`sort`**
- **`onClick`:** Atributo *opcional* que irá conter uma função que será executada toda vez que o usuário clicar em uma linha da tabela. Para receber o valor da linha em que houve o click, adiciona o parâmetro $value na função, como por exemplo: on`-click="foo($value)"``
- **`onDoubleClick`:** Atributo *opcional* que irá conter uma função que será executada toda vez que o usuário clicar duas vezes em uma linha da tabela. Para receber o valor da linha em que houve o double click, seguir o mesmo padrão de parâmetro igual ao do `onClick`.
- **`selectedValues`:** Atributo *opcional* que irá conter um array que conterá os valores que foram selecionados. Este array pode ser manipulado de fora da tabela para alterar os valores que foram selecionados.

### Configuração da tabela

O componente pode ser configurado através de um objeto javascript que deve ser passado para o atributo **`data`**. É através deste objeto que as colunas também são configuradas.

- **`selection`:** String *`opcional`* que será utilizada para definir como será a seleção da tabela. Possíveis valores: `multi` e `single`. Como padrão, o valor é `single`.
- **`itemsPerPage`:** Array *`opcional`* que será utilizado para mostrar um `select` com as opções do Array. Ele é utilizado para definir quantos itens pela página serão utilizados. O valor selecionado no array será exposto no escopo da tabela através da variável `itemsPerPage`.
- **`sortDefault`:**  String *`opcional`*  que será utilizada para definir qual o campo padrão de ordenação. Este valor **deve** ser o mesmo identificador que está no atributo `columns`.
- **`checkbox`:** Boolean *`opcional`* que irá definir se aparecerá a coluna de checkbox
- **`columns`:** String *`obrigatória`* que irá definir quais as colunas e a ordem que elas terão dentro da tabela.. O formato deve estar no seguinte padrão: `*[column1,column2,...,columnN]*`. Este valor
- **`conditional`** Função *`opcional`* que será utilizada para fazer a formatação condicional do registro. A função deve retornar um objeto que contém a classe e a comparação utilizada, como por exemplo:
```javascript
function(value){
  return {
    '2px solid red': value.age < 18,
    '2px solid blue': value.age >= 18
  }
}
```
- **`columnsConfig`** Array *`opcional`* que será utilizado para configurar as colunas que foram definidas no atributo columns. Cada valor deste array é um objeto de configuração para cada coluna, não
sendo obrigatório a configuração de todas as colunas. Os valores deste objeto são:
  * **`name`:**: String *`obrigatória`* que irá conter o nome identificador da coluna que será configurada. Este nome deve ser o mesmo nome que está no atributo `columns`, do objeto de configuração da tabela.
  * **`title`:**: String *`opcional`* que irá conter o conteúdo que irá no título da coluna. É possível passar qualquer tipo de expressão angular válida e quaisquer tags html. Para dicas de como não ter que escrever templates através do html, veja a seção **Utilizando HTML no GumgaList**.
  * **`size`:** String *`opcional`* que irá conter o tamanho da coluna, baseado no padrão do bootstrap, como por exemplo: `col-md-3`, `col-xs-10`, etc.
  * **`content`:** String *`opcional`* que irá conter o conteúdo que irá nas células da coluna. É possível passar qualquer tipo de expressão angular válida e quaisquer tags html. Para dicas de como não ter que escrever templates através do html, veja a seção: **Utilizando HTML no GumgaList**.
  * **`sortField`:** String *`opcional`* que irá conter o o campo em que será feita a ordenação. Este campo será o que irá para o campo `field` na função de ordenação.
  * **`conditional`** Função *`opcional`* que será utilizada para fazer a formatação condicional do registro. A função deve retornar um objeto que contém a classe e a comparação utilizada, como por exemplo:
```javascript
function(value){
  return {
    '2px solid red': value.age < 18,
    '2px solid blue': value.age >= 18
  }
}
```

#### Utilizando HTML no GumgaList

Para não ter que escrever o html direto na string, pode-se utilizar templates angular e resgatá-los através do service `$templateCache` do Angular.

```html
<gumga-list data="array" configuration="tableConfig">

</gumga-list>

<script type="text/ng-template" id="tpl.html">
  {{$value.name | uppercase }}
</script>
```

```js
angular.module('sample.app',[])
.controller(['$scope,$templateCache',function($scope,$templateCache){
  $scope.array = [];
  $scope.tableConfig = {
    columns: 'name',
    columnsConfig: {
      name: 'name',
      content: $templateCache.get('tpl.html')
    }
  }
}])

```
