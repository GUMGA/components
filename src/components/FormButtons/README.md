# Directive - gumgaFormButtons

### Descrição
O componente GumgaFormButtons é utilizado para que o desenvolvedor não precise implementar os botões de controle de formulário.

### Atributos

| Parametro               | Tipo      | Detalhe |
| ---                     | ---       | ---     |
| **valid**               | `Boolean` | Atributo que será passado para o componente para que o botão de salvar seja liberado ou não.|
| **back**                | `String`  | Atributo que será utilizado para definir o estado para qual será retornado quando o usuário clicar em Retornar ou Salvar. Valor default: `NOMEDOSTATE.list`|
| **submit**              | `Function`| Atributo que irá conter uma função que será chamada quando o usuário clicar em salvar. |
| **continue**            | `Boolean` | Atributo que irá ser utilizado para determinar se irá aparecer a opção de continuar inserindo. |
| **confirm-dirty**       | `Boolean` | Atributo usado para determinar se, quando o usuário clicar no botão de retornar e já tiver digitado algo, aparecerá um modal de confirmação de saída da tela. |
| **keep-inserting-text** | `String ` | Atributo que será utilizado para trocar o texto que aparece do lado do checkbox |
| **returnText**          | `String ` | Atributo que será utilizado para trocar o texto que aparece no botão de retorno |
| **saveText**            | `String ` | Atributo que será utilizado para trocar o texto que aparece no botão de salvar  |

### Uso:
```html
<gumga-form-buttons valid= "Form.$valid" back="person.list" submit="foo()" continue="{{!$stateParams.id}}" confirm-dirty= {{ true }}></gumga-form-buttons>
```
