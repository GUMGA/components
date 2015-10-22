# Directive - gumgaNav

### Descrição
O componente gumgaNav é uma directive que cria uma barra de navegação superior, para ajudar o usuário. Dentro da barra de navegação, possuímos uma busca que, quando o botão ENTER é pressionado, ele redireciona para a página de Busca Multi-entidades. Possui também informações sobre o usuário que está logado, uma opção para fazer o logout e outra para alterar a senha.

### Atributos

| Parametro | Tipo | Detalhe |
| - | - | - |
| **title** | `String` | Parâmetro não obrigatório que contém uma String que será o título que aparecerá na barra de navegação. |
| **multi-entity** | `Boolean` | Parâmetro nao obrigatório que contém um valor booleano para compilar ou não a busca multientidade. Por padrão, o valor é true. |
| **put-url** | `String` | Parâmetro não obrigatório que contém uma String ou uma variável que estará no $scope da directive para atribuir uma url para fazer o put do alterar a senha. |
| **state** | `String` | Parâmetro obrigatório que contém uma String com o $state para qual será redirecionado quando o usuário clicar em Logout. |

### Uso:
```html
<gumga-nav
  title="Título"
  multi-entity="true'"
  put-url="http://url/logout"
  state="{String}"
</gumga-menu>
```

Veja um exemplo em funcionamento [aqui](http://embed.plnkr.co/PeJHAS6viutuekw614ZL/preview).
