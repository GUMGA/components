# Directive - gumgaValidateType

### Uso:
  ```html
  <input type="{Type}" gumga-validate-type></input>
  ```

### Exemplo
  ```html
  <form name="validatetype" gumga-form>
    <input type="email" name="email" ng-model="email" gumga-validate-type gumga-error>
  </form>
  ```

### Descrição
O componente GumgaValidateType serve para validar determinados tipos de campos, como date, datetime-local, time, week, month, number, url e email.
