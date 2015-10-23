# Directive - gumgaUpload

### Descrição
O componente **GumgaTable** serve para expor dados em forma de tabela. O componente expõe no *$scope.selectedEntities* um array contendo os objetos das linhas selecionadas para que o desenvolvedor possa usa-los em ações.

### Atributos

| Parametro | Tipo | Detalhe |
| - | - | - |
| **values** | `String` | Atributo obrigatório. Deve ser o nome do array exposto no $scope para popular a tabela. |
| **columns** | `String` | Atributo obrigatório. As propriedades do objeto que serão apresentados como colunas na tabela. |
| **size** | `String` | Possuem 3 opções de tamanhos, **large**, **medium** e **small**, que respectivamente ocupam, todo o espaço da row, dois terços e um terço. O valor padrão é large. |
| **translate-entity** | `String` | Nome da entidade. |
| **pages** | `Array` | Deve conter os valores para apresentar opções de registros por página. |
| **table-class** | `String` | Possuem 3 opções, **bordered**, **striped** e **condensed**, que respectivamente, adiciona bordas a tabela, alterna cores das linhas e diminui o espaçamento interno das linhas e colunas. O valor padrão é bordered. O componente seguirá a ordem de colunas adicionada ao atributo. |
| **multi-selection** | `Boolean` | É true por padrão, determina a possibilidade da seleção de várias entidades ou apenas uma por vez. |
| **sort-function** | `Function` | Nome da função atribuida ao $scope para manipular a ordenação, a função recebe dois parâmetros, **field** e **way** que serão, a coluna e a direção da ordenação respectivamente, existem duas direções, **asc** ou **desc**. |
| **sort-default** | `String` | Deve conter a **coluna** e a **direção** separados por virgula, será a ordenação padrão na primeira exibição da tabela. |
| **row-class** | `Expression` | Deve conter uma expressão condicional para marcar determinadas linhas correspondentes como verdadeiras perante a expressão. |
| **on-select** | `Function` | Nome da função que será executada ao evento click. |
| **on-sort** | `Function` | Nome da função que será executada ao evento de sort. |

### Uso:
```html
<gumga-table values="list" columns="name,age"></gumga-table>
```
```js
$scope.list = [{name: 'Guilherme', age: 28},{name: 'Igor', age: 19}];
```

Um exemplo da directive gumgaTable funcionando pode ser encontrado [aqui](http://embed.plnkr.co/SALkp5bKRZ1aywsrpmEX).
