# Directive - gumgaRequired

### Uso:
  ```html
  <input gumga-required label="{String}"></input>
  ```

### Exemplo
  ```html
  <form name="myForm">
    <input type="text" name="required" ng-model="required" gumga-required>
    <p ng-show="myForm.required.$error.required" class="text-danger">Campo obrigatório</p>
  </form>
  ```

Um exemplo da directive gumgaErrors funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaRequired serve para validar campos obrigatórios.

### Atributos
 - **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.
