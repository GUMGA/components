# Directive - gumgaError

### Uso:
  ```html
  <gumga-errors
    placement="{String}"
    icon="{String}"
    label="{String}"
    title="{String}">
  </gumga-errors>
  ```

### Exemplo
  ```html
  <form name="myForm">
    <input type="number" name="minNumber" ng-model="minNumber" gumga-min-number="20">
    <gumga-errors placement="right" icon="glyphicon glyphicon-info-sign" label="Campos inválidos" title="Campos inválidos"></gumga-errors>
  </form>
  ```

Um exemplo da directive gumgaErrors funcionando pode ser encontrado aqui.

### Descrição
O componente gumgaErrors serve para mostrar todas mensagens de validações do formulário de forma agrupada.

### Atributos
 - **`placement`:** Onde irá aparecer, o padrão é top, mas também aceita right, bottom e left.
 - **`icon`:** Ícone do botão, por padrão é glyphicon glyphicon-info-sign
 - **`label`:** Texto do botão
 - **`label-hidden`:** Esconde o texto do botão
 - **`title`:** Título do popover de erros
