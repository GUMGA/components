# Directive - gumgaPattern

### Uso:
  ```html
  <input gumga-pattern label="{String}"></input>
  ```

### Exemplo
  ```html
  <form name="myForm">
    <input type="text" name="cep" ng-model="cep" gumga-pattern="(\d{5})\-(\d{3})" id="cep" placeholder="99999-999">
    <p ng-show="myForm.cep.$error.pattern" class="text-danger">Expressão não corresponde com o formato esperado</p>
  </form>
  ```

Um exemplo da directive gumgaErrors funcionando pode ser encontrado [aqui](http://embed.plnkr.co/AcjqcgvgGhdJqDh72eHA).

### Descrição
O componente GumgaPattern serve para validar expressões regulares de formulários.

#### Nota
O valor do atributo/diretiva é **obrigatório** e deve ser uma **expressão regular**.

### Atributos
 - **`label`:** Usado na integração com [gumga.core:gumgaErrors](../Errors) para indicar em qual campo se encontra o erro. Se o atributo for omitido, a diretiva usará o atributo name do input.
