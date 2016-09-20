# Directive - gumgaOneToMany

### Descrição
A directive gumgaOneToMany pode ser usada quando é necessária a criação de uma lista de objetos dentro do formulário, especialmente quando esses objetos acessam outros Services. Ela lança um modal para a criação destes objetos, que podem ser recursivos. Além disso, possui suporte a edição e remoção destes registros.

### Atributos
| Parametro | Tipo | Detalhe |
| --- | --- | --- |
| **children** | `Array` | Parâmetro obrigatório que irá conter um Array que será utilizado para construir a lista. |
| **template-url** | `String` | Parâmetro obrigatório que irá conter uma string referenciando a url na qual o template do modal estará. |
| **property** | `String` | Parâmetro obrigatório que irá conter uma string com a propriedade do objeto que será mostrada na lista. |
| **modal-title** | `String` | Parâmetro não obrigatório que irá conter uma string com o título que será passado para o controller. |
| **name** | `String` | *Utilizar modal-title*. |
| **controller** | `String` | Parâmetro obrigatório que irá conter uma String que referenciará o nome do controller que será atribuido ao modal. Este controller necessita injetar além do $scope, as propriedades **entity** e **title** |
| **on-delete** | `Function` | Parâmetro não obrigatório que irá conter uma variável que irá conter uma função que será chamada quando um elemento da lista for deletado. |
| **on-value-visualization-opened** | `Function` | Parâmetro não obrigatório que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver aberto o modal para visualização de dados. |
| **on-value-visualization-closed** | `Function` | Parâmetro não obrigatório que irá conter uma variável que possuirá uma função que irá ser executada quando o usuário tiver fechado o modal para visualização de dados. |
| **edit-button** | `String` | Atributo opcional para definir o texto do botão editar
| **edit-button-title** | `String` | Atributo opcional para definir o atributo title do botão editar
| **edit-button-class** | `String` | Atributo opcional para definir o atributo class do botão  editar
| **edit-button-icon** | `String` | Atributo opcional para definir o atributo class do ícone do botão editar
| **remove-button** | `String` | Atributo opcional para definir o texto do botão remover
| **remove-button-title** | `String` | Atributo opcional para definir o atributo title do botão remover
| **remove-button-class** | `String` | Atributo opcional para definir o atributo class do botão remover
| **remove-button-icon** | `String` | Atributo opcional para definir o atributo class do ícone do botão remover
