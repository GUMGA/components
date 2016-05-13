# Directive - gumgaFormButtons

### Descrição
O componente GumgaFormButtons é utilizado para que o desenvolvedor não precise implementar os botões de controle de formulário.

### Atributos

| Parametro               | Tipo        | Detalhe |
| ---                     | ---         | ---     |
| **valid**               | `Boolean`   | Atributo que será passado para o componente para que o botão de salvar seja liberado ou não.|
| **back**                | `String`    | Atributo que será utilizado para definir o estado para qual será retornado quando o usuário clicar em Retornar ou Salvar. Valor default: `NOMEDOSTATE.list`|
| **submit**              | `Function`  | Atributo que irá conter uma função que será chamada quando o usuário clicar em salvar. |
| **position**            | `string`    | Atributo para alinhar os botões para esquerda `left` ou direita `right` da tela |
| **continue**            | `Boolean`   | Atributo que irá ser utilizado para determinar se irá aparecer a opção de continuar inserindo. |
| **confirm-dirty**       | `Boolean`   | Atributo usado para determinar se, quando o usuário clicar no botão de retornar e já tiver digitado algo, aparecerá um modal de confirmação de saída da tela. |
| **model**               | `Object`    | Atributo que receberá o model usado no form para validar se houve edição nos dados, usado caso confirm-dirty seja true |
| **keep-inserting-text** | `String `   | Atributo que será utilizado para trocar o texto que aparece do lado do checkbox |
| **returnText**          | `String `   | Atributo que será utilizado para trocar o texto que aparece no botão de retorno |
| **saveText**            | `String `   | Atributo que será utilizado para trocar o texto que aparece no botão de salvar  |
| **reverse-order**       | `Boolean `  | Atributo que será utilizado para alterar a orderm dos botões que aparecem na tela |
| **inline**              | ``          | Atributo sem valor, remove o elemento pai com a classe .row.col-md-12, podendo encaixar o componente onde achar melhor. Caso o atributo não for colocado ocupada 1 linha com 12 colunas (.row.col-md-12).

### Uso:
```html
<gumga-form-buttons
    inline
    valid="Form.$valid"
    back="person.list"
    submit="foo()"
    continue="{{!$stateParams.id}}"
    confirm-dirty="{{true}}"
></gumga-form-buttons>
```
